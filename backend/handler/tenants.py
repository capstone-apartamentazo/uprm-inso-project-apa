from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, tenant_guard as guard
from dao.tenants import Tenants
import flask_praetorian as praetorian
import re

class TenantHandler:
  def __init__(self):
    self.tenants = Tenants()

  def getAll(self):
    try:
      daoTenants = self.tenants.getAll()
      if daoTenants:
        return jsonify([row for row in daoTenants])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
  
  def getById(self, json):
    try:
      daoTenant = self.tenants.getById(json['tenant_id'])
      if daoTenant:
        return jsonify(daoTenant)
      else:
        return jsonify('Landlord Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def login(self, json):
    email = json['tenant_email'].lower()
    password = json['tenant_password']
    tenant = guard.authenticate(email, password)
    token = { 'access_token': guard.encode_jwt_token(tenant) }
    return jsonify(token)
  
  @praetorian.auth_required
  def protected(self):
    json = { 'tenant_id': praetorian.current_user_id() }
    return self.getById(json)

  def refresh(self):
    old_token = guard.read_token_from_header()
    new_token = guard.refresh_jwt_token(old_token)
    token = { 'access_token': new_token }
    return jsonify(token)

  def addTenant(self, json):
    try:
      name = json['tenant_name']
      email = json['tenant_email'].lower()
      password = json['tenant_password']
      phone = json['tenant_phone']
      valid, reason = self.checkInput(0, name, email, password, phone)
      if valid:
        newTenant = self.tenants.addTenant(name, email, guard.hash_password(password), phone)
        if newTenant:
          return jsonify(newTenant)
        else:
          return jsonify('Error adding Tenant'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateTenant(self, json):
    try:
      identifier = praetorian.current_user_id()
      name = json['tenant_name']
      email = json['tenant_email']
      password = json['tenant_password']
      phone = json['tenant_phone']
      valid, reason = self.checkInput(identifier, name, email, password, phone)
      # update tenant if input is valid
      if valid:
        updatedTenant = self.tenants.updateTenant(identifier, name, email, guard.hash_password(password), phone)
        if updatedTenant:
          return jsonify(updatedTenant)
        else:
          return jsonify('Error updating Tenant'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkInput(self, identifier, name, email, password, phone):
    # strip function removes any spaces given
    if identifier > 0 and not self.tenants.getById(identifier):
      return False, 'Tenant Not Found'
    if not len(name.strip()):
      return False, 'Empty Name'
    if not len(email.strip()):
      return False, 'Empty Email'
    if self.emailValid(email):
      return False, 'Enter Valid Email'
    if self.emailTaken(email, identifier):
      return False, 'Email Taken'
    if not len(password.strip()):
      return False, 'Empty Password'
    if self.passwordValid(password):
      return False, 'Password must contain 4-20 characters, at least one uppercase/lowercase letter, at least one digit, and no spaces. (Special characters are optional)'
    if not len(phone.strip()):
      return False, 'Empty Phone Number'
    if self.phoneValid(phone):
      return False, 'Enter Valid Phone Number'
    if self.phoneTaken(phone, identifier):
      return False, 'Phone Number Taken'
    else:
      return True , ''

  def emailValid(self, email):
    emailRegex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return not re.search(emailRegex, email)
  
  def passwordValid(self, password):
    passwordRegex = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$'
    return not re.search(passwordRegex, password)

  def emailTaken(self, email, identifier):
    return self.tenants.getEmail(email, identifier)
  
  def phoneValid(self, phone):
    phoneRegex = '^[2-9]\d{2}-\d{3}-\d{4}$'
    return not re.search(phoneRegex, phone)

  def phoneTaken(self, number, identifier):
    return self.tenants.getPhoneNumber(number, identifier)

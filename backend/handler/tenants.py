from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, tenant_guard as guard
from dao.tenants import Tenants
import flask_praetorian as praetorian
from cloudinary.uploader import upload
from cloudinary.search import Search
from cloudinary.api import delete_resources
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
      logger.exception(e)
      return jsonify('Error Occured'), 400
  
  def getById(self, u_id):
    try:
      daoTenant = self.tenants.getById(u_id)
      if daoTenant:
        return jsonify(daoTenant)
      else:
        return jsonify('Tenant Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def login(self, json):
    email = json['tenant_email'].lower()
    password = json['tenant_password']
    tenant = guard.authenticate(email, password)
    token = {
      'tenant_id': tenant.tid,
      'access_token': guard.encode_jwt_token(tenant) 
      }
    return jsonify(token)
  
  @praetorian.auth_required
  def protected(self):
    return self.getById(praetorian.current_user_id())

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
          db.commit()
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
          db.commit()
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

  def getProfilePicture(self, tenant_id):
    try:
      if not self.tenants.getById(tenant_id):
        return False, 'Tenant Not Found'
      image = Search().expression('folder:apartamentazo/tenants AND tags:tenant AND filename:tenant_{}'.format(tenant_id)).execute()
      return jsonify(image)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def uploadProfilePicture(self, json):
    try:
      image = upload(
        json['image'],
        folder = 'apartamentazo/tenants',
        public_id = 'tenant_{}'.format(praetorian.current_user_id()),
        tags='tenant'
      )
      return jsonify(image)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400
  
  @praetorian.auth_required
  def deleteProfilePicture(self):
    try:
      query = 'apartamentazo/tenants/tenant_{}'.format(praetorian.current_user_id())
      image_delete_result = delete_resources(query, resource_type="image", type="upload")
      return jsonify(image_delete_result)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteTenant(self):
    try:
      tenant_id = praetorian.current_user_id()
      deletedTenant = self.tenants.deleteTenant(tenant_id)
      if deletedTenant:
        db.commit()
        return jsonify(deletedTenant)
      else:
        db.rollback()
        return jsonify('Error deleting Tenant'), 400
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

from flask import jsonify
from backend.dao.tenants import Tenants
import re

class TenantHandler:
  def __init__(self):
    self.tenants = Tenants()
  
  def dictionary(self, row):
    data = {}
    data['Tenant ID'] = row[0]
    data['Tenant Name'] = row[1]
    data['Tenant Email'] = row[2]
    data['Tenant Password'] = row[3]
    data['Tenant Phone'] = row[4]
    return data

  def getAll(self):
    daoTenants = self.tenants.getAll()
    if daoTenants:
      result = []
      for row in daoTenants:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405
  
  def getById(self, json):
    daoTenant = self.tenants.getById(json['tenant_id'])
    if daoTenant:
      return jsonify(self.dictionary(daoTenant)), 200
    else:
      return jsonify('Tenant Not Found'), 405

  def addTenant(self, json):
    name = json['tenant_name']
    email = json['tenant_email'].lower()
    password = json['tenant_password']
    phone = json['tenant_phone']
    valid, reason = self.checkInput(0, name, email, password, phone)
    if valid:
      newTenant = self.tenants.addTenant(name, email, password, phone)
      if newTenant:
        return jsonify(self.dictionary(newTenant)), 201
      else:
        return jsonify('Error adding Tenant'), 500
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400

  def updateTenant(self, json):
    identifier = json['tenant_id']
    name = json['tenant_name']
    email = json['tenant_email']
    password = json['tenant_password']
    phone = json['tenant_phone']
    valid, reason = self.checkInput(identifier, name, email, password, phone)
    # update tenant if input is valid
    if valid:
      updatedTenant = self.tenants.updateTenant(identifier, name, email, password, phone)
      if updatedTenant:
        return jsonify(self.dictionary(updatedTenant)), 200
      else:
        return jsonify('Error updating Tenant'), 500
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400

  def checkInput(self, identifier, name, email, password, phone):
    # strip function removes any spaces given
    try:
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
        return False, 'Password must contain 4-8 characters, at least one uppercase/lowercase letter, at least one digit, and no spaces. (Special characters are optional)'
      if not len(phone.strip()):
        return False, 'Empty Phone Number'
      if self.phoneValid(phone):
        return False, 'Enter Valid Phone Number'
      if self.phoneTaken(phone, identifier):
        return False, 'Phone Number Taken'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def emailValid(self, email):
    emailRegex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return not re.search(emailRegex, email)
  
  def passwordValid(self, password):
    passwordRegex = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$'
    return not re.search(passwordRegex, password)

  def emailTaken(self, email, identifier):
    return self.tenants.getEmail(email, identifier)
  
  def phoneValid(self, phone):
    phoneRegex = '^[2-9]\d{2}-\d{3}-\d{4}$'
    return not re.search(phoneRegex, phone)

  def phoneTaken(self, number, identifier):
    return self.tenants.getPhoneNumber(number, identifier)

from flask import jsonify
from dao.landlords import Landlords
from models.landlord import Landlord
from util.config import app, guard
import re

guard.init_app(app, Landlord)

class LandlordHandler:
  def __init__(self):
    self.landlords = Landlords()
  
  def dictionary(self, row):
    data = {}
    data['Landlord ID'] = row[0]
    data['Landlord Name'] = row[1]
    data['Landlord Email'] = row[2]
    data['Landlord Password'] = row[3]
    data['Landlord Phone'] = row[4]
    data['Landlord Rating'] = row[5]
    return data

  def getAll(self):
    daoLandlords = self.landlords.getAll()
    if daoLandlords:
      result = []
      for row in daoLandlords:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405
  
  def getById(self, json):
    daoLandlord = self.landlords.getById(json['landlord_id'])
    if daoLandlord:
      return jsonify(self.dictionary(daoLandlord)), 200
    else:
      return jsonify('Landlord Not Found'), 405

  def login(self, json):
    email = json['landlord_email'].lower()
    password = json['landlord_password']
    landlord = guard.authenticate(email, password)
    token = { "access_token": guard.encode_jwt_token(landlord) }
    return jsonify(token), 200

  def addLandlord(self, json):  
    name = json['landlord_name']
    email = json['landlord_email'].lower()
    password = json['landlord_password']
    phone = json['landlord_phone']
    valid, reason = self.checkInput(0, name, email, password, phone)
    # add landlord if input is valid
    if valid:
      newLandlord = self.landlords.addLandlord(name, email, guard.hash_password(password), phone)
      if newLandlord:
        return jsonify(self.dictionary(newLandlord)), 201
      else:
        return jsonify('Error adding Landlord'), 500
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400

  def updateLandlord(self, json):
    identifier = json['landlord_id']
    name = json['landlord_name']
    email = json['landlord_email']
    password = json['landlord_password']
    phone = json['landlord_phone']
    valid, reason = self.checkInput(identifier, name, email, password, phone)
    # update landlord if input is valid
    if valid:
      updatedLandlord = self.landlords.updateLandlord(identifier, name, email, guard.hash_password(password), phone)
      if updatedLandlord:
        return jsonify(self.dictionary(updatedLandlord)), 200
      else:
        return jsonify('Error updating Landlord'), 500
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400

  def checkInput(self, identifier, name, email, password, phone):
    # strip function removes any spaces given
    try:
      if identifier > 0 and not self.landlords.getById(identifier):
        return False, 'Landlord Not Found'
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
    passwordRegex = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$'
    return not re.search(passwordRegex, password)

  def emailTaken(self, email, identifier):
    return self.landlords.getEmail(email, identifier)
  
  def phoneValid(self, phone):
    phoneRegex = '^[2-9]\d{2}-\d{3}-\d{4}$'
    return not re.search(phoneRegex, phone)

  def phoneTaken(self, number, identifier):
    return self.landlords.getPhoneNumber(number, identifier)
  
  def updateRating(self, json):
    daoLandlord = self.landlords.updateRating(json['landlord_id'])
    if daoLandlord:
      return jsonify(self.dictionary(daoLandlord)), 200
    else:
      return jsonify('Error updating Landlord Rating'), 405
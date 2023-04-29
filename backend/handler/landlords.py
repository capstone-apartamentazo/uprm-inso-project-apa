from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, landlord_guard as guard
from dao.landlords import Landlords
from handler.accommodations import AccommodationHandler
import flask_praetorian as praetorian
import re

class LandlordHandler:
  def __init__(self):
    self.landlords = Landlords()
    self.accommodations = AccommodationHandler()

  def getAll(self):
    try:
      daoLandlords = self.landlords.getAll()
      if daoLandlords:
        return jsonify([row for row in daoLandlords])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, u_id):
    try:
      daoLandlord = self.landlords.getById(u_id)
      if daoLandlord:
        return jsonify(daoLandlord)
      else:
        return jsonify('Landlord Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def login(self, json):
    email = json['landlord_email'].lower()
    password = json['landlord_password']
    landlord = guard.authenticate(email, password)
    token = {
      'landlord_id': landlord.lid,
      'access_token': guard.encode_jwt_token(landlord) 
      }
    return jsonify(token)
  
  @praetorian.auth_required
  def protected(self):
    json = { 'landlord_id': praetorian.current_user_id() }
    return self.getById(json)

  def refresh(self):
    old_token = guard.read_token_from_header()
    new_token = guard.refresh_jwt_token(old_token)
    token = { 'access_token': new_token }
    return jsonify(token)

  def addLandlord(self, json):
    try:
      name = json['landlord_name']
      email = json['landlord_email'].lower()
      password = json['landlord_password']
      phone = json['landlord_phone']
      valid, reason = self.checkInput(0, name, email, password, phone)
      # add landlord if input is valid
      if valid:
        newLandlord = self.landlords.addLandlord(name, email, guard.hash_password(password), phone)
        if newLandlord:
          return jsonify(newLandlord)
        else:
          return jsonify('Error adding Landlord'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateLandlord(self, json):
    try:
      identifier = praetorian.current_user_id()
      name = json['landlord_name']
      email = json['landlord_email']
      password = json['landlord_password']
      phone = json['landlord_phone']
      valid, reason = self.checkInput(identifier, name, email, password, phone)
      # update landlord if input is valid
      if valid:
        updatedLandlord = self.landlords.updateLandlord(identifier, name, email, guard.hash_password(password), phone)
        if updatedLandlord:
          return jsonify(updatedLandlord)
        else:
          return jsonify('Error updating Landlord'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateRating(self, json):
    try:
      daoLandlord = self.landlords.updateRating(json['landlord_id'])
      if daoLandlord:
        return jsonify(daoLandlord)
      else:
        return jsonify('Error updating Landlord Rating')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteLandlord(self):
    try:
      landlord_id = praetorian.current_user_id()
      deletedLandlord = self.landlords.deleteLandlord(landlord_id)
      deletedAccm = self.accommodations.deleteAccommodationCascade(landlord_id)
      if deletedLandlord and deletedAccm:
        db.commit()
        return jsonify(deletedLandlord)
      else:
        db.rollback()
        return jsonify('Error deleting Landlord'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkInput(self, identifier, name, email, password, phone):
    # strip function removes any spaces given
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
    return self.landlords.getEmail(email, identifier)

  def phoneValid(self, phone):
    phoneRegex = '^[2-9]\d{2}-\d{3}-\d{4}$'
    return not re.search(phoneRegex, phone)

  def phoneTaken(self, number, identifier):
    return self.landlords.getPhoneNumber(number, identifier)

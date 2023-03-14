from flask import jsonify
from backend.dao.landlords import Landlords

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

  def addLandlord(self, json):
    name = json['landlord_name']
    email = json['landlord_email'].lower()
    password = json['landlord_password']
    phone = json['landlord_phone']
    valid, reason = self.checkInput(0, name, email, password, phone)
    # add landlord if input is valid
    if valid:
      newLandlord = self.landlords.addLandlord(name, email, password, phone)
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
      updatedLandlord = self.landlords.updateLandlord(identifier, name, email, password, phone)
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
      if self.emailTaken(email, identifier):
        return False, 'Email Taken'
      if not len(password.strip()):
        return False, 'Empty Password'
      if not len(phone.strip()):
        return False, 'Empty Phone Number'
      if self.phoneTaken(phone, identifier):
        return False, 'Phone Number Taken'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def emailTaken(self, email, identifier):
    return self.landlords.getEmail(email, identifier)
  
  def phoneTaken(self, number, identifier):
    return self.landlords.getPhoneNumber(number, identifier)
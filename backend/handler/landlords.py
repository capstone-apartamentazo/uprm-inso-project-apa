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

  def updateLandlord(self, json):
    daoLandlord = self.getById(json)
    if daoLandlord:
      id = json['landlord_id']
      name = json['landlord_name']
      email = json['landlord_email']
      password = json['landlord_password']
      phone = json['landlord_phone']
      updatedLandlord = self.landlords.updateLandlord(id, name, email, password, phone)
      return jsonify(self.dictionary(updatedLandlord)), 200
    else:
      return jsonify('Landlord Not Found'), 405

  def emailTaken(self, email):
    return self.landlords.getEmail(email)
  
  def phoneTaken(self, number):
    return self.landlords.getPhoneNumber(number)

  def addLandlord(self, json):
    name = json['landlord_name']
    email = json['landlord_email'].lower()
    password = json['landlord_password']
    phoneNumber = json['landlord_phone']

    try:
      if not len(name.strip()):
        return jsonify('Empty Name'), 400
      if not len(email.strip()):
        return jsonify('Empty Email'), 400
      if self.emailTaken(email):
        return jsonify('Email Taken'), 400
      if not len(password.strip()):
        return jsonify('Empty Password'), 400
      if not len(phoneNumber.strip()):
        return jsonify('Empty Phone Number'), 400
      if self.phoneTaken(phoneNumber):
        return jsonify('Phone Number Taken'), 400
    except:
      return jsonify('Invalid Input'), 400

    newLandlord = self.landlords.addLandlord(name, email, password, phoneNumber)
    if newLandlord:
      return jsonify(self.dictionary(newLandlord)), 201
    else:
      return jsonify('Error adding Landlord'), 500

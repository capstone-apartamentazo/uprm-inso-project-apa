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
      return jsonify(self.dictionary(daoLandlord[0])), 200
    else:
      return jsonify('Landlord Not Found'), 405

  def updateLandlord(self, json):
    daoLandlord = self.getById(json)
    if daoLandlord:
      print(daoLandlord)
      id = json['landlord_id']
      name = json['landlord_name']
      email = json['landlord_email']
      password = json['landlord_password']
      phone = json['landlord_phone']
      updatedLandlord = self.landlords.updateLandlord(id, name, email, password, phone)
      return jsonify(self.dictionary(updatedLandlord[0])), 200
    else:
      return jsonify('Landlord Not Found'), 404

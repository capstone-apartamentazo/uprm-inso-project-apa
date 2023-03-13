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
    landlords = self.landlords.getAll()
    if landlords:
      result = []
      for landlord in landlords:
        result.append(self.dictionary(landlord))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405
  
  def getById(self, json):
    landlord = self.landlords.getById(json['landlord_id'])
    if landlord:
      return jsonify(self.dictionary(landlord[0])), 200
    else:
      return jsonify('Landlord Not Found'), 405

  def updateLandlord(self, json):
    landlord = self.getById(json)
    if landlord:
      print(landlord)
      id = json['landlord_id']
      name = json['landlord_name']
      email = json['landlord_email']
      password = json['landlord_password']
      phone = json['landlord_phone']
      updatedLandlord = self.landlords.updateLandlord(id, name, email, password, phone)
      return jsonify(self.dictionary(updatedLandlord[0])), 200
    else:
      return jsonify('Landlord Not Found'), 404

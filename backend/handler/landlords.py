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
      return jsonify(result)
    else:
      return jsonify('Error Ocurred'), 405

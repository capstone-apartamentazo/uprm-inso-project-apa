from flask import jsonify
from backend.dao.accommodations import Accommodations

class AccommodationHandler:
  def __init__(self):
    self.accommodations = Accommodations()
  
  def dictionary(self, row):
    data = {}
    data['Accommodation ID'] = row[0]
    data['Street'] = row[1]
    data['Accommodation Number'] = row[2]
    data['City'] = row[3]
    data['State'] = row[4]
    data['Country'] = row[5]
    data['Zip Code'] = row[6]
    data['Description'] = row[7]
    data['Landlord ID'] = row[8]
    return data

  def getAll(self):
    daoAccommodations = self.accommodations.getAll()
    if daoAccommodations:
      result = []
      for row in daoAccommodations:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoAccommodation = self.accommodations.getById(json['accm_id'])
    if daoAccommodation:
      return jsonify(self.dictionary(daoAccommodation)), 200
    else:
      return jsonify('Accommodation Not Found'), 405

  def getByLandlordId(self, json):
    daoAccommodations = self.accommodations.getByLandlordId(json['landlord_id'])
    if daoAccommodations:
      result = []
      for row in daoAccommodations:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Accommodations Not Found'), 405

  def addAccommodation(self, json):
    daoAccommodation = self.accommodations.addAccommodation(
                        json['accm_street'], json['accm_number'], json['accm_city'], 
                        json['accm_state'], json['accm_country'], json['accm_zipcode'], 
                        json['accm_description'], json['landlord_id'])
    
    if daoAccommodation:
      return jsonify(self.dictionary(daoAccommodation)), 200
    else:
      return jsonify('Error adding Accommodation'), 405

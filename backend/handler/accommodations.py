from flask import jsonify
from backend.dao.accommodations import Accommodations
from backend.dao.shared_amenities import SharedAmenities

class AccommodationHandler:
  def __init__(self):
    self.accommodations = Accommodations()
    self.amenities = SharedAmenities()
  
  def dictionary(self, row):
    data = {}
    data['Accommodation ID'] = row[0]
    data['Accommodation Title'] = row[1]
    data['Street'] = row[2]
    data['Accommodation Number'] = row[3]
    data['City'] = row[4]
    data['State'] = row[5]
    data['Country'] = row[6]
    data['Zip Code'] = row[7]
    data['Description'] = row[8]
    data['Landlord ID'] = row[9]
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
      json['accm_title'], json['accm_street'], json['accm_number'], 
      json['accm_city'], json['accm_state'], json['accm_country'], 
      json['accm_zipcode'], json['accm_description'], json['landlord_id'])

    if daoAccommodation:
      daoAmenities = self.amenities.addSharedAmenities(daoAccommodation[0])
      if daoAmenities:
        return jsonify(self.dictionary(daoAccommodation)), 200
      else:
        jsonify('Error adding Shared Amenities to Accommodation'), 405
    else:
      return jsonify('Error adding Accommodation'), 405

  def updateAccommodation(self, json):
    daoAccommodation = self.accommodations.updateAccommodation(
      json['accm_id'], json['accm_title'], json['accm_street'], 
      json['accm_number'], json['accm_city'], json['accm_state'], 
      json['accm_country'], json['accm_zipcode'], json['accm_description'])

    if daoAccommodation:
      return jsonify(self.dictionary(daoAccommodation)), 200
    else:
      return jsonify('Error updating Accommodation'), 405

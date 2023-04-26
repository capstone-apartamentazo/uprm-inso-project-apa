from flask import jsonify
from backend.dao.private_amenities import PrivateAmenities

class PrivateAmenitiesHandler:
  def __init__(self):
    self.amenities = PrivateAmenities()
  
  def dictionary(self, row):
    data = {}
    data['Private Amenities ID'] = row[0]
    data['Electricity'] = row[1]
    data['Water'] = row[2]
    data['Internet'] = row[3]
    data['Bed'] = row[4]
    data['Microwave'] = row[5]
    data['Air Conditioner'] = row[6]
    data['Parking'] = row[7]
    data['Balcony'] = row[7]
    data['Unit ID'] = row[9]
    return data

  def getAll(self):
    daoAmenities = self.amenities.getAll()
    if daoAmenities:
      result = []
      for row in daoAmenities:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoAmenities = self.amenities.getById(json['priv_amenities_id'])
    if daoAmenities:
      return jsonify(self.dictionary(daoAmenities)), 200
    else:
      return jsonify('Private Amenities Not Found'), 405

  def getByUnitId(self, json):
    daoAmenities = self.amenities.getByUnitId(json['unit_id'])
    if daoAmenities:
      result = []
      for row in daoAmenities:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Private Amenities Not Found'), 405

  def addPrivateAmenities(self, json):
    daoAmenities = self.amenities.addPrivateAmenities(json['unit_id'])
    if daoAmenities:
      return jsonify(self.dictionary(daoAmenities)), 200
    else:
      return jsonify('Error adding Private Amenities'), 405

  def updatePrivateAmenities(self, json):
    identifier = json['priv_amenities_id']
    electricity, water, internet = json['electricity'], json['water'], json['internet']
    bed, microwave, air_conditioner = json['bed'], json['microwave'], json['air_conditioner']
    parking, balcony = json['parking'], json['balcony']
    updatedAmenities = self.amenities.updatePrivateAmenities(identifier, electricity, water, internet, bed, microwave, air_conditioner, parking, balcony)
    if updatedAmenities:
      return jsonify(self.dictionary(updatedAmenities)), 200
    else:
      return jsonify('Error updating Private Amenities'), 500
    
  def deletePrivateAmenities(self, json):
    priv_amenities_id = json['priv_amenities_id']
    valid, reason = self.checkPrivateAmenitiesID(priv_amenities_id)
    if not valid:
      return jsonify(reason), 400
    else:
      deletedPrivateAmenities = self.amenities.deletePrivateAmenities(priv_amenities_id)
      
      if deletedPrivateAmenities:
        return jsonify(self.dictionary(deletedPrivateAmenities)), 200
      else:
        return jsonify('Error deleting Private Amenities'), 405
  
  def checkPrivateAmenitiesID(self, priv_amenities_id):
    try:
      if not self.amenities.getById(priv_amenities_id):
        return False, 'Private Amenities Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def deletePrivateAmenitiesCascade(self, json):
    unit_id = json['unit_id']
    deletedPrivateAmenities = self.amenities.deletePrivateAmenitiesCascade(unit_id)
    
    if deletedPrivateAmenities:
      return jsonify(self.dictionary(deletedPrivateAmenities)), 200
    else:
      return jsonify('Error deleting Private Amenities'), 405
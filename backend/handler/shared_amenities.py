from flask import jsonify
from backend.dao.shared_amenities import SharedAmenities

class SharedAmenitiesHandler:
  def __init__(self):
    self.amenities = SharedAmenities()
  
  def dictionary(self, row):
    data = {}
    data['Shared Amenities ID'] = row[0]
    data['Bedrooms'] = row[1]
    data['Bathrooms'] = row[2]
    data['Kitchen'] = row[3]
    data['Washer'] = row[4]
    data['Dryer'] = row[5]
    data['Internet'] = row[6]
    data['Pets Allowed'] = row[7]
    data['Accommodation ID'] = row[8]
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
    daoAmenities = self.amenities.getById(json['shared_amenities_id'])
    if daoAmenities:
      return jsonify(self.dictionary(daoAmenities)), 200
    else:
      return jsonify('Shared Amenities Not Found'), 405

  def getByAccommodationId(self, json):
    daoAmenities = self.amenities.getByAccommodationId(json['accm_id'])
    if daoAmenities:
      result = []
      for row in daoAmenities:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Shared Amenities Not Found'), 405

  def addSharedAmenities(self, json):
    daoAmenities = self.amenities.addSharedAmenities(json['accm_id'])
    if daoAmenities:
      return jsonify(self.dictionary(daoAmenities)), 200
    else:
      return jsonify('Error adding Accommodation'), 405

  def updateSharedAmenities(self, json):
    identifier = json['shared_amenities_id']
    bedrooms, bathrooms = json['bedrooms'], json['bathrooms']
    kitchen, washer, dryer = json['kitchen'], json['washer'], json['dryer']
    internet, pets_allowed = json['internet'], json['pets_allowed']
    updatedAmenities = self.amenities.updateSharedAmenities(identifier, bedrooms, bathrooms, kitchen, washer, dryer, internet, pets_allowed)
    if updatedAmenities:
      return jsonify(self.dictionary(updatedAmenities)), 200
    else:
      return jsonify('Error updating Shared Amenities'), 500

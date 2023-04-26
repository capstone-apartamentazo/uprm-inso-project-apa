from flask import jsonify
from backend.dao.units import Units
from backend.dao.private_amenities import PrivateAmenities
from backend.handler.leases import LeaseHandler
from backend.handler.private_amenities import PrivateAmenitiesHandler
from backend.handler.requests import RequestHandler

class UnitHandler:
  def __init__(self):
    self.units = Units()
    self.amenities = PrivateAmenities()
  
  def dictionary(self, row):
    data = {}
    data['Unit ID'] = row[0]
    data['Unit Number'] = row[1]
    data['Available'] = row[2]
    data['Shared'] = row[3]
    data['Price'] = row[4]
    data['Date Available'] = row[5]
    data['Contract Duration'] = row[6]
    data['Accommodation ID'] = row[7]
    return data

  def getAll(self):
    daoUnits = self.units.getAll()
    if daoUnits:
      result = []
      for row in daoUnits:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoUnit = self.units.getById(json['unit_id'])
    if daoUnit:
      return jsonify(self.dictionary(daoUnit)), 200
    else:
      return jsonify('Unit Not Found'), 405

  def getByAccommodationId(self, json):
    daoUnits = self.units.getByAccommodationId(json['accm_id'])
    if daoUnits:
      result = []
      for row in daoUnits:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Units Not Found in Accommodation'), 405

  def addUnit(self, json):
    daoUnit = self.units.addUnit(json['unit_number'], json['shared'], json['price'], json['date_available'], json['contract_duration'], json['accm_id'])
    if daoUnit:
      daoAmenities = self.amenities.addPrivateAmenities(daoUnit[0])
      if daoAmenities:
        return jsonify(self.dictionary(daoUnit)), 200
      else:
        jsonify('Error adding Private Amenities to Unit'), 405
      return jsonify(self.dictionary(daoUnit)), 200
    else:
      return jsonify('Error adding Unit'), 405

  def updateUnit(self, json):
    identifier, number = json['unit_id'], json['unit_number']
    available, shared, price = json['available'], json['shared'], json['price']
    date_available, duration = json['date_available'], json['contract_duration']

    daoUnit = self.units.updateUnit(identifier, number, available, shared, price, date_available, duration)
    if daoUnit:
      return jsonify(self.dictionary(daoUnit)), 200
    else:
      return jsonify('Error updating Unit'), 500
    
  def checkUnitID(self, unit_id):
    try:
      if not self.units.getById(unit_id):
        return False, 'Unit Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''
    
  def deleteUnit(self, json):
    unit_id = json['unit_id']
    valid, reason = self.checkUnitID(unit_id)
    if not valid:
      return jsonify(reason), 400
    else:
      deletedUnit = self.units.deleteUnit(unit_id)
      PrivateAmenitiesHandler().deletePrivateAmenitiesCascade(unit_id)
      RequestHandler().deleteRequestCascadeUnit(unit_id)
      LeaseHandler().deleteLeaseCascadeUnit(unit_id)
      if deletedUnit:
        return jsonify(self.dictionary(deletedUnit)), 200
      else:
        return jsonify('Error deleting Unit'), 405
    
  def deleteUnitCascade(self, accm_id):
    deletedUnit = self.units.deleteUnitCascade(accm_id)
    for unit in deletedUnit:
        PrivateAmenitiesHandler().deletePrivateAmenitiesCascade(unit[0])
        RequestHandler().deleteRequestCascadeUnit(unit[0])
        LeaseHandler().deleteLeaseCascadeUnit(unit[0])
    if deletedUnit:
      return jsonify(self.dictionary(deletedUnit)), 200
    else:
      return jsonify('Error deleting Unit'), 405

from flask import jsonify
from backend.dao.units import Units

class UnitHandler:
  def __init__(self):
    self.units = Units()
  
  def dictionary(self, row):
    data = {}
    data['Unit ID'] = row[0]
    data['Available'] = row[1]
    data['Shared'] = row[2]
    data['Price'] = row[3]
    data['Start Date'] = row[4]
    data['End Date'] = row[5]
    data['Accommodation ID'] = row[6]
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
    daoUnit = self.units.addUnit(json['shared'], json['price'], json['init_date'], json['end_date'], json['accm_id'])
    if daoUnit:
      return jsonify(self.dictionary(daoUnit)), 200
    else:
      return jsonify('Error adding Unit'), 405

  def updateUnit(self, json):
    identifier = json['unit_id']
    available, shared, price = json['available'], json['shared'], json['price']
    start, end = json['init_date'], json['end_date']

    updatedUnit = self.units.updateUnit(identifier, available, shared, price, start, end)
    if updatedUnit:
      return jsonify(self.dictionary(updatedUnit)), 200
    else:
      return jsonify('Error updating Unit'), 500

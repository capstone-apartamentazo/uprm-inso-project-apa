from flask import jsonify
from psycopg2 import Error as pgerror
from handler.leases import LeaseHandler
from handler.private_amenities import PrivateAmenitiesHandler
from handler.requests import RequestHandler
from util.config import db, logger, landlord_guard as guard
from dao.units import Units
from dao.accommodations import Accommodations
import flask_praetorian as praetorian
import re

class UnitHandler:
  def __init__(self):
    self.units = Units()
    self.accommodations = Accommodations()
    self.pAmenities = PrivateAmenitiesHandler()
    self.request = RequestHandler()
    self.lease = LeaseHandler()


  def getAll(self):
    try:
      daoUnits = self.units.getAll()
      if daoUnits:
        return jsonify([row for row in daoUnits])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoUnit = self.units.getById(json['unit_id'])
      if daoUnit:
        return jsonify(daoUnit)
      else:
        return jsonify('Unit Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByAccommodationId(self, json):
    try:
      daoUnits = self.units.getByAccommodationId(json['accm_id'])
      if daoUnits:
        return jsonify([row for row in daoUnits])
      else:
        return jsonify('Units Not Found in Accommodation')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addUnit(self, json):
    try:
      accm_id = json['accm_id']
      valid, reason = self.checkAccm(accm_id)
      if not valid:
        return jsonify(reason)
      daoUnit = self.units.addUnit(json['unit_number'], json['shared'], json['price'], json['date_available'], json['contract_duration'], accm_id)
      if daoUnit:
        return jsonify(daoUnit)
      else:
          jsonify('Error adding Unit and Private Amenities'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateUnit(self, json):
    try:
      unit_id, number = json['unit_id'], json['unit_number']
      available, shared, price = json['available'], json['shared'], json['price']
      date_available, duration = json['date_available'], json['contract_duration']
      valid, reason = self.checkUnit(unit_id)
      if not valid:
        return jsonify(reason)
      daoUnit = self.units.updateUnit(unit_id, number, available, shared, price, date_available, duration)
      if daoUnit:
        return jsonify(daoUnit)
      else:
        return jsonify('Error updating Unit'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteUnitCascade(self, accm_id):
    try:
      deletedUnit = self.units.deleteUnitCascade(accm_id)
      for unit in deletedUnit:
        deletedPrivAmenities = self.pAmenities.deletePrivAmenitiesCascade(unit['unit_id'])
        deletedRequest = self.request.deleteRequestCascade(unit['unit_id'])
        deletedLease = self.lease.deleteLeaseCascade(unit['unit_id'])
        if not deletedPrivAmenities and deletedRequest and deletedLease:
          return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkUnit(self, identifier):
    daoUnit = self.units.getById(identifier)
    if not daoUnit:
      return False, 'Unit Not Found'
    return self.checkAccm(daoUnit['accm_id'])

  def checkAccm(self, identifier):
    daoAccommodation = self.accommodations.getById(identifier)
    role = praetorian.current_rolenames().pop()
    if not daoAccommodation:
      return False, 'Accommodation Not Found'
    if daoAccommodation['landlord_id'] != praetorian.current_user_id() or role != 'landlord':
      return False, 'Accommodation is not own by Landlord'
    else:
      return True , ''

from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, landlord_guard as guard
from dao.private_amenities import PrivateAmenities
from dao.units import Units
from dao.accommodations import Accommodations
import flask_praetorian as praetorian

class PrivateAmenitiesHandler:
  def __init__(self):
    self.amenities = PrivateAmenities()
    self.units = Units()
    self.accommodations = Accommodations()

  def getAll(self):
    try:
      daoAmenities = self.amenities.getAll()
      if daoAmenities:
        return jsonify([row for row in daoAmenities])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoAmenities = self.amenities.getById(json['priv_amenities_id'])
      if daoAmenities:
        return jsonify(daoAmenities)
      else:
        return jsonify('Private Amenities Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByUnitId(self, json):
    try:
      daoAmenities = self.amenities.getByUnitId(json['unit_id'])
      if daoAmenities:
        return jsonify(daoAmenities)
      else:
        return jsonify('Private Amenities Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addPrivateAmenities(self, json):
    try:
      unit_id = json['unit_id']
      valid, reason = self.checkUnit(unit_id)
      if not valid:
        return jsonify(reason)
      daoAmenities = self.amenities.addPrivateAmenities(unit_id)
      if daoAmenities:
        return jsonify(daoAmenities)
      else:
        return jsonify('Error adding Private Amenities'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updatePrivateAmenities(self, json):
    try:
      amenities_id = json['priv_amenities_id']
      electricity, water, internet = json['electricity'], json['water'], json['internet']
      bed, microwave, air_conditioner = json['bed'], json['microwave'], json['air_conditioner']
      parking, balcony = json['parking'], json['balcony']
      valid, reason = self.checkAmenities(amenities_id)
      if not valid:
        return jsonify(reason)
      updatedAmenities = self.amenities.updatePrivateAmenities(amenities_id, electricity, water, internet, bed, microwave, air_conditioner, parking, balcony)
      if updatedAmenities:
        return jsonify(updatedAmenities)
      else:
        return jsonify('Error updating Private Amenities'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkAmenities(self, identifier):
    daoAmenities = self.amenities.getById(identifier)
    if not daoAmenities:
      return False, 'Shared Amenities Not Found'
    return self.checkUnit(daoAmenities['unit_id'])

  def checkUnit(self, identifier):
    role = praetorian.current_rolenames().pop()
    daoUnit = self.units.getById(identifier)
    if not daoUnit:
      return False, 'Unit Not Found'
    daoAccommodation = self.accommodations.getById(daoUnit['accm_id'])
    if not daoAccommodation:
      return False, 'Accommodation Not Found'
    if daoAccommodation['landlord_id'] != praetorian.current_user_id() or role != 'landlord':
      return False, 'Accommodation is not own by Landlord'
    else:
      return True , ''

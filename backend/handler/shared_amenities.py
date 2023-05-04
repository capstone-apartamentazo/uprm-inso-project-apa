from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, landlord_guard as guard
from dao.shared_amenities import SharedAmenities
from dao.accommodations import Accommodations
import flask_praetorian as praetorian

class SharedAmenitiesHandler:
  def __init__(self):
    self.amenities = SharedAmenities()
    self.accommodations = Accommodations()

  def getAll(self):
    try:
      daoAmenities = self.amenities.getAll()
      if daoAmenities:
        return jsonify([row for row in daoAmenities])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoAmenities = self.amenities.getById(json['shared_amenities_id'])
      if daoAmenities:
        return jsonify(daoAmenities)
      else:
        return jsonify('Shared Amenities Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByAccommodationId(self, accm_id):
    try:
      daoAmenities = self.amenities.getByAccommodationId(accm_id)
      if daoAmenities:
        return jsonify(daoAmenities)
      else:
        return jsonify('Shared Amenities Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addSharedAmenities(self, json):
    try:
      accm_id = json['accm_id']
      valid, reason = self.checkAccm(accm_id)
      if not valid:
        return jsonify(reason)
      daoAmenities = self.amenities.addSharedAmenities(accm_id)
      if daoAmenities:
        db.commit()
        return jsonify(daoAmenities)
      else:
        return jsonify('Error adding Shared Amenities'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateSharedAmenities(self, json):
    try:
      amenities_id = json['shared_amenities_id']
      kitchen = json['shared_kitchen']
      bathroom = json['shared_bathroom']
      washer = json['shared_washer']
      dryer = json['shared_dryer']
      pets_allowed = json['pets_allowed']
      valid, reason = self.checkAmenities(amenities_id)
      if not valid:
        return jsonify(reason)
      updatedAmenities = self.amenities.updateSharedAmenities(amenities_id, kitchen, bathroom, washer, dryer, pets_allowed)
      if updatedAmenities:
        db.commit()
        return jsonify(updatedAmenities)
      else:
        return jsonify('Error updating Shared Amenities'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteSharedAmenitiesCascade(self, accm_id):
    try:
      deletedSharedAmenities = self.amenities.deleteSharedAmenitiesCascade(accm_id)
      if not deletedSharedAmenities:
        return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkAmenities(self, identifier):
    daoAmenities = self.amenities.getById(identifier)
    if not daoAmenities:
      return False, 'Shared Amenities Not Found'
    return self.checkAccm(daoAmenities['accm_id'])

  def checkAccm(self, identifier):
    daoAccommodation = self.accommodations.getById(identifier)
    role = praetorian.current_rolenames().pop()
    if not daoAccommodation:
      return False, 'Accommodation Not Found'
    if daoAccommodation['landlord_id'] != praetorian.current_user_id() or role != 'landlord':
      return False, 'Accommodation is not own by Landlord'
    else:
      return True , ''

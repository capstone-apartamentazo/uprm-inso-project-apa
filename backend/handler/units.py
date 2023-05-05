from flask import jsonify
from psycopg2 import Error as pgerror
from handler.leases import LeaseHandler
from handler.private_amenities import PrivateAmenitiesHandler
from util.config import db, logger, landlord_guard as guard
from dao.units import Units
from dao.accommodations import Accommodations
import flask_praetorian as praetorian
from cloudinary.uploader import upload
from cloudinary.search import Search
from cloudinary.api import delete_resources
import re

class UnitHandler:
  def __init__(self):
    self.units = Units()
    self.accommodations = Accommodations()
    self.pAmenities = PrivateAmenitiesHandler()
    self.lease = LeaseHandler()


  def getAll(self):
    try:
      daoUnits = self.units.getAll()
      if daoUnits:
        return jsonify([row for row in daoUnits])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, unit_id):
    try:
      daoUnit = self.units.getById(unit_id)
      if daoUnit:
        return jsonify(daoUnit)
      else:
        return jsonify('Unit Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByAccommodationId(self, accm_id):
    try:
      daoUnits = self.units.getByAccommodationId(accm_id)
      if daoUnits:
        return jsonify([row for row in daoUnits])
      else:
        return jsonify('Units Not Found in Accommodation')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addUnit(self, json):
    try:
      valid, reason = self.checkInput(json['unit_number'], json['tenant_capacity'], json['price'], json['size'], json['contract_duration'])
      if not valid:
        return jsonify(reason)
      valid, reason = self.checkAccm(json['accm_id'])
      if not valid:
        return jsonify(reason)
      daoUnit = self.units.addUnit(json['unit_number'], json['tenant_capacity'], json['price'], json['size'], json['date_available'], json['contract_duration'], json['accm_id'])
      if daoUnit:
        db.commit()
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
      valid, reason = self.checkInput(json['unit_number'], json['tenant_capacity'], json['price'], json['size'], json['contract_duration'])
      if not valid:
        return jsonify(reason)
      valid, reason = self.checkUnit(json['unit_id'])
      if not valid:
        return jsonify(reason)
      daoUnit = self.units.updateUnit(json['unit_id'], json['unit_number'], json['available'], json['tenant_capacity'], json['price'], json['size'], json['date_available'], json['contract_duration'])
      if daoUnit:
        db.commit()
        return jsonify(daoUnit)
      else:
        return jsonify('Error updating Unit'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getImages(self, unit_id):
    try:
      daoUnit = self.units.getById(unit_id)
      if not daoUnit:
        return False, 'Unit Not Found'
      accm_id = daoUnit['accm_id']
      landlord_id = self.accommodations.getById(accm_id)['landlord_id']
      query = 'folder:apartamentazo/landlords/landlord_{}/accm_{}/unit_{} AND tags:unit'.format(landlord_id, accm_id, unit_id)
      image = Search().expression(query).sort_by('public_id', 'asc').execute()['resources']
      secure_urls = [{"secure_url": obj["secure_url"]} for obj in image]
      return jsonify(secure_urls)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def uploadImages(self, json):
    try:
      unit_id = json['unit_id']
      valid, reason = self.checkUnit(unit_id)
      if not valid:
        return jsonify(reason)
      accm_id = self.units.getById(unit_id)['accm_id']
      image = upload(
        json['image'],
        public_id = json['order'],
        folder = 'apartamentazo/landlords/landlord_{}/accm_{}/unit_{}'.format(praetorian.current_user_id(), accm_id, unit_id),
        tags='unit'
      )
      return jsonify(image)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteImage(self, unit_id, img_id):
    try:
      valid, reason = self.checkUnit(unit_id)
      if not valid:
        return jsonify(reason)
      accm_id = self.units.getById(unit_id)['accm_id']
      query = 'apartamentazo/landlords/landlord_{}/accm_{}/unit_{}/{}'.format(praetorian.current_user_id(), accm_id, unit_id, img_id)
      image_delete_result = delete_resources(query, resource_type="image", type="upload")
      return jsonify(image_delete_result)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteUnitCascade(self, accm_id):
    try:
      deletedUnit = self.units.deleteUnitCascade(accm_id)
      for unit in deletedUnit:
        deletedPrivAmenities = self.pAmenities.deletePrivAmenitiesCascade(unit['unit_id'])
        deletedLease = self.lease.deleteLeaseCascade(unit['unit_id'])
        if not deletedPrivAmenities and deletedLease:
          return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteUnit(self, unit_id):
    try:
      if len(self.units.getByAccommodationId(self.units.getById(unit_id)['accm_id'])) == 1:
        return jsonify('You must have at least 1 unit associated to your accommodation.')
      deletedUnit = self.units.deleteUnit(unit_id)
      deletedPrivAmenities = self.pAmenities.deletePrivAmenitiesCascade(unit_id)
      deletedLease = self.lease.deleteLeaseCascade(unit_id)
      if not deletedUnit and deletedPrivAmenities and deletedLease:
        return jsonify('Error deleting unit')
      db.commit()
      return jsonify('Successfully deleted unit!')
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

  def checkInput(self, unit_number, tenant_capacity, price, size, contract_duration):
    if isinstance(unit_number, bool):
      return False, 'unit_number can\'t be bool'
    if self.unitNumValid(unit_number):
      return False, 'Unit number can only contain numbers, leters and hyphen and max 10 characters. (Hyphen are optional but cannot start or end with a hyphen -)'
    if not isinstance(tenant_capacity, int):
      return False, 'tenant_capacity must be a number not a string'
    if isinstance(tenant_capacity, bool):
      return False, 'tenant_capacity must be a number not a bool'
    if not isinstance(price, int):
      return False, 'price must be a number not a string'
    if isinstance(price, bool):
      return False, 'price must be a number not a bool'
    if not isinstance(size, int):
      return False, 'size must be a number not a string'
    if isinstance(size, bool):
      return False, 'size must be a number not a bool'
    if not isinstance(contract_duration, int):
      return False, 'size must be a number not a string'
    if isinstance(contract_duration, bool):
      return False, 'contract_duration must be a number not a bool'
    else:
      return True , ''
    
  def unitNumValid(self, number):
    if not number:
      return
    numberRegex = '^(?!-)(?!.*-$)[\w-]{1,10}$'
    return not re.search(numberRegex, number)


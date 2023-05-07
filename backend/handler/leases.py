from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, tenant_guard as guard
from dao.leases import Leases
from dao.tenants import Tenants
from dao.units import Units
import flask_praetorian as praetorian

class LeaseHandler:
  def __init__(self):
    self.leases = Leases()
    self.tenant = Tenants()
    self.units = Units()

  def getAll(self):
    try: 
      daoLeases = self.leases.getAll()
      if daoLeases:
        return jsonify([row for row in daoLeases])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, lease_id):
    try:
      daoLease = self.leases.getById(lease_id)
      if daoLease:
        return jsonify(daoLease)
      else:
          return jsonify('Lease Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByUnitId(self, unit_id):
    try:
      daoLeases = self.leases.getByUnitId(unit_id)
      if daoLeases:
        return jsonify([row for row in daoLeases])
      else:
          return jsonify('Leases from Units Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByTenantId(self, tenant_id):
    try:
      daoLeases = self.leases.getByTenantId(tenant_id)
      if daoLeases:
        return jsonify([row for row in daoLeases])
      else:
          return jsonify('Leases from Tenant Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addLease(self, json):
    try:
      price = json['price']
      start = json['init_date']
      end = json['end_date']
      unit = json['unit_id']
      tenant = json['tenant_id']
      if not self.validLandlord(unit):
        return jsonify('Unit not own by Landlord')
      if not self.tenant.getById(tenant):
        return jsonify('Tenant not found')
      if self.leases.invalidTenant(tenant, start):
        return jsonify('Tenant already rents a Unit')
      daoLease = self.leases.addLease(price, start, end, unit, tenant)
      self.updateCurrentTenants()
      self.units.available('false', unit)
      if daoLease:
        db.commit()
        return jsonify(daoLease)
      else:
        return jsonify('Error adding Lease'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateCurrentTenants(self):
    try:
      daoLeases = self.leases.updateCurrentTenants()
      if daoLeases:
        db.commit()
        return jsonify([row for row in daoLeases])
      else:
        return jsonify('Error updating Current Tenants from Leases'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def extendLease(self, json, lease_id):
    try:
      end = json['end_date']
      daoLease = self.leases.getById(lease_id)
      if not daoLease:
        return jsonify('Lease not Found')
      if not self.leases.extensionValid(daoLease['end_date'], end)['is_valid']:
        return jsonify('New end date not valid for extension')
      if not self.validLandlord(daoLease['unit_id']):
        return jsonify('Unit not own by Landlord')
      leaseExtended = self.leases.extendLease(lease_id, end)
      if leaseExtended:
        db.commit()
        return jsonify(leaseExtended)
      else:
        return jsonify('Error extending lease'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteLease(self, lease_id):
    try:
      daoLease = self.leases.getById(lease_id)
      if not daoLease:
        return jsonify('Lease not Found')
      if not self.validLandlord(daoLease['unit_id']):
        return jsonify('Unit not own by Landlord')
      daoLease = self.leases.deleteLease(lease_id)
      self.units.available('true', daoLease['unit_id'])
      if daoLease:
        db.commit()
        return jsonify('Lease deleted')
      else:
        return jsonify('Error deleting Lease'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteLeaseCascade(self, unit_id):
    try:
      if not self.leases.deleteLeaseCascade(unit_id):
        return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def validLandlord(self, unit_id):
    daoLandlord = self.leases.getLandlordFromUnit(unit_id)
    if daoLandlord['landlord_id'] != praetorian.current_user_id():
      return False
    return True
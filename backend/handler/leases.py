from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, tenant_guard as guard
from dao.leases import Leases
import flask_praetorian as praetorian

class LeaseHandler:
  def __init__(self):
    self.leases = Leases()

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

  def getById(self, json):
    try:
      daoLease = self.leases.getById(json['lease_id'])
      if daoLease:
        return jsonify(daoLease)
      else:
          return jsonify('Lease Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByUnitId(self, json):
    try:
      daoLeases = self.leases.getByUnitId(json['unit_id'])
      if daoLeases:
        return jsonify(daoLeases)
      else:
          return jsonify('Leases from Units Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByTenantId(self, json):
    try:
      daoLeases = self.leases.getByTenantId(json['tenant_id'])
      if daoLeases:
        return jsonify(daoLeases)
      else:
          return jsonify('Leases from Tenant Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def addLease(self, json):
    try:
      price, start, end = json['price'], json['init_date'], json['end_date']
      unit, tenant = json['unit_id'], json['tenant_id']
      daoLease = self.leases.addLease(price, start, end, unit, tenant)
      if daoLease:
        db.commit()
        return jsonify(daoLease)
      else:
        return jsonify('Error adding Lease'), 405
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateLease(self, json):
    try:
      identifier, price = json['lease_id'], json['price']
      start, end = json['init_date'], json['end_date']
      currTenant, unit, tenant = json['is_current_tenant'], json['unit_id'], json['tenant_id']
      daoLease = self.leases.updateLease(identifier, price, start, end, currTenant, unit, tenant)
      if daoLease:
        db.commit()
        return jsonify(daoLease)
      else:
        return jsonify('Error updating Lease'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateCurrentTenant(self, json):
    try:
      daoLease = self.leases.updateCurrentTenant(json['lease_id'], json['is_current_tenant'])
      if daoLease:
        db.commit()
        return jsonify(daoLease)
      else:
        return jsonify('Error updating Current Tenant from Lease'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteLeaseCascade(self, unit_id):
    try:
      deleteLeaseCascade = self.leases.deleteLeaseCascade(unit_id)
      if not deleteLeaseCascade:
        return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    

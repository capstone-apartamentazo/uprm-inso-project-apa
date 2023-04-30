from flask import jsonify
from dao.requests import Requests
from util.config import db, logger, landlord_guard as guard
from psycopg2 import Error as pgerror
import flask_praetorian as praetorian

class RequestHandler:
  def __init__(self):
    self.requests = Requests()

  def getAll(self):
    try:
      daoRequests = self.requests.getAll()
      if daoRequests:
        return jsonify([row for row in daoRequests])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoRequest = self.requests.getById(json['request_id'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Request Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByUnitId(self, json):
    try:
      daoRequests = self.requests.getByUnitId(json['unit_id'])
      if daoRequests:
        return jsonify([row for row in daoRequests])
      else:
        return jsonify('Requests from Units Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByTenantId(self, json):
    try:
      daoRequests = self.requests.getByTenantId(json['tenant_id'])
      if daoRequests:
          return jsonify([row for row in daoRequests])
      else:
        return jsonify('Requests from Tenant Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def addRequestWithoutTour(self, json):
    try:
      daoRequest = self.requests.addRequestWithoutTour(json['unit_id'], json['tenant_id'], json['comment'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Error adding Request without Tour')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def addRequestWithTour(self, json):
    try:
      daoRequest = self.requests.addRequestWithTour(json['unit_id'], json['tenant_id'], True, json['tour_date'], json['comment'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Error adding Request with Tour')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateRequestTour(self, json):
    try:
      daoRequest = self.requests.updateRequestTour(json['request_id'], json['tenant_wants_tour'], json['tour_date'], json['comment'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Error updating tour in Request')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateLandlordApproval(self, json):
    try:
      daoRequest = self.requests.updateLandlordApproval(json['request_id'], json['landlord_approves'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Error updating landlord approval in Request')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateTenantApproval(self, json):
    try:
      daoRequest = self.requests.updateTenantApproval(json['request_id'], json['tenant_approves'])
      if daoRequest:
        return jsonify(daoRequest)
      else:
        return jsonify('Error updating tenant approval in Request')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteRequestCascade(self, unit_id):
    try:
      deleteRequestCascade = self.requests.deleteRequestCascade(unit_id)
      if not deleteRequestCascade:
        return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

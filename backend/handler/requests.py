from flask import jsonify
from backend.dao.requests import Requests

class RequestHandler:
  def __init__(self):
    self.requests = Requests()
  
  # TODO maybe add accommodation info
  def dictionary(self, row):
    data = {}
    data['Request ID'] = row[0]
    data['Tenant Wants Tour'] = row[1]
    data['Tour Date'] = row[2]
    data['Comment'] = row[3]
    data['Landlord Approves'] = row[4]
    data['Tenant Approves'] = row[5]
    data['Unit ID'] = row[6]
    data['Tenant ID'] = row[7]
    return data

  def getAll(self):
    daoRequests = self.requests.getAll()
    if daoRequests:
      result = []
      for row in daoRequests:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoRequest = self.requests.getById(json['request_id'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Request Not Found'), 405

  def getByUnitId(self, json):
    daoRequests = self.requests.getByUnitId(json['unit_id'])
    if daoRequests:
      result = []
      for row in daoRequests:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Requests from Units Not Found'), 405

  def getByTenantId(self, json):
    daoRequests = self.requests.getByTenantId(json['tenant_id'])
    if daoRequests:
      result = []
      for row in daoRequests:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Requests from Tenant Not Found'), 405

  def addRequestWithoutTour(self, json):
    daoRequest = self.requests.addRequestWithoutTour(json['unit_id'], json['tenant_id'], json['comment'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Error adding Request without Tour'), 405

  def addRequestWithTour(self, json):
    daoRequest = self.requests.addRequestWithTour(json['unit_id'], json['tenant_id'], True, json['tour_date'], json['comment'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Error adding Request with Tour'), 405

  def updateRequestTour(self, json):
    daoRequest = self.requests.updateRequestTour(json['request_id'], json['tenant_wants_tour'], json['tour_date'], json['comment'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Error updating tour in Request'), 405

  def updateLandlordApproval(self, json):
    daoRequest = self.requests.updateLandlordApproval(json['request_id'], json['landlord_approves'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Error updating landlord approval in Request'), 405

  def updateTenantApproval(self, json):
    daoRequest = self.requests.updateTenantApproval(json['request_id'], json['tenant_approves'])
    if daoRequest:
      return jsonify(self.dictionary(daoRequest)), 200
    else:
      return jsonify('Error updating tenant approval in Request'), 405

  def deleteRequest(self, json):
    request_id = json['request_id']
    valid, reason = self.checkRequestID(request_id)
    if not valid:
      return jsonify(reason), 400
    else:
      deletedRequest = self.requests.deleteRequest(request_id)
      
      if deletedRequest:
        return jsonify(self.dictionary(deletedRequest)), 200
      else:
        return jsonify('Error deleting Request'), 405
  
  def deleteRequestCascade(self, tenant_id):
    deletedRequest = self.requests.deleteRequestCascade(tenant_id)
    
    if deletedRequest:
      return jsonify(self.dictionary(deletedRequest)), 200
    else:
      return jsonify('Error deleting Request'), 405
    
  def deleteRequestCascadeUnit(self, unit_id):
    deletedRequest = self.requests.deleteRequestCascadeUnit(unit_id)
    
    if deletedRequest:
      return jsonify(self.dictionary(deletedRequest)), 200
    else:
      return jsonify('Error deleting Request'), 405

  def checkRequestID(self, request_id):
    try:
      if not self.requests.getById(request_id):
        return False, 'Request Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''
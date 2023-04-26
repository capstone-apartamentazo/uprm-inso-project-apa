from flask import jsonify
from backend.dao.leases import Leases

class LeaseHandler:
  def __init__(self):
    self.leases = Leases()
  
  # TODO maybe add unit info
  def dictionary(self, row):
    data = {}
    data['Lease ID'] = row[0]
    data['Price'] = row[1]
    data['Start Date'] = row[2]
    data['End Date'] = row[3]
    data['Is Current Tenant'] = row[4]
    data['Unit ID'] = row[5]
    data['Tenant ID'] = row[6]
    return data

  def getAll(self):
    daoLeases = self.leases.getAll()
    if daoLeases:
      result = []
      for row in daoLeases:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoLease = self.leases.getById(json['lease_id'])
    if daoLease:
      return jsonify(self.dictionary(daoLease)), 200
    else:
      return jsonify('Lease Not Found'), 405

  def getByUnitId(self, json):
    daoLeases = self.leases.getByUnitId(json['unit_id'])
    if daoLeases:
      result = []
      for row in daoLeases:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Leases from Units Not Found'), 405

  def getByTenantId(self, json):
    daoLeases = self.leases.getByTenantId(json['tenant_id'])
    if daoLeases:
      result = []
      for row in daoLeases:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Leases from Tenant Not Found'), 405

  def addLease(self, json):
    price, start, end = json['price'], json['init_date'], json['end_date']
    unit, tenant = json['unit_id'], json['tenant_id']
    daoLease = self.leases.addLease(price, start, end, unit, tenant)
    if daoLease:
      return jsonify(self.dictionary(daoLease)), 200
    else:
      return jsonify('Error adding Lease'), 405

  def updateLease(self, json):
    identifier, price = json['lease_id'], json['price']
    start, end = json['init_date'], json['end_date']
    currTenant, unit, tenant = json['is_current_tenant'], json['unit_id'], json['tenant_id']
    daoLease = self.leases.updateLease(identifier, price, start, end, currTenant, unit, tenant)
    if daoLease:
      return jsonify(self.dictionary(daoLease)), 200
    else:
      return jsonify('Error updating Lease'), 405

  def updateCurrentTenant(self, json):
    daoLease = self.leases.updateCurrentTenant(json['lease_id'], json['is_current_tenant'])
    if daoLease:
      return jsonify(self.dictionary(daoLease)), 200
    else:
      return jsonify('Error updating Current Tenant from Lease'), 405
    
  def deleteLease(self, json):
    lease_id = json['lease_id']
    valid, reason = self.checkLeaseID(lease_id)
    if not valid:
      return jsonify(reason), 400
    else:
      deletedLease = self.leases.deleteLease(lease_id)
      
      if deletedLease:
        return jsonify(self.dictionary(deletedLease)), 200
      else:
        return jsonify('Error deleting Lease'), 405
  
  def deleteLeaseCascade(self, tenant_id):
    deletedLease = self.leases.deleteLeaseCascade(tenant_id)
    
    if deletedLease:
      return jsonify(self.dictionary(deletedLease)), 200
    else:
      return jsonify('Error deleting Lease'), 405
    
  def deleteLeaseCascadeUnit(self, unit_id):
    deletedLease = self.leases.deleteLeaseCascadeUnit(unit_id)
    
    if deletedLease:
      return jsonify(self.dictionary(deletedLease)), 200
    else:
      return jsonify('Error deleting Lease'), 405

  def checkLeaseID(self, lease_id):
    try:
      if not self.leases.getById(lease_id):
        return False, 'Lease Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

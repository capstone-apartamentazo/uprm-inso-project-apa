from flask import jsonify
from backend.dao.tenants import Tenants

class TenantHandler:
  def __init__(self):
    self.tenants = Tenants()
  
  def dictionary(self, row):
    data = {}
    data['Tenant ID'] = row[0]
    data['Tenant Name'] = row[1]
    data['Tenant Email'] = row[2]
    data['Tenant Password'] = row[3]
    data['Tenant Phone'] = row[4]
    return data

  def getAll(self):
    daoTenants = self.tenants.getAll()
    if daoTenants:
      result = []
      for row in daoTenants:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405
  
  def getById(self, json):
    daoTenant = self.tenants.getById(json['tenant_id'])
    if daoTenant:
      return jsonify(self.dictionary(daoTenant[0])), 200
    else:
      return jsonify('Tenant Not Found'), 405

  def updateTenant(self, json):
    daoTenant = self.getById(json)
    if daoTenant:
      print(daoTenant)
      id = json['tenant_id']
      name = json['tenant_name']
      email = json['tenant_email']
      password = json['tenant_password']
      phone = json['tenant_phone']
      updatedTenant = self.tenants.updateTenant(id, name, email, password, phone)
      return jsonify(self.dictionary(updatedTenant[0])), 200
    else:
      return jsonify('Tenant Not Found'), 404

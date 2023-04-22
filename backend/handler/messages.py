from flask import jsonify
from handler.landlords import LandlordHandler
from handler.tenants import TenantHandler
from dao.messages import Messages

class MessageHandler:
  def __init__(self):
    self.messages = Messages()
    self.landlordHandler = LandlordHandler()
    self.tenantHandler = TenantHandler()
  
  def dictionary(self, row):
    data = {}
    data['Message ID'] = row[0]
    data['Landlord ID'] = row[1]
    data['Tenant ID'] = row[2]
    data['Send Date'] = row[3]
    data['Landlord Sent Message'] = row[4]
    data['Content'] = row[5]
    data['Read'] = row[6]
    return data

  def getAll(self):
    daoMessages = self.messages.getAll()
    if daoMessages:
      result = []
      for row in daoMessages:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('No Messages'), 405

  def getById(self, json):
    daoMessage = self.messages.getById(json['message_id'])
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Message Not Found'), 405

  def getByLandlordId(self, json):
    output, status = self.landlordHandler.getById(json)
    # landlord exists
    if status == 200:
      daoMessages = self.messages.getByLandlordId(json['landlord_id'])
      if daoMessages:
        result = []
        for row in daoMessages:
          result.append(self.dictionary(row))
        return jsonify(result), 200
      else:
        return jsonify('Messages from Landlord Not Found'), 405
    # landlord does not exist
    else:
      return output, status

  def getByTenantId(self, json):
    output, status = self.tenantHandler.getById(json)
    # tenant exists
    if status == 200:
      daoMessages = self.messages.getByTenantId(json['tenant_id'])
      if daoMessages:
        result = []
        for row in daoMessages:
          result.append(self.dictionary(row))
        return jsonify(result), 200
      else:
        return jsonify('Messages from Tenant Not Found'), 405
    # tenant does not exist
    else:
      return output, status
  
  def getByConstraint(self, json):
    daoMessage = self.messages.getByConstraint(json['landlord_id'], json['tenant_id'], json['msg_send_date'], json['landlord_sent_msg'])
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Message Not Found'), 405
  
  def getConversation(self, json):
    daoMessages = self.messages.getConversation(json['landlord_id'], json['tenant_id'])
    if daoMessages:
      result = []
      for row in daoMessages:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Conversation Not Found'), 405

  def landlordSendsMessage(self, json):
    content = json['msg_content']
    if not len(content.strip()):
      return jsonify('Empty Message'), 400
    daoMessage = self.messages.landlordSendsMessage(json['landlord_id'], json['tenant_id'], content)
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Error creating Message'), 405

  def tenantSendsMessage(self, json):
    content = json['msg_content']
    if not len(content.strip()):
      return jsonify('Empty Message'), 400
    daoMessage = self.messages.tenantSendsMessage(json['landlord_id'], json['tenant_id'], content)
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Error creating Message'), 405

  def messageRead(self, json):
    daoMessage = self.messages.messageRead(json['message_id'])
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Error updating Message'), 405

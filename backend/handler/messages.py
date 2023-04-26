from flask import jsonify
from backend.dao.messages import Messages

class MessageHandler:
  def __init__(self):
    self.messages = Messages()
  
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
  
  def deleteMessage(self, json):
    message_id = json['message_id']
    valid, reason = self.checkMessageID(message_id)
    if not valid:
      return jsonify(reason), 400
    else:
      deletedMessage = self.messages.deleteMessage(message_id)
      
      if deletedMessage:
        return jsonify(self.dictionary(deletedMessage)), 200
      else:
        return jsonify('Error deleting Message'), 405
  
  def checkMessageID(self, message_id):
    try:
      if not self.messages.getById(message_id):
        return False, 'Message Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

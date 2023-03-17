from flask import jsonify
from backend.dao.messages import Messages

class MessageHandler:
  def __init__(self):
    self.messages = Messages()
  
  def dictionary(self, row):
    data = {}
    data['Landlord ID'] = row[0]
    data['Tenant ID'] = row[1]
    data['Send Date'] = row[2]
    data['Landlord Sent Message'] = row[3]
    data['Content'] = row[4]
    data['Read'] = row[5]
    return data

  def getAll(self):
    daoMessages = self.messages.getAll()
    if daoMessages:
      result = []
      for row in daoMessages:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405
  
  def getByPrimaryKeys(self, json):
    daoMessage = self.messages.getByPrimaryKeys(json['landlord_id'], json['tenant_id'], json['msg_send_date'])
    if daoMessage:
      return jsonify(self.dictionary(daoMessage)), 200
    else:
      return jsonify('Message Not Found'), 405

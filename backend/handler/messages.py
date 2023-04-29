from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger
from dao.messages import Messages
import flask_praetorian as praetorian

class MessageHandler:
  def __init__(self):
    self.messages = Messages()

  def getAll(self):
    try:
      daoMessages = self.messages.getAll()
      if daoMessages:
        return jsonify([row for row in daoMessages])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def getByUserId(self):
    try:
      daoMessages = []
      role = praetorian.current_rolenames().pop()
      if role == 'landlord':
        daoMessages = self.messages.getByLandlordId(praetorian.current_user_id())
      elif role == 'tenant':
        daoMessages = self.messages.getByTenantId(praetorian.current_user_id())
      if daoMessages:
        return jsonify([row for row in daoMessages])
      else:
        return jsonify('Messages from User is Empty')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoMessage = self.messages.getById(json['message_id'])
      if daoMessage:
        return jsonify(daoMessage)
      else:
        return jsonify('Message Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def getConversation(self, json):
    try:
      daoMessages = []
      role = praetorian.current_rolenames().pop()
      if role == 'landlord':
        self.messages.read(praetorian.current_user_id(), json['tenant_id'], role)
        daoMessages = self.messages.getConversation(praetorian.current_user_id(), json['tenant_id'])
      elif role == 'tenant':
        self.messages.read(json['landlord_id'], praetorian.current_user_id(), role)
        daoMessages = self.messages.getConversation(json['landlord_id'], praetorian.current_user_id())
      if daoMessages:
        return jsonify([row for row in daoMessages])
      else:
        return jsonify('Conversation Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def landlordSendsMessage(self, json):
    try:
      content = json['msg_content']
      if not len(content.strip()):
        return jsonify('Empty Message')
      daoMessage = self.messages.landlordSendsMessage(praetorian.current_user_id(), json['tenant_id'], content)
      if daoMessage:
        return jsonify(daoMessage)
      else:
        return jsonify('Error creating Message'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def tenantSendsMessage(self, json):
    try:
      content = json['msg_content']
      if not len(content.strip()):
        return jsonify('Empty Message')
      daoMessage = self.messages.tenantSendsMessage(json['landlord_id'], praetorian.current_user_id(), content)
      if daoMessage:
        return jsonify(daoMessage)
      else:
        return jsonify('Error creating Message'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteMessage(self, message_id):
    try:
      self.messages.deleteMessage(message_id)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

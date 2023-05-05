from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, mail
from dao.messages import Messages
import flask_praetorian as praetorian
from dao.units import Units
from dao.accommodations import Accommodations
from dao.tenants import Tenants
from dao.landlords import Landlords

class MessageHandler:
  def __init__(self):
    self.messages = Messages()
    self.units = Units()
    self.accommodations = Accommodations()
    self.tenant = Tenants()
    self.landlord = Landlords()

  def getAll(self):
    try:
      daoMessages = self.messages.getAll()
      if daoMessages:
        return jsonify([row for row in daoMessages])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
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
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def getConversation(self, u_id):
    try:
      daoMessages = []
      role = praetorian.current_rolenames().pop()
      if role == 'landlord':
        self.messages.read(praetorian.current_user_id(), u_id, role)
        daoMessages = self.messages.getConversation(praetorian.current_user_id(), u_id)
      elif role == 'tenant':
        self.messages.read(u_id, praetorian.current_user_id(), role)
        daoMessages = self.messages.getConversation(u_id, praetorian.current_user_id())
      if daoMessages:
        db.commit()
        return jsonify([row for row in daoMessages])
      else:
        return jsonify('Conversation Not Found')
    except (Exception, pgerror) as e:
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
        db.commit()
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
        db.commit()
        return jsonify(daoMessage)
      else:
        return jsonify('Error creating Message'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def tenantSendsRequestWithoutTour(self, json):
    try:
      daoUnit = self.units.getById(json['unit_id'])
      if not daoUnit:
        return jsonify('Unit Not found')
      daoAccommodation = self.accommodations.getById(daoUnit['accm_id'])
      content = 'I would like to request unit: {} from accommodation: {}. No need for a tour.'.format(daoUnit['unit_number'], daoAccommodation['accm_title'])
      daoMessage = self.messages.tenantSendsMessage(daoAccommodation['landlord_id'], praetorian.current_user_id(), content)
      tenant = self.tenant.getById(praetorian.current_user_id())
      landlord = self.landlord.getById(daoAccommodation['landlord_id'])
      if daoMessage:
        mail.send_message(
          sender= tenant['tenant_email'],
          subject='New request without tour for your unit!',
          recipients=[landlord['landlord_email']],
          body= 'Request was sent from {} about your unit: {} at {}\nPlease follow up using our message system or contact your new client at: {}'.format(tenant['tenant_name'], daoUnit['unit_number'], daoAccommodation['accm_title'],tenant['tenant_email'])
        )
        db.commit()
        return jsonify(daoMessage)
      else:
        return jsonify('Error creating Message'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def tenantSendsRequestWithTour(self, json):
    try:
      daoUnit = self.units.getById(json['unit_id'])
      if not daoUnit:
        return jsonify('Unit Not found')
      daoAccommodation = self.accommodations.getById(daoUnit['accm_id'])
      content = 'I would like to have a tour for unit: {} at {}.'.format(daoUnit['unit_number'], daoAccommodation['accm_title'])
      daoMessage = self.messages.tenantSendsMessage(daoAccommodation['landlord_id'], praetorian.current_user_id(), content)
      tenant = self.tenant.getById(praetorian.current_user_id())
      landlord = self.landlord.getById(daoAccommodation['landlord_id'])
      if daoMessage:
        mail.send_message(
          sender= tenant['tenant_email'],
          subject='New tour request for your unit!',
          recipients=[landlord['landlord_email']],
          body= 'Request was sent from {} about your unit: {} at {}\nPlease follow up using our message system or contact your new client at: {}'.format(tenant['tenant_name'], daoUnit['unit_number'], daoAccommodation['accm_title'],tenant['tenant_email'])
        )
        db.commit()
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
    

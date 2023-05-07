from flask import jsonify
from psycopg2 import Error as pgerror
from util.config import db, logger, mail, landlord_guard as guard
from dao.notices import Notices
from dao.accommodations import Accommodations
import flask_praetorian as praetorian
from dao.landlords import Landlords

class NoticeHandler:
  def __init__(self):
    self.notices = Notices()
    self.accommodations = Accommodations()
    self.landlord = Landlords()

  def getAll(self):
    try:
      daoNotices = self.notices.getAll()
      if daoNotices:
        return jsonify([row for row in daoNotices])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, json):
    try:
      daoNotice = self.notices.getById(json['notice_id'])
      if daoNotice:
        return jsonify(daoNotice)
      else:
        return jsonify('Notice Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def getByAccommodationId(self, accm_id):
    try:
      valid, reason = self.checkAccm(accm_id)
      if not valid:
        return jsonify(reason)
      daoNotices = self.notices.getByAccommodationId(accm_id)
      if daoNotices:
        return jsonify([row for row in daoNotices])
      else:
        return jsonify('Notices Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def getTenantNotices(self, accm_id):
    try:
      daoNotices = self.notices.getTenantNotices(accm_id, praetorian.current_user_id())
      if daoNotices:
        return jsonify([row for row in daoNotices])
      else:
        return jsonify('Notices Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addNotice(self, json):
    try:
      accm_id = json['accm_id']
      valid, reason = self.checkAccm(accm_id)
      if not valid:
        return jsonify(reason)
      if len(json['notice_title']) > 100:
        return jsonify('Title can\'t be larger than 100 characters.')
      if len(json['notice_content']) > 255:
        return jsonify('Your message can\'t be larger than 255 characters.')
      daoNotice = self.notices.addNotice(json['notice_title'], json['notice_content'], accm_id)
      landlord = self.landlord.getById(praetorian.current_user_id())
      currentTenants = self.notices.getCurrentTenants(accm_id)
      tenantList = []
      for tenant in currentTenants:
          tenantList.append(tenant['tenant_email'])
      if daoNotice:
        mail.send_message(
          sender= landlord['landlord_email'],
          subject=json['notice_title'],
          recipients=tenantList,
          body= json['notice_content']
        )
        db.commit()
        return jsonify(daoNotice)
      else:
        return jsonify('Error adding Notice'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateNotice(self, json):
    try:
      notice_id = json['notice_id']
      valid, reason = self.checkNotice(notice_id)
      if not valid:
        return jsonify(reason)
      if len(json['notice_title']) > 100:
        return jsonify('Title can\'t be larger than 100 characters.')
      if len(json['notice_content']) > 255:
        return jsonify('Your message can\'t be larger than 255 characters.')
      updatedNotice = self.notices.updateNotice(notice_id, json['notice_title'], json['notice_content'])
      if updatedNotice:
        db.commit()
        return jsonify(updatedNotice)
      else:
        return jsonify('Error updating Notice'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteNoticeCascade(self, accm_id):
    try:
      if not self.notices.getByAccommodationId(accm_id):
        return True # empty list
      if self.notices.deleteNoticeCascade(accm_id):
        return True
      return False
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def checkNotice(self, identifier):
    daoNotice = self.notices.getById(identifier)
    if not daoNotice:
      return False, 'Notice Not Found'
    return self.checkAccm(daoNotice['accm_id'])

  def checkAccm(self, identifier):
    daoAccommodation = self.accommodations.getById(identifier)
    role = praetorian.current_rolenames().pop()
    if not daoAccommodation:
      return False, 'Accommodation Not Found'
    if daoAccommodation['landlord_id'] != praetorian.current_user_id() or role != 'landlord':
      return False, 'Accommodation is not own by Landlord'
    else:
      return True , ''

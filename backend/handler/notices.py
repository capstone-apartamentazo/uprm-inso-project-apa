from flask import jsonify
from dao.notices import Notices

class NoticeHandler:
  def __init__(self):
    self.notices = Notices()
  
  def dictionary(self, row):
    data = {}
    data['Notice ID'] = row[0]
    data['Send Date'] = row[1]
    data['Title'] = row[2]
    data['Content'] = row[3]
    data['Accommodation ID'] = row[4]
    return data

  def getAll(self):
    daoNotices = self.notices.getAll()
    if daoNotices:
      result = []
      for row in daoNotices:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoNotice = self.notices.getById(json['notice_id'])
    if daoNotice:
      return jsonify(self.dictionary(daoNotice)), 200
    else:
      return jsonify('Notice Not Found'), 405

  def getByAccommodationId(self, json):
    daoNotices = self.notices.getByAccommodationId(json['accm_id'])
    if daoNotices:
      result = []
      for row in daoNotices:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Notices Not Found'), 405

  def addNotice(self, json):
    daoNotice = self.notices.addNotice(json['notice_title'], json['notice_content'], json['accm_id'])
    if daoNotice:
      return jsonify(self.dictionary(daoNotice)), 200
    else:
      return jsonify('Error adding Notice'), 405

  def updateNotice(self, json):
    updatedNotice = self.notices.updateNotice(json['notice_id'], json['notice_title'], json['notice_content'])
    if updatedNotice:
      return jsonify(self.dictionary(updatedNotice)), 200
    else:
      return jsonify('Error updating Notice'), 500

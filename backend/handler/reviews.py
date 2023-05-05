from flask import jsonify
from dao.reviews import Reviews
from dao.accommodations import Accommodations
from dao.landlords import Landlords
import flask_praetorian as praetorian
from psycopg2 import Error as pgerror
from util.config import db, logger, tenant_guard as guard

class ReviewHandler:
  def __init__(self):
    self.reviews = Reviews()
    self.accommodations = Accommodations()
    self.landlords = Landlords()

  def getAll(self):
    try:
      daoReviews = self.reviews.getAll()
      if daoReviews:
        return jsonify([row for row in daoReviews])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, review_id):
    try:
      daoReview = self.reviews.getById(review_id)
      if daoReview:
        return jsonify(daoReview)
      else:
        return jsonify('Review Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByAccommodationId(self, accm_id):
    try:
      daoReviews = self.reviews.getByAccommodationId(accm_id)
      if daoReviews:
        return jsonify([row for row in daoReviews])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByTenantId(self, tenant_id):
    try:
      daoReviews = self.reviews.getByTenantId(tenant_id)
      if daoReviews:
        return jsonify([row for row in daoReviews])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addReview(self, json):
    try:
      if not isinstance(json['rating'], int):
        return jsonify('Rating must be a number not a string')
      if isinstance(json['rating'], bool):
        return jsonify('Rating must be a numberm not a bool')
      if isinstance(json['comment'], bool):
        return jsonify('Rating must be a string not a bool')
      if len(json['comment']) > 255:
        return jsonify('Character limit is 255')
      accm = self.accommodations.getById(json['accm_id'])
      if not accm:
        return jsonify('Accommodation not found')
      daoReview = self.reviews.addReview(json['rating'], json['comment'], json['accm_id'], praetorian.current_user_id())
      if daoReview:
        landlord = self.landlords.updateRating(accm['landlord_id'])
        if not landlord:
          return jsonify('Error updating Landlord Rating'), 400
        db.commit()
        return jsonify(landlord), 200
      else:
        return jsonify('Error adding Review'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def deleteReviewCascade(self, accm_id):
    try:
      if not self.reviews.getByAccommodationId(accm_id):
        return True # empty list
      if self.reviews.deleteReview(accm_id):
        return True
      return False
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

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

  def getById(self, json):
    try:
      daoReview = self.reviews.getById(json['review_id'])
      if daoReview:
        return jsonify(daoReview)
      else:
        return jsonify('Review Not Found'), 400
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByAccommodationId(self, accm_id):
    try:
      daoReviews = self.reviews.getByAccommodationId(accm_id)
      if daoReviews:
        return jsonify([row for row in daoReviews]), 200
      else:
        return jsonify('Reviews Not Found'), 400
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByTenantId(self, json):
    try:
      daoReviews = self.reviews.getByTenantId(json['tenant_id'])
      if daoReviews:
        result = []
        for row in daoReviews:
          result.append(self.dictionary(row))
        return jsonify(result), 200
      else:
        return jsonify('Reviews Not Found'), 400
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def addReview(self, json):
    try:
      daoReview = self.reviews.addReview(json['rating'], json['comment'], json['accm_id'], json['tenant_id'])
      if daoReview:
        accm = self.accommodations.getById(json['accm_id'])
        if not accm:
          return jsonify('Error retrieving Accommodation'), 400
        landlord = self.landlords.updateRating(accm[9])
        if not landlord:
          db.commit()
          return jsonify('Error updating Landlord Rating'), 400
        return jsonify(landlord), 200
      else:
        return jsonify('Error adding Review'), 400
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def updateReview(self, json):
    try:
      daoReview = self.reviews.updateReview(json['review_id'], json['rating'], json['comment'])
      if daoReview:
        accm = self.accommodations.getById(json['accm_id'])
        if not accm:
          return jsonify('Error retrieving Accommodation'), 400
        landlord = self.landlords.updateRating(accm[9])
        if not landlord:
          db.commit()
          return jsonify('Error updating Landlord Rating'), 400
        return jsonify(landlord), 200
      else:
        return jsonify('Error updating Review'), 500
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  @praetorian.auth_required
  def deleteReviewCascade(self, accm_id):
    try:
      deleteReviewCascade = self.reviews.deleteReview(accm_id)
      if not deleteReviewCascade:
        return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
  


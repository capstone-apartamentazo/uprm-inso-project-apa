from flask import jsonify
from backend.dao.reviews import Reviews
from backend.handler.accommodations import Accommodations
from backend.handler.landlords import Landlords

class ReviewHandler:
  def __init__(self):
    self.reviews = Reviews()
    self.accommodations = Accommodations()
    self.landlords = Landlords()
  
  def dictionary(self, row):
    data = {}
    data['Review ID'] = row[0]
    data['Send Date'] = row[1]
    data['Rating'] = row[2]
    data['Comment'] = row[3]
    data['Accommodation ID'] = row[4]
    data['Tenant ID'] = row[5]
    return data

  def getAll(self):
    daoReviews = self.reviews.getAll()
    if daoReviews:
      result = []
      for row in daoReviews:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoReview = self.reviews.getById(json['review_id'])
    if daoReview:
      return jsonify(self.dictionary(daoReview)), 200
    else:
      return jsonify('Review Not Found'), 405

  def getByAccommodationId(self, json):
    daoReviews = self.reviews.getByAccommodationId(json['accm_id'])
    if daoReviews:
      result = []
      for row in daoReviews:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Reviews Not Found'), 405

  def getByTenantId(self, json):
    daoReviews = self.reviews.getByTenantId(json['tenant_id'])
    if daoReviews:
      result = []
      for row in daoReviews:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Reviews Not Found'), 405

  def addReview(self, json):
    daoReview = self.reviews.addReview(json['rating'], json['comment'], json['accm_id'], json['tenant_id'])
    if daoReview:
      accm = self.accommodations.getById(json['accm_id'])
      if not accm:
        return jsonify('Error retrieving Landlord Id'), 405
      landlord = self.landlords.updateRating(accm[9])
      if not landlord:
        return jsonify('Error updating Landlord Rating'), 405
      return jsonify(self.dictionary(daoReview)), 200
    else:
      return jsonify('Error adding Review'), 405

  def updateReview(self, json):
    daoReview = self.reviews.updateReview(json['review_id'], json['rating'], json['comment'])
    if daoReview:
      accm = self.accommodations.getById(json['accm_id'])
      if not accm:
        return jsonify('Error retrieving Landlord Id'), 405
      landlord = self.landlords.updateRating(accm[9])
      if not landlord:
        return jsonify('Error updating Landlord Rating'), 405
      return jsonify(self.dictionary(daoReview)), 200
    else:
      return jsonify('Error updating Review'), 500

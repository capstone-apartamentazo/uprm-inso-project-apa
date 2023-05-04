from flask import jsonify
from psycopg2 import Error as pgerror
from handler.notices import NoticeHandler
from handler.reviews import ReviewHandler
from handler.units import UnitHandler
from util.config import db, logger, gmaps, landlord_guard as guard
from dao.accommodations import Accommodations
from handler.shared_amenities import SharedAmenitiesHandler
import flask_praetorian as praetorian
from cloudinary.uploader import upload
from cloudinary.search import Search
from cloudinary.api import delete_resources
import re

class AccommodationHandler:
  def __init__(self):
    self.accommodations = Accommodations()
    self.amenities = SharedAmenitiesHandler()
    self.review = ReviewHandler()
    self.units = UnitHandler()
    self.notice = NoticeHandler()

  def getAll(self):
    try:
      daoAccommodations = self.accommodations.getAll()
      if daoAccommodations:
        return jsonify([row for row in daoAccommodations])
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getById(self, a_id):
    try:
      daoAccommodation = self.accommodations.getById(a_id)
      if daoAccommodation:
        return jsonify(daoAccommodation)
      else:
        return jsonify('Accommodation Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getByLandlordId(self, u_id):
    try:
      daoAccommodations = self.accommodations.getByLandlordId(u_id)
      if daoAccommodations:
        return jsonify([row for row in daoAccommodations])
      else:
        return jsonify('Accommodations Not Found')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def search(self, data, offset):
    try:
      # accm needs units to appear in the search
      daoAccommodations = self.accommodations.search(data, offset)
      if daoAccommodations:
        return jsonify([row for row in daoAccommodations])
      else:
        return jsonify('Accommodations Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def filter(self, json):
    try:
      amenities = 'bedrooms >= {} and bathrooms >= {}'.format(json['bedrooms'], json['bathrooms'])
      include = ' and '
      if json['shared_kitchen']:
        amenities = include.join([amenities, 'shared_kitchen = true'])
      if json['shared_bathroom']:
        amenities = include.join([amenities, 'shared_bathroom = true'])
      if json['shared_washer']:
        amenities = include.join([amenities, 'shared_washer = true'])
      if json['shared_dryer']:
        amenities = include.join([amenities, 'shared_dryer = true'])
      if json['pets_allowed']:
        amenities = include.join([amenities, 'pets_allowed = true'])
      if json['electricity']:
        amenities = include.join([amenities, 'electricity = true'])
      if json['water']:
        amenities = include.join([amenities, 'water = true'])
      if json['internet']:
        amenities = include.join([amenities, 'internet = true'])
      if json['heater']:
        amenities = include.join([amenities, 'heater = true'])
      if json['private_washer']:
        amenities = include.join([amenities, 'private_washer = true'])
      if json['private_dryer']:
        amenities = include.join([amenities, 'private_dryer = true'])
      if json['air_conditioner']:
        amenities = include.join([amenities, 'air_conditioner = true'])
      if json['parking']:
        amenities = include.join([amenities, 'parking = true'])
      if json['balcony']:
        amenities = include.join([amenities, 'balcony = true'])
      if not len(amenities.strip()):
        return jsonify('No Amenities to Filter')
      daoAmenities = self.accommodations.filter(amenities, json['offset'])
      if daoAmenities:
        return jsonify([row for row in daoAmenities])
      else:
        return jsonify('Accommodations Not Found')
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def score(self, json):
    try:
      weights = { 1: 35, 2: 25, 3: 20, 4: 15, 5: 5 }
      distance_weight = weights[json['distance']]
      price_weight = weights[json['price']]
      size_weight = weights[json['size']]
      amenities_weight = weights[json['amenities']]
      rating_weight = weights[json['ranking']]
      daoAccommodations = self.accommodations.calculateScore(distance_weight, price_weight, size_weight, amenities_weight, rating_weight)
      if daoAccommodations:
        return jsonify(daoAccommodations)
      else:
        return jsonify('Empty List')
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def addAccommodation(self, json):
    try:
      title = json['accm_title']
      street = json['accm_street']
      number = json['accm_number']
      city = json['accm_city']
      state = json['accm_state']
      country = json['accm_country']
      zipcode = json['accm_zipcode']
      latitude = json['latitude']
      longitude = json['longitude']
      description = json['accm_description']
      landlordID = praetorian.current_user_id()
      valid, reason = self.checkInput(0, title, street, number, city, state, country, zipcode)
      # add accommodation if input is valid
      if valid:
        newAccommodation = self.accommodations.addAccommodation(title, street, number, city, state, country, zipcode, latitude, longitude, description, landlordID)
        if newAccommodation and self.calculateDistance(newAccommodation['accm_id'], newAccommodation['latitude'], newAccommodation['longitude']):
          db.commit()
          return jsonify(newAccommodation)
        else:
          db.rollback()
          return jsonify('Error adding Accommodation and Shared Amenities'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def updateAccommodation(self, json):
    try:
      accm_id = json['accm_id']
      title = json['accm_title']
      street = json['accm_street']
      number = json['accm_number']
      city = json['accm_city']
      state = json['accm_state']
      country = json['accm_country']
      zipcode = json['accm_zipcode']
      latitude = json['latitude']
      longitude = json['longitude']
      description = json['accm_description']
      valid, reason = self.checkAccmID(accm_id)
      if not valid:
        return jsonify(reason)
      valid, reason = self.checkInput(accm_id, title, street, number, city, state, country, zipcode)
      # add accommodation if input is valid
      if valid:
        updatedAccommodation = self.accommodations.updateAccommodation(accm_id, title, street, number, city, state, country, zipcode, latitude, longitude, description)
        if updatedAccommodation and self.calculateDistance(updatedAccommodation['accm_id'], updatedAccommodation['latitude'], updatedAccommodation['longitude']):
          db.commit()
          return jsonify(updatedAccommodation)
        else:
          db.rollback()
          return jsonify('Error updating Accommodation'), 400
      else:
        # returns reason why input was invalid
        return jsonify(reason)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def calculateDistance(self, accm_id, latitude, longitude):
    try:
      uprm_coordinates = (18.21102, -67.14092)
      accm_coordinates = (latitude, longitude)

      driving_dist_matrix = gmaps.distance_matrix(uprm_coordinates, accm_coordinates, mode='driving')['rows'][0]
      walking_dist_matrix = gmaps.distance_matrix(uprm_coordinates, accm_coordinates, mode='walking')['rows'][0]


      if driving_dist_matrix['elements'][0]['status'] == 'ZERO_RESULTS' and walking_dist_matrix['elements'][0]['status'] == 'ZERO_RESULTS':
        return False
      if driving_dist_matrix['elements'][0]['status'] == 'ZERO_RESULTS':
        best_dist_matrix = walking_dist_matrix['elements'][0]['duration']['value']
      if walking_dist_matrix['elements'][0]['status'] == 'ZERO_RESULTS':
        best_dist_matrix = driving_dist_matrix['elements'][0]['duration']['value']
      else:
        driving_duration = driving_dist_matrix['elements'][0]['duration']['value']
        walking_duration = walking_dist_matrix['elements'][0]['duration']['value']

        best_dist_matrix = walking_dist_matrix
        if walking_duration > 1800:
          best_dist_matrix = driving_dist_matrix

      best_dist = best_dist_matrix['elements'][0]['distance']['value']
      daoAccommodation = self.accommodations.addDistance(accm_id, best_dist)
      if daoAccommodation:
        return True
      return False
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  def getImages(self, accm_id):
    try:
      daoAccommodation = self.accommodations.getById(accm_id)
      if not daoAccommodation:
        return jsonify('Accommodation Not Found'), 400
      landlord_id = daoAccommodation['landlord_id']
      query = 'folder:apartamentazo/landlords/landlord_{}/accm_{} AND tags:accm'.format(landlord_id, accm_id)
      image = Search().expression(query).sort_by('public_id', 'asc').execute()['resources']
      secure_urls = [{"secure_url": obj["secure_url"]} for obj in image]
      return jsonify(secure_urls)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @praetorian.auth_required
  def uploadImages(self, json):
    try:
      accm_id = json['accm_id']
      valid, reason = self.checkAccmID(accm_id)
      if not valid:
        return jsonify(reason)
      image = upload(
        json['image'],
        public_id = json['order'],
        folder = 'apartamentazo/landlords/landlord_{}/accm_{}'.format(praetorian.current_user_id(), accm_id),
        tags='accm'
      )
      return jsonify(image)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400
  
  @praetorian.auth_required
  def deleteImage(self, accm_id, img_id):
    try:
      valid, reason = self.checkAccmID(accm_id)
      if not valid:
        return jsonify(reason)
      query = 'apartamentazo/landlords/landlord_{}/accm_{}/{}'.format(praetorian.current_user_id(), accm_id, img_id)
      image_delete_result = delete_resources(query, resource_type="image", type="upload")
      return jsonify(image_delete_result)
    except (Exception, pgerror) as e:
      logger.exception(e)
      return jsonify('Error Occured'), 400

  # TODO add individual delete function
  @praetorian.auth_required
  def deleteAccommodationCascade(self, landlord_id):
    try:
      deletedAccommodation = self.accommodations.deleteAccommodationCascade(landlord_id)
      for accm in deletedAccommodation:
        deletedAmenities = self.amenities.deleteSharedAmenities(accm['accm_id'])
        deletedReview = self.review.deleteReviewCascade(accm['accm_id'])
        deletedUnit = self.units.deleteUnitCascade(accm['accm_id'])
        deletedNotice = self.notice.deleteNoticeCascade(accm['accm_id'])
        if not deletedAmenities and deletedReview and deletedUnit and deletedNotice:
          return False
      return True
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400
    
  def checkInput(self, identifier, title, street, number, city, state, country, zipcode):
    # strip function removes any spaces given
    if identifier > 0 and not self.accommodations.getById(identifier):
      return False, 'Accommodation Not Found'
    if not len(title.strip()):
      return False, 'Empty Title'
    if not len(street.strip()):
      return False, 'Empty Street'
    if self.accmNumValid(number):
      return False, 'Accommodation number can only contain numbers, leters and hyphen. (Hyphen are optional but cannot start or end with a hyphen -)'
    if not len(city.strip()):
      return False, 'Empty City'
    if self.onlyCharacters(city):
      return False, 'City cannot contain numbers or special characters.'
    if self.onlyCharacters(state):
      return False, 'State cannot contain numbers or special characters.'
    if not len(country.strip()):
      return False, 'Empty Country'
    if self.onlyCharacters(country):
      return False, 'Country cannot contain numbers or special characters.'
    if not len(zipcode.strip()):
      return False, 'Empty Zip Code'
    if self.zipValid(zipcode):
      return False, 'Enter a Valid Zip Code'
    if self.constraintExists(number, identifier):
      return False, 'Accommodation number already exists for landlord.'
    else:
      return True , ''

  def checkAccmID(self, accmID):
    daoAccommodation = self.accommodations.getById(accmID)
    role = praetorian.current_rolenames().pop()
    if not daoAccommodation:
      return False, 'Accommodation Not Found'
    if daoAccommodation['landlord_id'] != praetorian.current_user_id() or role != 'landlord':
      return False, 'Accommodation is not own by Landlord'
    else:
      return True , ''

  def zipValid(self, zipcode):
    zipRegex = '^\d{5}'
    return not re.search(zipRegex, zipcode)
    
  def accmNumValid(self, number):
    if not number:
      return
    numberRegex = '^(?!-)(?!.*-$)[\w-]{1,10}$'
    return not re.search(numberRegex, number)

  def onlyCharacters(self, string):
    if not string:
      return
    stringRegex = '^[a-zA-Z ]{1,20}$'
    return not re.search(stringRegex, string)

  def constraintExists(self, number, identifier):
    return self.accommodations.getByConstraint(praetorian.current_user_id(), number, identifier)

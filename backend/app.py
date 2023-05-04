from flask import request
from util.config import app
from handler.landlords import LandlordHandler
from handler.tenants import TenantHandler
from handler.messages import MessageHandler
from handler.accommodations import AccommodationHandler
from handler.shared_amenities import SharedAmenitiesHandler
from handler.notices import NoticeHandler
from handler.reviews import ReviewHandler
from handler.units import UnitHandler
from handler.private_amenities import PrivateAmenitiesHandler
from handler.requests import RequestHandler
from handler.leases import LeaseHandler

@app.route('/')
def home():
  return 'Hello World'

"""
LANDLORDS
"""
@app.route('/api/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()

@app.route('/api/landlords', methods=['POST'])
def getLandlordById():
    return LandlordHandler().getById(request.json)

@app.route('/api/landlords/login', methods=['POST'])
def loginLandlord():
  return LandlordHandler().login(request.json)

@app.route('/api/landlords/protected')
def protectedLandlord():
  return LandlordHandler().protected()

@app.route('/api/landlords/refresh')
def refreshLandlord():
  return LandlordHandler().refresh()

@app.route('/api/landlords/new', methods=['POST'])
def addLandlord():
  return LandlordHandler().addLandlord(request.json)

@app.route('/api/landlords', methods=['PUT'])
def updateLandlord():
    return LandlordHandler().updateLandlord(request.json)

# TODO
@app.route('/api/landlords', methods=['DELETE'])
def removeLandlord():
  return LandlordHandler().deleteLandlord()

"""
TENANTS
"""
@app.route('/api/tenants/all')
def getAllTenants():
  return TenantHandler().getAll()

@app.route('/api/tenants', methods=['POST'])
def getTenantById():
    return TenantHandler().getById(request.json)

@app.route('/api/tenants/login', methods=['POST'])
def loginTenant():
  return TenantHandler().login(request.json)

@app.route('/api/tenants/protected')
def protectedTenant():
  return TenantHandler().protected()

@app.route('/api/tenants/refresh')
def refreshTenant():
  return TenantHandler().refresh()

@app.route('/api/tenants/new', methods=['POST'])
def addTenant():
  return TenantHandler().addTenant(request.json)

@app.route('/api/tenants', methods=['PUT'])
def updateTenant():
    return TenantHandler().updateTenant(request.json)

# TODO
@app.route('/api/tenants', methods=['DELETE'])
def removeTenant():
  return None

"""
MESSAGES (LANDLORDS AND TENANTS)
"""
@app.route('/api/messages/all')
def getAllMessages():
  return MessageHandler().getAll()

@app.route('/api/messages', methods=['GET'])
def getMessageByLandlordId():
    return MessageHandler().getByUserId()

@app.route('/api/messages', methods=['POST'])
def getMessageById():
    return MessageHandler().getById(request.json)

@app.route('/api/messages/unique', methods=['POST'])
def getMessageByConstraint():
    return MessageHandler().getByConstraint(request.json)

@app.route('/api/messages/conversation', methods=['POST'])
def getConversation():
    return MessageHandler().getConversation(request.json)

@app.route('/api/landlord/sends/message', methods=['POST'])
def landlordSendsMessage():
  return MessageHandler().landlordSendsMessage(request.json)

@app.route('/api/tenant/sends/message', methods=['POST'])
def tenantSendsMessage():
  return MessageHandler().tenantSendsMessage(request.json)

@app.route('/api/message/read', methods=['PUT'])
def messageRead():
  return MessageHandler().messageRead(request.json)

# TODO
@app.route('/api/messages', methods=['PUT'])
def updateMessage():
    return None

# TODO
@app.route('/api/messages', methods=['DELETE'])
def removeMessage():
  return None

"""
ACCOMMODATIONS (LANDLORDS)
"""
@app.route('/api/accommodations/all')
def getAllAccommodations():
  return AccommodationHandler().getAll()

@app.route('/api/accommodations', methods=['POST'])
def getAccommodationById():
    return AccommodationHandler().getById(request.json)

@app.route('/api/accommodations/landlord', methods=['POST'])
def getAccommodationByLandlordId():
    return AccommodationHandler().getByLandlordId(request.json)

@app.route('/api/accommodations/new', methods=['POST'])
def addAccommodation():
  return AccommodationHandler().addAccommodation(request.json)

@app.route('/api/accommodations', methods=['PUT'])
def updateAccommodation():
    return AccommodationHandler().updateAccommodation(request.json)

# TODO
@app.route('/api/accommodations', methods=['DELETE'])
def removeAccommodation():
  return None

"""
SHARED AMENITIES (ACCOMMODATIONS)
"""
@app.route('/api/accommodations/amenities/all')
def getAllSharedAmenities():
  return SharedAmenitiesHandler().getAll()

@app.route('/api/shared/amenities', methods=['POST'])
def getSharedAmenitiesById():
    return SharedAmenitiesHandler().getById(request.json)

@app.route('/api/accommodations/amenities', methods=['POST'])
def getSharedAmenitiesByAccommodationId():
    return SharedAmenitiesHandler().getByAccommodationId(request.json)

# TODO add restrictions when updating shared amenities
@app.route('/api/accommodations/amenities', methods=['PUT'])
def updateSharedAmenities():
    return SharedAmenitiesHandler().updateSharedAmenities(request.json)

"""
NOTICES (ACCOMMODATIONS)
"""
@app.route('/api/notices/all')
def getAllNotices():
  return NoticeHandler().getAll()

# TODO set for only tenants and landlords with relation to accm from notice
@app.route('/api/notices', methods=['POST'])
def getNoticeById():
    return NoticeHandler().getById(request.json)

# TODO set for only tenants and landlords with relation to accm from notice
@app.route('/api/accommodations/notices', methods=['POST'])
def getNoticesByAccommodationId():
    return NoticeHandler().getByAccommodationId(request.json)

# TODO limit title character count
@app.route('/api/notices/add', methods=['POST'])
def addNotice():
  return NoticeHandler().addNotice(request.json)

# TODO limit title character count
@app.route('/api/notices', methods=['PUT'])
def updateNotice():
    return NoticeHandler().updateNotice(request.json)

# TODO
@app.route('/api/notices', methods=['DELETE'])
def removeNotice():
  return None

"""
REVIEWS (ACCOMMODATIONS AND TENANTS)
"""
@app.route('/api/reviews/all')
def getAllReviews():
  return ReviewHandler().getAll()

@app.route('/api/reviews', methods=['POST'])
def getReviewById():
    return ReviewHandler().getById(request.json)

@app.route('/api/accommodations/reviews', methods=['POST'])
def getReviewsByAccommodationId():
    return ReviewHandler().getByAccommodationId(request.json)

@app.route('/api/tenants/reviews', methods=['POST'])
def getReviewsByTenantId():
    return ReviewHandler().getByTenantId(request.json)

# TODO add restrictions when creating reviews
@app.route('/api/reviews/add', methods=['POST'])
def addReview():
  return ReviewHandler().addReview(request.json)

# TODO add restrictions when updating reviews
@app.route('/api/reviews', methods=['PUT'])
def updateReview():
    return ReviewHandler().updateReview(request.json)

# TODO
@app.route('/api/reviews', methods=['DELETE'])
def removeReview():
  return None

"""
UNITS (ACCOMMODATIONS)
"""
@app.route('/api/units/all')
def getAllUnits():
  return UnitHandler().getAll()

@app.route('/api/units', methods=['POST'])
def getUnitById():
    return UnitHandler().getById(request.json)

@app.route('/api/accommodations/units', methods=['POST'])
def getUnitsByAccommodationId():
    return UnitHandler().getByAccommodationId(request.json)

# TODO add restrictions when creating unit
@app.route('/api/units/add', methods=['POST'])
def addUnit():
  return UnitHandler().addUnit(request.json)

# TODO add restrictions when updating unit
@app.route('/api/units', methods=['PUT'])
def updateUnit():
    return UnitHandler().updateUnit(request.json)

# TODO
@app.route('/api/units', methods=['DELETE'])
def removeUnit():
  return None

"""
PRIVATE AMENITIES (UNITS)
"""
@app.route('/api/units/amenities/all')
def getAllPrivateAmenities():
  return PrivateAmenitiesHandler().getAll()

# TODO
@app.route('/api/private/amenities', methods=['POST'])
def getPrivateAmenitiesById():
    return PrivateAmenitiesHandler().getById(request.json)

# TODO
@app.route('/api/units/amenities', methods=['POST'])
def getPrivateAmenitiesByUnitId():
    return PrivateAmenitiesHandler().getByUnitId(request.json)

# TODO add restrictions when updating shared amenities
@app.route('/api/units/amenities', methods=['PUT'])
def updatePrivateAmenities():
    return PrivateAmenitiesHandler().updatePrivateAmenities(request.json)

# TODO
@app.route('/api/units/amenities', methods=['DELETE'])
def removePrivateAmenities():
  return None

"""
LEASES (UNITS AND TENANTS)
"""
@app.route('/api/leases/all')
def getAllLeases():
  return LeaseHandler().getAll()

# TODO
@app.route('/api/leases', methods=['POST'])
def getLeaseById():
    return LeaseHandler().getById(request.json)

# TODO
@app.route('/api/units/leases', methods=['POST'])
def getLeasesByUnitId():
    return LeaseHandler().getByUnitId(request.json)

# TODO
@app.route('/api/tenants/leases', methods=['POST'])
def getLeaseByTenantId():
    return LeaseHandler().getByTenantId(request.json)

# TODO add restrictions when creating leases
@app.route('/api/leases/add', methods=['POST'])
def addLease():
    return LeaseHandler().addLease(request.json)

# TODO add restrictions when updating leases
@app.route('/api/leases', methods=['PUT'])
def updateLease():
    return LeaseHandler().updateLease(request.json)

# TODO add restrictions when updating current tenant
@app.route('/api/leases/current/tenant', methods=['PUT'])
def updateCurrentTenant():
    return LeaseHandler().updateCurrentTenant(request.json)

# TODO
@app.route('/api/leases', methods=['DELETE'])
def removeLease():
  return None

"""
SEARCH AND FILTER (ACCOMMODATIONS & UNITS)
"""
@app.route('/api/search', methods=['POST'])
def searchAccommodations():
  return AccommodationHandler().search(request.json)

@app.route('/api/filter/amenities', methods=['POST'])
def filterByAmenities():
  return AccommodationHandler().filter(request.json)

"""
SCORE
"""
@app.route('/api/score', methods=['POST'])
def getScoreForAccommodations():
  return AccommodationHandler().score(request.json)

"""
CLOUDINARY
"""
@app.route('/api/images/landlord/<int:landlord_id>')
def getImageForLandlord(landlord_id):
  return LandlordHandler().getProfilePicture(landlord_id)

@app.route('/api/images/tenant/<int:tenant_id>')
def getImageForTenant(tenant_id):
  return TenantHandler().getProfilePicture(tenant_id)

@app.route('/api/images/accommodation/<int:accm_id>')
def getImagesForAccommodation(accm_id):
  return AccommodationHandler().getImages(accm_id)

@app.route('/api/images/unit/<int:unit_id>')
def getImagesForUnit(unit_id):
  return UnitHandler().getImages(unit_id)

@app.route('/api/images/landlord', methods=['POST'])
def uploadImageForLandlord():
  return LandlordHandler().uploadProfilePicture(request.json)

@app.route('/api/images/tenant', methods=['POST'])
def uploadImageForTenant():
  return TenantHandler().uploadProfilePicture(request.json)

@app.route('/api/images/accommodation', methods=['POST'])
def uploadImageForAccommodation():
  return AccommodationHandler().uploadImages(request.json)

@app.route('/api/images/unit', methods=['POST'])
def uploadImageForUnit():
  return UnitHandler().uploadImages(request.json)

@app.route('/api/images/landlord', methods=['DELETE'])
def deleteImageForLandlord():
  return LandlordHandler().deleteProfilePicture()

@app.route('/api/images/tenant', methods=['DELETE'])
def deleteImageForTenant():
  return TenantHandler().deleteProfilePicture()

@app.route('/api/images/accommodation/<int:accm_id>/<int:img_id>', methods=['DELETE'])
def deleteImageForAccommodation(accm_id, img_id):
  return AccommodationHandler().deleteImage(accm_id, img_id)

@app.route('/api/images/unit/<int:unit_id>/<int:img_id>', methods=['DELETE'])
def deleteImageForUnit(unit_id, img_id):
  return UnitHandler().deleteImage(unit_id, img_id)


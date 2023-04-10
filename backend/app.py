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
  return "Hello World"

"""
LANDLORDS
"""
@app.route('/api/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()

@app.route('/api/landlords', methods=['POST'])
def getLandlordById():
    return LandlordHandler().getById(request.json)

# TODO
@app.route('/api/landlords/login', methods=['POST'])
def loginLandlord():
  return None

# TODO add restrictions when creating user
@app.route('/api/landlords/new', methods=['POST'])
def addLandlord():
  return LandlordHandler().addLandlord(request.json)

# TODO add restrictions when updating user
@app.route('/api/landlords', methods=['PUT'])
def updateLandlord():
    return LandlordHandler().updateLandlord(request.json)

# TODO
@app.route('/api/landlords', methods=['DELETE'])
def removeLandlord():
  return None

"""
TENANTS
"""
@app.route('/api/tenants/all')
def getAllTenants():
  return TenantHandler().getAll()

@app.route('/api/tenants', methods=['POST'])
def getTenantById():
    return TenantHandler().getById(request.json)

# TODO
@app.route('/api/tenants/login', methods=['POST'])
def loginTenant():
  return None

# TODO add restrictions when creating user
@app.route('/api/tenants/new', methods=['POST'])
def addTenant():
  return TenantHandler().addTenant(request.json)

# TODO add restrictions when updating user
@app.route('/api/tenants', methods=['PUT'])
def updateTenant():
    return TenantHandler().updateTenant(request.json)

# TODO
@app.route('/api/tenants', methods=['DELETE'])
def removeTenant():
  return None

# TODO modify messages table with unique constraints
"""
MESSAGES (LANDLORDS AND TENANTS)
"""
@app.route('/api/messages/all')
def getAllMessages():
  return MessageHandler().getAll()

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

# TODO add restrictions when creating accommodation
@app.route('/api/accommodations/new', methods=['POST'])
def addAccommodation():
  return AccommodationHandler().addAccommodation(request.json)

# TODO add restrictions when updating accommodation
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

# TODO
@app.route('/api/shared/amenities', methods=['POST'])
def getSharedAmenitiesById():
    return SharedAmenitiesHandler().getById(request.json)

# TODO
@app.route('/api/accommodations/amenities', methods=['POST'])
def getSharedAmenitiesByAccommodationId():
    return SharedAmenitiesHandler().getByAccommodationId(request.json)

# TODO add restrictions when updating shared amenities
@app.route('/api/accommodations/amenities', methods=['PUT'])
def updateSharedAmenities():
    return SharedAmenitiesHandler().updateSharedAmenities(request.json)

# TODO
@app.route('/api/accommodations/amenities', methods=['DELETE'])
def removeSharedAmenities():
  return None

"""
NOTICES (ACCOMMODATIONS)
"""
@app.route('/api/notices/all')
def getAllNotices():
  return NoticeHandler().getAll()

@app.route('/api/notices', methods=['POST'])
def getNoticeById():
    return NoticeHandler().getById(request.json)

@app.route('/api/accommodations/notices', methods=['POST'])
def getNoticesByAccommodationId():
    return NoticeHandler().getByAccommodationId(request.json)

# TODO add restrictions when creating notices
@app.route('/api/notices/add', methods=['POST'])
def addNotice():
  return NoticeHandler().addNotice(request.json)

# TODO add restrictions when updating notices
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
REQUESTS (UNITS AND TENANTS)
"""
@app.route('/api/requests/all')
def getAllRequests():
  return RequestHandler().getAll()

@app.route('/api/requests', methods=['POST'])
def getRequestById():
    return RequestHandler().getById(request.json)

@app.route('/api/units/requests', methods=['POST'])
def getRequestsByUnitId():
    return RequestHandler().getByUnitId(request.json)

@app.route('/api/tenants/requests', methods=['POST'])
def getRequestsByTenantId():
    return RequestHandler().getByTenantId(request.json)

# TODO
@app.route('/api/requests/tour', methods=['POST'])
def getAllRequestsWithTour():
    return None

# TODO
@app.route('/api/units/requests/tour', methods=['POST'])
def getRequestsByUnitIdWithTour():
    return None

# TODO
@app.route('/api/tenants/requests/tour', methods=['POST'])
def getRequestsByTenantIdWithTour():
    return None

# TODO add restrictions when creating requests
@app.route('/api/requests/add', methods=['POST'])
def addRequestWithoutTour():
    return RequestHandler().addRequestWithoutTour(request.json)

# TODO add restrictions when creating requests
@app.route('/api/requests/tour/add', methods=['POST'])
def addRequestWithTour():
    return RequestHandler().addRequestWithTour(request.json)

# TODO add restrictions when updating requests
@app.route('/api/requests/tour', methods=['PUT'])
def updateRequestTour():
    return RequestHandler().updateRequestTour(request.json)

# TODO add restrictions when updating requests
@app.route('/api/requests/landlords/approval', methods=['PUT'])
def updateLandlordApproval():
    return RequestHandler().updateLandlordApproval(request.json)

# TODO add restrictions when updating requests
@app.route('/api/requests/tenants/approval', methods=['PUT'])
def updateTenantApproval():
    return RequestHandler().updateTenantApproval(request.json)

# TODO
@app.route('/api/requests', methods=['DELETE'])
def removeRequest():
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

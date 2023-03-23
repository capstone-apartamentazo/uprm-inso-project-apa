from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler
from backend.handler.tenants import TenantHandler
from backend.handler.messages import MessageHandler
from backend.handler.accommodations import AccommodationHandler
from backend.handler.shared_amenities import SharedAmenitiesHandler
from backend.handler.notices import NoticeHandler
from backend.handler.units import UnitHandler
from backend.handler.private_amenities import PrivateAmenitiesHandler
from backend.handler.requests import RequestHandler
from backend.handler.leases import LeaseHandler

@app.route('/')
def home():
  return "Hello World"

"""
LANDLORDS
"""
@app.route('/apartamentazo/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()

@app.route('/apartamentazo/landlords', methods=['POST'])
def getLandlordById():
    return LandlordHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/landlords/login', methods=['POST'])
def loginLandlord():
  return None

# TODO add restrictions when creating user
@app.route('/apartamentazo/landlords/new', methods=['POST'])
def addLandlord():
  return LandlordHandler().addLandlord(request.json)

# TODO add restrictions when updating user
@app.route('/apartamentazo/landlords', methods=['PUT'])
def updateLandlord():
    return LandlordHandler().updateLandlord(request.json)

# TODO
@app.route('/apartamentazo/landlords', methods=['DELETE'])
def removeLandlord():
  return None

"""
TENANTS
"""
@app.route('/apartamentazo/tenants/all')
def getAllTenants():
  return TenantHandler().getAll()

@app.route('/apartamentazo/tenants', methods=['POST'])
def getTenantById():
    return TenantHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/tenants/login', methods=['POST'])
def loginTenant():
  return None

# TODO add restrictions when creating user
@app.route('/apartamentazo/tenants/new', methods=['POST'])
def addTenant():
  return TenantHandler().addTenant(request.json)

# TODO add restrictions when updating user
@app.route('/apartamentazo/tenants', methods=['PUT'])
def updateTenant():
    return TenantHandler().updateTenant(request.json)

# TODO
@app.route('/apartamentazo/tenants', methods=['DELETE'])
def removeTenant():
  return None

# TODO modify messages table with unique constraints
"""
MESSAGES (LANDLORDS AND TENANTS)
"""
@app.route('/apartamentazo/messages/all')
def getAllMessages():
  return MessageHandler().getAll()

@app.route('/apartamentazo/messages', methods=['POST'])
def getMessageById():
    return MessageHandler().getById(request.json)

@app.route('/apartamentazo/messages/unique', methods=['POST'])
def getMessageByConstraint():
    return MessageHandler().getByConstraint(request.json)

@app.route('/apartamentazo/messages/conversation', methods=['POST'])
def getConversation():
    return MessageHandler().getConversation(request.json)

@app.route('/apartamentazo/landlord/sends/message', methods=['POST'])
def landlordSendsMessage():
  return MessageHandler().landlordSendsMessage(request.json)

@app.route('/apartamentazo/tenant/sends/message', methods=['POST'])
def tenantSendsMessage():
  return MessageHandler().tenantSendsMessage(request.json)

@app.route('/apartamentazo/message/read', methods=['PUT'])
def messageRead():
  return MessageHandler().messageRead(request.json)

# TODO
@app.route('/apartamentazo/messages', methods=['PUT'])
def updateMessage():
    return None

# TODO
@app.route('/apartamentazo/messages', methods=['DELETE'])
def removeMessage():
  return None

"""
ACCOMMODATIONS (LANDLORDS)
"""
@app.route('/apartamentazo/accommodations/all')
def getAllAccommodations():
  return AccommodationHandler().getAll()

@app.route('/apartamentazo/accommodations', methods=['POST'])
def getAccommodationById():
    return AccommodationHandler().getById(request.json)

@app.route('/apartamentazo/accommodations/landlord', methods=['POST'])
def getAccommodationByLandlordId():
    return AccommodationHandler().getByLandlordId(request.json)

# TODO add restrictions when creating accommodation
@app.route('/apartamentazo/accommodations/new', methods=['POST'])
def addAccommodation():
  return AccommodationHandler().addAccommodation(request.json)

# TODO add restrictions when updating accommodation
@app.route('/apartamentazo/accommodations', methods=['PUT'])
def updateAccommodation():
    return AccommodationHandler().updateAccommodation(request.json)

# TODO
@app.route('/apartamentazo/accommodations', methods=['DELETE'])
def removeAccommodation():
  return None


"""
SHARED AMENITIES (ACCOMMODATIONS)
"""
@app.route('/apartamentazo/accommodations/amenities/all')
def getAllSharedAmenities():
  return SharedAmenitiesHandler().getAll()

# TODO
@app.route('/apartamentazo/shared/amenities', methods=['POST'])
def getSharedAmenitiesById():
    return SharedAmenitiesHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/accommodations/amenities', methods=['POST'])
def getSharedAmenitiesByAccommodationId():
    return SharedAmenitiesHandler().getByAccommodationId(request.json)

# TODO add restrictions when updating shared amenities
@app.route('/apartamentazo/accommodations/amenities', methods=['PUT'])
def updateSharedAmenities():
    return SharedAmenitiesHandler().updateSharedAmenities(request.json)

# TODO
@app.route('/apartamentazo/accommodations/amenities', methods=['DELETE'])
def removeSharedAmenities():
  return None

"""
NOTICES (ACCOMMODATIONS)
"""
@app.route('/apartamentazo/accommodations/notices/all')
def getAllNotices():
  return NoticeHandler().getAll()

# TODO
@app.route('/apartamentazo/notices', methods=['POST'])
def getNoticeById():
    return NoticeHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/accommodations/notices', methods=['POST'])
def getNoticesByAccommodationId():
    return NoticeHandler().getByAccommodationId(request.json)

# TODO add restrictions when creating notices
@app.route('/apartamentazo/accommodations/notices/add', methods=['POST'])
def addNotice():
  return NoticeHandler().addNotice(request.json)

# TODO add restrictions when updating notices
@app.route('/apartamentazo/accommodations/notices', methods=['PUT'])
def updateNotice():
    return NoticeHandler().updateNotice(request.json)

# TODO
@app.route('/apartamentazo/accommodations/notices', methods=['DELETE'])
def removeNotice():
  return None

"""
REVIEWS (ACCOMMODATIONS AND TENANTS)
"""

"""
UNITS (ACCOMMODATIONS)
"""
@app.route('/apartamentazo/units/all')
def getAllUnits():
  return UnitHandler().getAll()

@app.route('/apartamentazo/units', methods=['POST'])
def getUnitById():
    return UnitHandler().getById(request.json)

@app.route('/apartamentazo/accommodations/units', methods=['POST'])
def getUnitsByAccommodationId():
    return UnitHandler().getByAccommodationId(request.json)

# TODO add restrictions when creating unit
@app.route('/apartamentazo/units/add', methods=['POST'])
def addUnit():
  return UnitHandler().addUnit(request.json)

# TODO add restrictions when updating unit
@app.route('/apartamentazo/units', methods=['PUT'])
def updateUnit():
    return UnitHandler().updateUnit(request.json)

# TODO
@app.route('/apartamentazo/units', methods=['DELETE'])
def removeUnit():
  return None

"""
PRIVATE AMENITIES (UNITS)
"""
@app.route('/apartamentazo/units/amenities/all')
def getAllPrivateAmenities():
  return PrivateAmenitiesHandler().getAll()

# TODO
@app.route('/apartamentazo/private/amenities', methods=['POST'])
def getPrivateAmenitiesById():
    return PrivateAmenitiesHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/units/amenities', methods=['POST'])
def getPrivateAmenitiesByUnitId():
    return PrivateAmenitiesHandler().getByUnitId(request.json)

# TODO add restrictions when updating shared amenities
@app.route('/apartamentazo/units/amenities', methods=['PUT'])
def updatePrivateAmenities():
    return PrivateAmenitiesHandler().updatePrivateAmenities(request.json)

# TODO
@app.route('/apartamentazo/units/amenities', methods=['DELETE'])
def removePrivateAmenities():
  return None

"""
REQUESTS (UNITS AND TENANTS)
"""
@app.route('/apartamentazo/requests/all')
def getAllRequests():
  return RequestHandler().getAll()

# TODO
@app.route('/apartamentazo/requests', methods=['POST'])
def getRequestById():
    return RequestHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/units/requests', methods=['POST'])
def getRequestsByUnitId():
    return RequestHandler().getByUnitId(request.json)

# TODO
@app.route('/apartamentazo/tenants/requests', methods=['POST'])
def getRequestsByTenantId():
    return RequestHandler().getByTenantId(request.json)

# TODO add restrictions when creating requests
@app.route('/apartamentazo/requests/add', methods=['POST'])
def addRequestWithoutTour():
    return RequestHandler().addRequestWithoutTour(request.json)

# TODO add restrictions when creating requests
@app.route('/apartamentazo/requests/tour/add', methods=['POST'])
def addRequestWithTour():
    return RequestHandler().addRequestWithTour(request.json)

# TODO add restrictions when updating requests
@app.route('/apartamentazo/requests/tour', methods=['PUT'])
def updateRequestTour():
    return RequestHandler().updateRequestTour(request.json)

# TODO add restrictions when updating requests
@app.route('/apartamentazo/requests/landlords/approval', methods=['PUT'])
def updateLandlordApproval():
    return RequestHandler().updateLandlordApproval(request.json)

# TODO add restrictions when updating requests
@app.route('/apartamentazo/requests/tenants/approval', methods=['PUT'])
def updateTenantApproval():
    return RequestHandler().updateTenantApproval(request.json)

# TODO
@app.route('/apartamentazo/requests', methods=['DELETE'])
def removeRequest():
  return None

"""
LEASES (UNITS AND TENANTS)
"""
@app.route('/apartamentazo/leases/all')
def getAllLeases():
  return LeaseHandler().getAll()

# TODO
@app.route('/apartamentazo/leases', methods=['POST'])
def getLeaseById():
    return LeaseHandler().getById(request.json)

# TODO
@app.route('/apartamentazo/units/leases', methods=['POST'])
def getLeasesByUnitId():
    return LeaseHandler().getByUnitId(request.json)

# TODO
@app.route('/apartamentazo/tenants/leases', methods=['POST'])
def getLeaseByTenantId():
    return LeaseHandler().getByTenantId(request.json)

# TODO add restrictions when creating leases
@app.route('/apartamentazo/leases/add', methods=['POST'])
def addLease():
    return LeaseHandler().addLease(request.json)

# TODO add restrictions when updating leases
@app.route('/apartamentazo/leases', methods=['PUT'])
def updateLease():
    return LeaseHandler().updateLease(request.json)

# TODO add restrictions when updating current tenant
@app.route('/apartamentazo/leases/current/tenant', methods=['PUT'])
def updateCurrentTenant():
    return LeaseHandler().updateCurrentTenant(request.json)

# TODO
@app.route('/apartamentazo/leases', methods=['DELETE'])
def removeLease():
  return None

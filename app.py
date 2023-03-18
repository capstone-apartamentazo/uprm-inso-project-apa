from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler
from backend.handler.tenants import TenantHandler
from backend.handler.messages import MessageHandler
from backend.handler.accommodations import AccommodationHandler
from backend.handler.shared_amenities import SharedAmenitiesHandler

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

"""
MESSAGES (LANDLORDS AND TENANTS)
"""
@app.route('/apartamentazo/messages/all')
def getAllMessages():
  return MessageHandler().getAll()

@app.route('/apartamentazo/messages', methods=['POST'])
def getMessageByPrimaryKeys():
    return MessageHandler().getByPrimaryKeys(request.json)

@app.route('/apartamentazo/messages/conversation', methods=['POST'])
def getConversation():
    return MessageHandler().getConversation(request.json)

# TODO add restrictions when creating messages
@app.route('/apartamentazo/landlord/sends/message', methods=['POST'])
def landlordSendsMessage():
  return MessageHandler().landlordSendsMessage(request.json)

# TODO add restrictions when creating messages
@app.route('/apartamentazo/tenant/sends/message', methods=['POST'])
def tenantSendsMessage():
  return MessageHandler().tenantSendsMessage(request.json)

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
    return None

# TODO
@app.route('/apartamentazo/accommodations', methods=['DELETE'])
def removeAccommodation():
  return None


"""
SHARED AMENITIES (ACCOMMODATIONS)
"""
@app.route('/apartamentazo/shared/amenities/all')
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

# TODO add restrictions when creating shared amenities
# only uses accm_id field
@app.route('/apartamentazo/accommodations/amenities/add', methods=['POST'])
def addSharedAmenities():
  return SharedAmenitiesHandler().addSharedAmenities(request.json)

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

"""
REVIEWS (ACCOMMODATIONS AND TENANTS)
"""

"""
UNITS (ACCOMMODATIONS)
"""

"""
PRIVATE AMENITIES (UNITS)
"""

"""
REQUESTS (UNITS AND TENANTS)
"""

"""
LEASES (UNITS AND TENANTS)
"""
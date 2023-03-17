from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler
from backend.handler.tenants import TenantHandler
from backend.handler.messages import MessageHandler

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
@app.route('/apartamentazo/landlords', methods=['DELETE'])
def removeLandlord():
  return None

# TODO add restrictions when updating user
@app.route('/apartamentazo/landlords', methods=['PUT'])
def updateLandlord():
    return LandlordHandler().updateLandlord(request.json)

# TODO add restrictions when creating user
@app.route('/apartamentazo/landlords/new', methods=['POST'])
def addLandlord():
  return LandlordHandler().addLandlord(request.json)

# TODO
@app.route('/apartamentazo/landlords/login', methods=['POST'])
def loginLandlord():
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
@app.route('/apartamentazo/tenants', methods=['DELETE'])
def removeTenant():
  return None

# TODO add restrictions when updating user
@app.route('/apartamentazo/tenants', methods=['PUT'])
def updateTenant():
    return TenantHandler().updateTenant(request.json)

# TODO add restrictions when creating user
@app.route('/apartamentazo/tenants/new', methods=['POST'])
def addTenant():
  return TenantHandler().addTenant(request.json)

# TODO
@app.route('/apartamentazo/tenants/login', methods=['POST'])
def loginTenant():
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

# TODO
@app.route('/apartamentazo/messages', methods=['DELETE'])
def removeMessage():
  return None

# TODO
@app.route('/apartamentazo/messages', methods=['PUT'])
def updateMessage():
    return None

# TODO
@app.route('/apartamentazo/messages/send', methods=['POST'])
def sendMessage():
  return None

"""
ACCOMMODATIONS (LANDLORDS)
"""

"""
SHARED AMENITIES (ACCOMMODATIONS)
"""

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
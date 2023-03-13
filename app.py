from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler
from backend.handler.tenants import TenantHandler

@app.route('/')
def home():
  return "Hello World"

@app.route('/apartamentazo/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()

@app.route('/apartamentazo/landlords', methods=['POST'])
def getLandlordById():
    return LandlordHandler().getById(request.json)

# TODO create delete function
@app.route('/apartamentazo/landlords', methods=['DELETE'])
def removeLandlord():
  return None

# TODO create restrictions when updating user
@app.route('/apartamentazo/landlords', methods=['PUT'])
def updateLandlord():
    return LandlordHandler().updateLandlord(request.json)

# TODO
@app.route('/apartamentazo/landlords/new', methods=['POST'])
def newLandlord():
  return None

# TODO
@app.route('/apartamentazo/landlords/login', methods=['POST'])
def loginLandlord():
  return None

@app.route('/apartamentazo/tenants/all')
def getAllTenants():
  return TenantHandler().getAll()

@app.route('/apartamentazo/tenants', methods=['POST'])
def getTenantById():
    return TenantHandler().getById(request.json)

# TODO create delete function
@app.route('/apartamentazo/tenants', methods=['DELETE'])
def removeTenant():
  return None

# TODO create restrictions when updating user
@app.route('/apartamentazo/tenants', methods=['PUT'])
def updateTenant():
    return TenantHandler().updateTenant(request.json)

# TODO
@app.route('/apartamentazo/tenants/new', methods=['POST'])
def newTenant():
  return None

# TODO
@app.route('/apartamentazo/tenants/login', methods=['POST'])
def loginTenant():
  return None
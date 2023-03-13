from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler

@app.route('/')
def home():
  return "Hello World"

@app.route('/apartamentazo/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()

@app.route('/apartamentazo/landlords', methods=['POST', 'DELETE', 'PUT'])
def getLandlordById():
  if request.method == 'POST':
    return LandlordHandler().getById(request.json)
  # TODO create delete function
  elif request.method == 'DELETE':
    return None
  # TODO create restrictions when updating user
  elif request.method == 'PUT':
    return LandlordHandler().updateLandlord(request.json)
  else:
    return 'Request Not Handled'
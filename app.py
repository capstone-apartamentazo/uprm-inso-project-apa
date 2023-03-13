from flask import request
from backend.util.config import app
from backend.handler.landlords import LandlordHandler

@app.route('/')
def home():
  return "Hello World"

@app.route('/apartamentazo/landlords/all')
def getAllLandlords():
  return LandlordHandler().getAll()
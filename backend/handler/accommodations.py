from flask import jsonify
from dao.accommodations import Accommodations
from dao.shared_amenities import SharedAmenities
from dao.landlords import Landlords
import re

class AccommodationHandler:
  def __init__(self):
    self.accommodations = Accommodations()
    self.amenities = SharedAmenities()
    self.landlords = Landlords()
  
  def dictionary(self, row):
    data = {}
    data['Accommodation ID'] = row[0]
    data['Accommodation Title'] = row[1]
    data['Street'] = row[2]
    data['Accommodation Number'] = row[3]
    data['City'] = row[4]
    data['State'] = row[5]
    data['Country'] = row[6]
    data['Zip Code'] = row[7]
    data['Description'] = row[8]
    data['Landlord ID'] = row[9]
    return data

  def getAll(self):
    daoAccommodations = self.accommodations.getAll()
    if daoAccommodations:
      result = []
      for row in daoAccommodations:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Error Occured'), 405

  def getById(self, json):
    daoAccommodation = self.accommodations.getById(json['accm_id'])
    if daoAccommodation:
      return jsonify(self.dictionary(daoAccommodation)), 200
    else:
      return jsonify('Accommodation Not Found'), 405

  def getByLandlordId(self, json):
    daoAccommodations = self.accommodations.getByLandlordId(json['landlord_id'])
    if daoAccommodations:
      result = []
      for row in daoAccommodations:
        result.append(self.dictionary(row))
      return jsonify(result), 200
    else:
      return jsonify('Accommodations Not Found'), 405

  def addAccommodation(self, json):
    title = json['accm_title']
    street = json['accm_street']
    number = json['accm_number']
    city = json['accm_city']
    state = json['accm_state']
    country = json['accm_country']
    zip = json['accm_zipcode']
    description = json['accm_description']
    landlordID = json['landlord_id']
    valid, reason = self.checkLandlordID(landlordID)
    if not valid:
      return jsonify(reason), 400
    valid, reason = self.checkInput(title, street, number, city, state, country, zip)
    # add accommodation if input is valid
    if valid:
      newAccommodation = self.accommodations.addAccommodation(title, street, number, city, 
                                                              state, country, zip, description, landlordID)
      if newAccommodation:
        daoAmenities = self.amenities.addSharedAmenities(newAccommodation[0])
      else:
        return jsonify('Error adding Accommodation'), 405
      if daoAmenities:
        return jsonify(self.dictionary(newAccommodation)), 200
      else:
        jsonify('Error adding Shared Amenities to Accommodation'), 405
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400

  def updateAccommodation(self, json):
    accm_id = json['accm_id']
    title = json['accm_title']
    street = json['accm_street']
    number = json['accm_number']
    city = json['accm_city']
    state = json['accm_state']
    country = json['accm_country']
    zip = json['accm_zipcode']
    description = json['accm_description']
    valid, reason = self.checkAccmID(accm_id)
    if not valid:
      return jsonify(reason), 400
    valid, reason = self.checkInput(title, street, number, city, state, country, zip)
    # add accommodation if input is valid
    if valid:
      updatedAccommodation = self.accommodations.updateAccommodation(accm_id, title, street, number, city, 
                                                              state, country, zip, description)
      if updatedAccommodation:
        return jsonify(self.dictionary(updatedAccommodation)), 200
      else:
        return jsonify('Error updating Accommodation'), 405
    else:
      # returns reason why input was invalid
      return jsonify(reason), 400
    
  def checkInput(self, title, street, number, city, state, country, zip):
    # strip function removes any spaces given
    try:
      if not len(title.strip()):
        return False, 'Empty Title'
      if not len(street.strip()):
        return False, 'Empty Street'
      if self.accomNumValid(number):
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
      if not len(zip.strip()):
        return False, 'Empty Zip Code'
      if self.zipValid(zip):
        return False, 'Enter a Valid Zip Code'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def checkLandlordID(self, landlordID):
    try:
      if not self.landlords.getById(landlordID):
        return False, 'Landlord Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def checkAccmID(self, accmID):
    try:
      if not self.accommodations.getById(accmID):
        return False, 'Accommodation Not Found'
    except:
      return False, 'Invalid Input'
    else:
      return True , ''

  def zipValid(self, zip):
    zipRegex = '^\d{5}'
    return not re.search(zipRegex, zip)
    
  def accomNumValid(self, number):
    if not number:
      return
    numberRegex = '^(?!-)(?!.*-$)[\w-]{1,10}$'
    return not re.search(numberRegex, number)

  def onlyCharacters(self, string):
    if not string:
      return
    stringRegex = '^[a-zA-Z ]{1,20}$'
    return not re.search(stringRegex, string)
  
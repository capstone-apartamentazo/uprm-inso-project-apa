from flask import request,jsonify
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

@app.route('/api/landlords/<int:u_id>', methods=['GET'])
def getLandlordById(u_id):
    if request.method == 'GET':
      return LandlordHandler().getById(u_id)
    else:
      return jsonify(Error="Method not allowed."), 405

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

@app.route('/api/landlords', methods=['DELETE'])
def removeLandlord():
  return LandlordHandler().deleteLandlord()

"""
TENANTS
"""
@app.route('/api/tenants/all')
def getAllTenants():
  return TenantHandler().getAll()

@app.route('/api/tenants/<int:u_id>', methods=['GET'])
def getTenantById(u_id):
  return TenantHandler().getById(u_id)

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

@app.route('/api/tenants', methods=['DELETE'])
def removeTenant():
  return TenantHandler().deleteTenant()

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

@app.route('/api/messages/conversation/<int:u_id>', methods=['GET'])
def getConversation(u_id):
  return MessageHandler().getConversation(u_id)

@app.route('/api/landlord/sends/message', methods=['POST'])
def landlordSendsMessage():
  return MessageHandler().landlordSendsMessage(request.json)

@app.route('/api/tenant/sends/message', methods=['POST'])
def tenantSendsMessage():
  return MessageHandler().tenantSendsMessage(request.json)

@app.route('/api/tenant/sends/request', methods=['POST'])
def tenantSendsRequestWithoutTour():
  return MessageHandler().tenantSendsRequestWithoutTour(request.json)

@app.route('/api/tenant/sends/request/tour', methods=['POST'])
def tenantSendsRequestWithTour():
  return MessageHandler().tenantSendsRequestWithTour(request.json)

"""
ACCOMMODATIONS (LANDLORDS)
"""
@app.route('/api/accommodations/all')
def getAllAccommodations():
  return AccommodationHandler().getAll()

@app.route('/api/accommodations/<int:a_id>', methods=['GET'])
def getAccommodationById(a_id):
  return AccommodationHandler().getById(a_id)

@app.route('/api/accommodations/landlord/<int:u_id>', methods=['GET'])
def getAccommodationByLandlordId(u_id):
  return AccommodationHandler().getByLandlordId(u_id)

@app.route('/api/accommodations/new', methods=['POST'])
def addAccommodation():
  return AccommodationHandler().addAccommodation(request.json)

@app.route('/api/accommodations', methods=['PUT'])
def updateAccommodation():
  return AccommodationHandler().updateAccommodation(request.json)

@app.route('/api/accommodations/<int:accm_id>', methods=['DELETE'])
def removeAccommodation(accm_id):
  return AccommodationHandler().deleteAccommodation(accm_id)

"""
SHARED AMENITIES (ACCOMMODATIONS)
"""
@app.route('/api/accommodations/amenities/all')
def getAllSharedAmenities():
  return SharedAmenitiesHandler().getAll()

@app.route('/api/shared/amenities', methods=['POST'])
def getSharedAmenitiesById():
  return SharedAmenitiesHandler().getById(request.json)

@app.route('/api/accommodations/amenities/<int:accm_id>', methods=['GET'])
def getSharedAmenitiesByAccommodationId(accm_id):
  return SharedAmenitiesHandler().getByAccommodationId(accm_id)

@app.route('/api/accommodations/amenities', methods=['PUT'])
def updateSharedAmenities():
  return SharedAmenitiesHandler().updateSharedAmenities(request.json)

"""
NOTICES (ACCOMMODATIONS)
"""
@app.route('/api/notices/all')
def getAllNotices():
  return NoticeHandler().getAll()

@app.route('/api/notices', methods=['POST'])
def getNoticeById():
  return NoticeHandler().getById(request.json)

@app.route('/api/accommodations/notices/<int:accm_id>')
def getNoticesByAccommodationId(accm_id):
  return NoticeHandler().getByAccommodationId(accm_id)

@app.route('/api/tenant/notices/<int:accm_id>')
def getTenantNotices(accm_id):
  return NoticeHandler().getTenantNotices(accm_id)

@app.route('/api/notices/add', methods=['POST'])
def addNotice():
  return NoticeHandler().addNotice(request.json)

"""
REVIEWS (ACCOMMODATIONS AND TENANTS)
"""
@app.route('/api/reviews/all')
def getAllReviews():
  return ReviewHandler().getAll()

@app.route('/api/reviews/<int:review_id>')
def getReviewById(review_id):
    return ReviewHandler().getById(review_id)

@app.route('/api/accommodations/reviews/<int:accm_id>')
def getReviewsByAccommodationId(accm_id):
    return ReviewHandler().getByAccommodationId(accm_id)

@app.route('/api/tenants/reviews/<int:tenant_id>')
def getReviewsByTenantId(tenant_id):
    return ReviewHandler().getByTenantId(tenant_id)

@app.route('/api/reviews/add/<int:accm_id>', methods=['POST'])
def addReview(accm_id):
  return ReviewHandler().addReview(request.json, accm_id)

"""
UNITS (ACCOMMODATIONS)
"""
@app.route('/api/units/all')
def getAllUnits():
  return UnitHandler().getAll()

@app.route("/api/units/<int:unit_id>", methods=["GET"])
def getUnitById(unit_id):
  return UnitHandler().getById(unit_id)

@app.route('/api/accommodations/units/<int:accm_id>', methods=['GET'])
def getUnitsByAccommodationId(accm_id):
  return UnitHandler().getByAccommodationId(accm_id)

@app.route('/api/units/add', methods=['POST'])
def addUnit():
  return UnitHandler().addUnit(request.json)

@app.route('/api/units', methods=['PUT'])
def updateUnit():
    return UnitHandler().updateUnit(request.json)

@app.route('/api/units/<int:unit_id>', methods=['DELETE'])
def removeUnit(unit_id):
  return UnitHandler().deleteUnit(unit_id)

"""
PRIVATE AMENITIES (UNITS)
"""
@app.route('/api/units/amenities/all')
def getAllPrivateAmenities():
  return PrivateAmenitiesHandler().getAll()

@app.route('/api/private/amenities', methods=['POST'])
def getPrivateAmenitiesById():
    return PrivateAmenitiesHandler().getById(request.json)

@app.route('/api/units/amenities/<int:unit_id>', methods=['GET'])
def getPrivateAmenitiesByUnitId(unit_id):
  return PrivateAmenitiesHandler().getByUnitId(unit_id)

@app.route('/api/units/amenities', methods=['PUT'])
def updatePrivateAmenities():
    return PrivateAmenitiesHandler().updatePrivateAmenities(request.json)

"""
LEASES (UNITS AND TENANTS)
"""
@app.route('/api/leases/all')
def getAllLeases():
  return LeaseHandler().getAll()

@app.route('/api/leases/<int:lease_id>')
def getLeaseById(lease_id):
    return LeaseHandler().getById(lease_id)

@app.route('/api/units/leases/<int:unit_id>')
def getLeasesByUnitId(unit_id):
    return LeaseHandler().getByUnitId(unit_id)

@app.route('/api/tenants/leases/<int:tenant_id>')
def getLeaseByTenantId(tenant_id):
    return LeaseHandler().getByTenantId(tenant_id)

@app.route('/api/leases/add', methods=['POST'])
def addLease():
    return LeaseHandler().addLease(request.json)

@app.route('/api/leases/current/tenant')
def updateCurrentTenants():
    return LeaseHandler().updateCurrentTenants()

@app.route('/api/leases', methods=['PUT'])
def updateLease():
    return LeaseHandler().updateLease(request.json)

@app.route('/api/leases/extend/<int:lease_id>', methods=['POST'])
def extendLease(lease_id):
    return LeaseHandler().extendLease(request.json, lease_id)

@app.route('/api/leases/<int:lease_id>', methods=['DELETE'])
def removeLease(lease_id):
  return LeaseHandler().deleteLease(lease_id)

"""
SEARCH AND FILTER (ACCOMMODATIONS & UNITS)
"""
@app.route('/api/search', methods=['GET'])
def searchAccommodations():
  return AccommodationHandler().search(request.args.get('input'), request.args.get('offset'))

@app.route('/api/filter/amenities', methods=['POST'])
def filterByAmenities():
  return AccommodationHandler().filter(request.json, request.args.get('input'), request.args.get('offset'))

# TODO filter by price
# TODO filter by size
# TODO filter by number of tenants
# TODO filter by distance

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

app.run()
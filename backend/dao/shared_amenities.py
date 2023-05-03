from util.config import db
from psycopg2.extras import RealDictCursor

class SharedAmenities:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM shared_amenities')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM shared_amenities WHERE shared_amenities_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM shared_amenities WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchone()
    cursor.close()
    return res

  def addSharedAmenities(self, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('INSERT INTO shared_amenities (accm_id) VALUES (%s) RETURNING *' %(accm))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateSharedAmenities(self, identifier, kitchen, bathroom, washer, dryer, pets_allowed):
    query = 'UPDATE shared_amenities \
            SET shared_kitchen = %s, shared_bathroom = %s, shared_washer = %s, shared_dryer = %s, pets_allowed = %s \
            WHERE shared_amenities_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (kitchen, bathroom, washer, dryer, pets_allowed, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def deleteSharedAmenitiesCascade(self, identifier):
    query = 'UPDATE shared_amenities SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res


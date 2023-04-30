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
    db.commit()
    cursor.close()
    return res

  def updateSharedAmenities(self, identifier, bedrooms, bathrooms, kitchen, washer, dryer, internet, pets_allowed):
    query = 'UPDATE shared_amenities \
            SET bedrooms = %s, bathrooms = \'%s\', kitchen = %s, washer = %s, dryer = %s, internet = %s, pets_allowed = %s \
            WHERE shared_amenities_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (bedrooms, bathrooms, kitchen, washer, dryer, internet, pets_allowed, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def deleteSharedAmenitiesCascade(self, identifier):
    query = 'UPDATE shared_amenities SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  # TODO filter by bedrooms and bathrooms
  def filter(self, amenities, offset):
    query = 'SELECT accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, COUNT(unit_id) AS number_of_units \
            FROM accommodations NATURAL INNER JOIN units NATURAL INNER JOIN shared_amenities \
            WHERE (%s) \
            AND deleted_flag = false \
            GROUP BY accm_id ORDER BY accm_id DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(amenities, offset))
    res = cursor.fetchall()
    cursor.close()
    return res

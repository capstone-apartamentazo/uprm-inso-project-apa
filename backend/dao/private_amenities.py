from util.config import db
from psycopg2.extras import RealDictCursor

class PrivateAmenities:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM private_amenities')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM private_amenities WHERE priv_amenities_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByUnitId(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM private_amenities WHERE unit_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def addPrivateAmenities(self, unit):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('INSERT INTO private_amenities (unit_id) VALUES (%s) RETURNING *' %(unit))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updatePrivateAmenities(self, identifier, bedrooms, bathrooms, electricity, water, internet, heater, private_washer, private_dryer, air_conditioner, parking, balcony):
    query = 'UPDATE private_amenities \
            SET bedrooms = %s, bathrooms = \'%s\', electricity = %s, water = %s, internet = %s, heater = %s, private_washer = %s, private_dryer = %s, air_conditioner = %s, parking = %s, balcony = %s \
            WHERE priv_amenities_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (bedrooms, bathrooms, electricity, water, internet, heater, private_washer, private_dryer, air_conditioner, parking, balcony, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def deletePrivAmenitiesCascade(self, identifier):
    query = 'UPDATE private_amenities SET deleted_flag = true WHERE unit_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res
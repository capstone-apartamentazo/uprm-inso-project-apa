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

  def updatePrivateAmenities(self, identifier, electricity, water, internet, bed, microwave, air_conditioner, parking, balcony):
    query = 'UPDATE private_amenities \
            SET electricity = %s, water = %s, internet = %s, bed = %s, microwave = %s, air_conditioner = %s, parking = %s, balcony = %s \
            WHERE priv_amenities_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (electricity, water, internet, bed, microwave, air_conditioner, parking, balcony, identifier))
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
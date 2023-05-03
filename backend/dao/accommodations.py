from util.config import db
from psycopg2.extras import RealDictCursor

class Accommodations:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM accommodations')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM accommodations WHERE accm_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByLandlordId(self, landlord):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM accommodations WHERE landlord_id = %s AND deleted_flag = false' %(landlord))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addAccommodation(self, title, street, number, city, state, country, zipcode, latitude, longitude, description, landlord):
    query = 'WITH new_accm AS ( \
              INSERT INTO accommodations (accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, latitude, longitude, accm_description, landlord_id) \
              VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) \
              RETURNING * \
            ), \
            new_amenities AS ( \
              INSERT INTO shared_amenities (accm_id) \
              SELECT accm_id FROM new_accm \
              RETURNING * \
            ) \
            SELECT * FROM new_accm NATURAL INNER JOIN new_amenities'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (title, street, number, city, state, country, zipcode, latitude, longitude, description, landlord))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateAccommodation(self, identifier, title, street, number, city, state, country, zipcode, latitude, longitude, description):
    query = 'UPDATE accommodations \
            SET accm_title = %s, accm_street = %s, accm_number = %s, accm_city = %s, accm_state = %s, accm_country = %s, accm_zipcode = %s, latitude = %s, longitude = %s, accm_description = %s \
            WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (title, street, number, city, state, country, zipcode, latitude, longitude, description, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  # TODO add individual delete
  def deleteAccommodationCascade(self, identifier):
    query = 'UPDATE accommodations SET deleted_flag = true WHERE landlord_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByConstraint(self, landlord, number, identifier):
    query = 'SELECT accm_number, landlord_id FROM accommodations \
            WHERE accm_number = \'%s\' AND landlord_id = %s AND NOT accm_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(number, landlord, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def search(self, data, offset):
    query = 'SELECT accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, COUNT(unit_id) AS number_of_units \
            FROM accommodations NATURAL INNER JOIN units \
            WHERE (accm_title ILIKE \'%%%s%%\' OR accm_street ILIKE \'%%%s%%\' OR accm_city ILIKE \'%%%s%%\' OR accm_state ILIKE \'%%%s%%\' OR accm_country ILIKE \'%%%s%%\') \
            AND deleted_flag = false \
            GROUP BY accm_id ORDER BY accm_id DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(data, data, data, data, data, offset))
    res = cursor.fetchall()
    cursor.close()
    return res

  def filter(self, amenities, offset):
    query = 'SELECT DISTINCT ON (accm_id) accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, \
            json_agg(json_build_object(\'unit_id\', units.unit_id, \'unit_number\', units.unit_number, \'price\', units.price, \'size\', units.size, \'date_available\', \
            units.date_available, \'contract_duration\', units.contract_duration)) as units \
            FROM accommodations NATURAL INNER JOIN units NATURAL INNER JOIN shared_amenities \
            INNER JOIN private_amenities ON units.unit_id = private_amenities.priv_amenities_id \
            WHERE (%s) AND units.available = true \
            AND accommodations.deleted_flag = false \
            GROUP BY accm_id ORDER BY accm_id DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(amenities, offset))
    res = cursor.fetchall()
    cursor.close()
    return res
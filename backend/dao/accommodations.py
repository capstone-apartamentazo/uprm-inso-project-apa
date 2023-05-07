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
    cursor.close()
    return res

  def addDistance(self, identifier, distance):
    query = 'UPDATE accommodations \
            SET distance = %s \
            WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (distance, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateAccommodation(self, identifier, title, street, number, city, state, country, zipcode, latitude, longitude, description):
    query = 'UPDATE accommodations \
            SET accm_title = %s, accm_street = %s, accm_number = %s, accm_city = %s, accm_state = %s, accm_country = %s, accm_zipcode = %s, latitude = %s, longitude = %s, accm_description = %s \
            WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (title, street, number, city, state, country, zipcode, latitude, longitude, description, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def deleteAccommodationCascade(self, identifier):
    query = 'UPDATE accommodations SET deleted_flag = true WHERE landlord_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res
  
  def deleteAccommodation(self, identifier):
    query = 'UPDATE accommodations SET deleted_flag = true WHERE accm_id = %s AND deleted_flag = false RETURNING *'
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
    query = 'SELECT accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, json_agg(units) AS accm_units \
            FROM accommodations NATURAL INNER JOIN units \
            WHERE (accm_title ILIKE \'%%%s%%\' OR accm_street ILIKE \'%%%s%%\' OR accm_city ILIKE \'%%%s%%\' OR accm_state ILIKE \'%%%s%%\' OR accm_country ILIKE \'%%%s%%\') \
            AND deleted_flag = false \
            GROUP BY accm_id ORDER BY accm_id DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(data, data, data, data, data, offset))
    res = cursor.fetchall()
    cursor.close()
    return res

  def filter(self, amenities, data, offset):
    query = 'SELECT accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, \
            json_agg(units) AS accm_units \
            FROM accommodations NATURAL INNER JOIN units NATURAL INNER JOIN shared_amenities \
            INNER JOIN private_amenities ON units.unit_id = private_amenities.unit_id \
            WHERE (accm_title ILIKE \'%%%s%%\' OR accm_street ILIKE \'%%%s%%\' OR accm_city ILIKE \'%%%s%%\' OR accm_state ILIKE \'%%%s%%\' OR accm_country ILIKE \'%%%s%%\') \
            AND (%s) AND units.available = true \
            AND accommodations.deleted_flag = false \
            GROUP BY accm_id ORDER BY accm_id DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(data, data, data, data, data, amenities, offset))
    res = cursor.fetchall()
    cursor.close()
    return res

  def calculateScore(self, distance_weight, price_weight, size_weight, amenities_weight, rating_weight, offset):
    query = 'WITH shared_amenities_scores AS ( \
              SELECT accm_id, sum(shared_kitchen::int)+sum(shared_bathroom::int)+sum(shared_washer::int)+sum(shared_dryer::int)+sum(pets_allowed::int) AS total_shared_amenities \
              FROM shared_amenities \
              GROUP BY accm_id \
            ), \
            accm_scores AS ( \
              SELECT accm_id, total_shared_amenities, \
              landlord_rating/5::float AS rating_score, \
              CASE \
                WHEN distance < 1000 THEN 1 \
                ELSE 1000/distance::float \
                END AS distance_score \
              FROM accommodations NATURAL INNER JOIN landlords NATURAL INNER JOIN shared_amenities_scores \
            ), \
            priv_amenities_scores AS ( \
              SELECT unit_id, \
              sum(electricity::int)+sum(water::int)+sum(internet::int)+sum(heater::int)+sum(balcony::int)+sum(private_washer::int)+sum(private_dryer::int)+sum(air_conditioner::int)+sum(parking::int) AS total_priv_amenities \
              FROM private_amenities \
              GROUP BY unit_id \
            ), \
            unit_scores AS ( \
              SELECT unit_id, rating_score, distance_score, \
              (1-exp((cast(size as float)/cast(tenant_capacity as float))*-0.004)) AS size_score, \
              ((cast(total_shared_amenities+total_priv_amenities as float))/14) AS amenities_score, \
              exp((cast(-price as float)/cast(tenant_capacity as float))/1800) AS price_score \
              FROM units NATURAL INNER JOIN accm_scores NATURAL INNER JOIN priv_amenities_scores \
            ), \
            unit_total_scores AS ( \
              SELECT unit_id, unit_number, tenant_capacity, price, size, date_available, contract_duration, accm_id, distance_score, price_score, size_score, amenities_score, rating_score, \
              round(((distance_score*%s)+(price_score*%s)+(size_score*%s)+(amenities_score*%s)+(rating_score*%s))::numeric,1) AS total_score \
              FROM units NATURAL INNER JOIN unit_scores \
              ORDER BY total_score DESC \
            ) \
            SELECT accm_id, accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, \
            json_agg(unit_total_scores) AS accm_units, round(avg(total_score)::numeric,1) as avg_score \
            FROM accommodations NATURAL INNER JOIN unit_total_scores \
            GROUP BY accm_id ORDER BY avg_score DESC LIMIT 10 OFFSET %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(distance_weight, price_weight, size_weight, amenities_weight, rating_weight, offset))
    res = cursor.fetchall()
    cursor.close()
    return res
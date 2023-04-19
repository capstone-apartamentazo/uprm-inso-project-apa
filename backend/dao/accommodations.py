from util.config import db

class Accommodations:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations WHERE accm_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByLandlordId(self, landlord):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations WHERE landlord_id = %s AND deleted_flag = false' %(landlord))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addAccommodation(self, title, street, number, city, state, country, zipcode, description, landlord):
    query = 'INSERT INTO accommodations (accm_title, accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, landlord_id) \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (title, street, number, city, state, country, zipcode, description, landlord))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateAccommodation(self, identifier, title, street, number, city, state, country, zipcode, description):
    query = 'UPDATE accommodations \
            SET accm_title = %s, accm_street = %s, accm_number = %s, accm_city = %s, accm_state = %s, accm_country = %s, accm_zipcode = %s, accm_description = %s \
            WHERE accm_id = %s RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (title, street, number, city, state, country, zipcode, description, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def getByConstraint(self, landlord, number):
    query = 'SELECT * FROM accommodations WHERE accm_number = %s AND landlord_id = %s'
    cursor = db.cursor()
    cursor.execute(query, (number, landlord))
    res = cursor.fetchone()
    cursor.close()
    return res

  def search(self, data):
    query = 'SELECT * FROM accommodations \
            WHERE (accm_title ILIKE \'%%%s%%\' OR accm_street ILIKE \'%%%s%%\' OR accm_city ILIKE \'%%%s%%\' OR accm_state ILIKE \'%%%s%%\' OR accm_country ILIKE \'%%%s%%\') \
            AND deleted_flag = false LIMIT 10'
    cursor = db.cursor()
    cursor.execute(query %(data, data, data, data, data))
    res = cursor.fetchall()
    cursor.close()
    return res

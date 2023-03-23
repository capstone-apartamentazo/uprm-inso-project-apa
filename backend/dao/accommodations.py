from backend.util.config import db

class Accommodations:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations WHERE accm_id = %s AND deleted_flag = false' %identifier)
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByLandlordId(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accommodations WHERE landlord_id = %s AND deleted_flag = false' %identifier)
    res = cursor.fetchall()
    cursor.close()
    return res

  def addAccommodation(self, street, number, city, state, country, zipcode, description, landlord):
    query = 'INSERT INTO accommodations (accm_street, accm_number, accm_city, accm_state, accm_country, accm_zipcode, accm_description, landlord_id) \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (street, number, city, state, country, zipcode, description, landlord))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
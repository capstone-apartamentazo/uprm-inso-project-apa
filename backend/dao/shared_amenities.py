from backend.util.config import db

class SharedAmenities:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM shared_amenities')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM shared_amenities WHERE shared_amenities_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM shared_amenities WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addSharedAmenities(self, identifier):
    cursor = db.cursor()
    cursor.execute('INSERT INTO shared_amenities (accm_id) VALUES (%s) RETURNING *' %(identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateSharedAmenities(self, identifier, bedrooms, bathrooms, kitchen, washer, dryer, internet, pets_allowed):
    query = 'UPDATE shared_amenities \
            SET bedrooms = %s, bathrooms = \'%s\', kitchen = %s, washer = %s, dryer = %s, internet = %s, pets_allowed = %s \
            WHERE shared_amenities_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (bedrooms, bathrooms, kitchen, washer, dryer, internet, pets_allowed, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
  
  def deleteSharedAmenitiesCascade(self, identifier):
    query = 'UPDATE shared_amenities SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor()
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

from util.config import db
from psycopg2.extras import RealDictCursor

class Landlords:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM landlords WHERE deleted_flag = false')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByEmail(self, email):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM landlords WHERE landlord_email = %s' %(email))
    res = cursor.fetchone()
    cursor.close()
    return res

  def addLandlord(self, name, email, password, phone):
    query = 'INSERT INTO landlords (landlord_name, landlord_email, landlord_password, landlord_phone) \
            VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (name, email, password, phone))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateLandlord(self, identifier, name, email, password, phone):
    query = 'UPDATE landlords \
            SET landlord_name = %s, landlord_email = %s, landlord_password = %s, landlord_phone = %s \
            WHERE landlord_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (name, email, password, phone, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getEmail(self, email, identifier):
    query = 'SELECT landlord_email FROM landlords \
            WHERE landlord_email = \'%s\' AND NOT landlord_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(email, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getPhoneNumber(self, number, identifier):
    query = 'SELECT landlord_phone FROM landlords \
            WHERE landlord_phone = \'%s\' AND NOT landlord_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(number, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateRating(self, identifier):
    query = 'UPDATE landlords \
            SET landlord_rating = (SELECT AVG(rating) FROM reviews NATURAL INNER JOIN accommodations WHERE landlord_id = %s) \
            WHERE landlord_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (identifier, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def deleteLandlord(self, identifier):
    query = 'UPDATE landlords SET deleted_flag = true WHERE landlord_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

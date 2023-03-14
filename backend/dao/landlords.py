from backend.util.config import db

class Landlords:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE deleted_flag = False')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %identifier)
    res = cursor.fetchone()
    cursor.close()
    return res

  def addLandlord(self, name, email, password, phone):
    query = 'INSERT INTO landlords (landlord_name, landlord_email, landlord_password, landlord_phone) \
            VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateLandlord(self, identifier, name, email, password, phone):
    query = 'UPDATE landlords \
            SET landlord_name = %s, landlord_email = %s, landlord_password = %s, landlord_phone = %s \
            WHERE landlord_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def getEmail(self, email, identifier):
    query = 'SELECT landlord_email FROM landlords \
            WHERE landlord_email = \'%s\' AND NOT landlord_id = %s'
    cursor = db.cursor()
    cursor.execute(query %(email, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getPhoneNumber(self, number, identifier):
    query = 'SELECT landlord_phone FROM landlords \
            WHERE landlord_phone = \'%s\' AND NOT landlord_id = %s'
    cursor = db.cursor()
    cursor.execute(query %(number, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

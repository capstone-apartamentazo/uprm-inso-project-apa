from backend.util.config import db

class Landlords:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE deleted_flag = false')
    res = []
    for row in cursor:
      res.append(row)
    cursor.close()
    return res

  def getById(self, id):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %id)
    res = []
    for row in cursor:
      res.append(row)
    cursor.close()
    return res

  def updateLandlord(self, id, name, email, password, phone):
    query = 'UPDATE landlords \
            SET landlord_name=%s, landlord_email=%s, landlord_password=%s, landlord_phone=%s \
            WHERE landlord_id=%s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone, id))
    res = []
    for row in cursor:
      res.append(row)
    db.commit()
    cursor.close()
    return res
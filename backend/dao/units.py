from backend.util.config import db

class Units:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM units')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM units WHERE unit_id = %s AND deleted_flag = false' %identifier)
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM units WHERE accm_id = %s AND deleted_flag = false' %accm)
    res = cursor.fetchall()
    cursor.close()
    return res

  def addUnit(self, shared, price, start, end, accm):
    query = 'INSERT INTO units (shared, price, init_date, end_date, accm_id) VALUES (%s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (shared, price, start, end, accm))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateUnit(self, identifier, available, shared, price, start, end):
    query = 'UPDATE units \
            SET available = %s, shared = %s, price = %s, init_date = %s, end_date = %s \
            WHERE unit_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (available, shared, price, start, end, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

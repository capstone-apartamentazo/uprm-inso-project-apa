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
    cursor.execute('SELECT * FROM units WHERE unit_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM units WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addUnit(self, number, shared, price, date_available, duration, accm):
    query = 'INSERT INTO units (unit_number, shared, price, date_available, contract_duration, accm_id) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (number, shared, price, date_available, duration, accm))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateUnit(self, identifier, number, available, shared, price, date_available, duration):
    query = 'UPDATE units \
            SET unit_number = %s, available = %s, shared = %s, price = %s, date_available = %s, contract_duration = %s \
            WHERE unit_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (number, available, shared, price, date_available, duration, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
  
  def deleteUnit(self, identifier):
    query = 'UPDATE units SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
  
  def deleteUnitCascade(self, identifier):
    query = 'UPDATE units SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor()
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    db.commit()
    cursor.close()
    return res

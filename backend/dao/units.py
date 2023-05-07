from util.config import db
from psycopg2.extras import RealDictCursor

class Units:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM units')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM units WHERE unit_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM units WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addUnit(self, number, tenant_capacity, price, size, date_available, duration, accm):
    query = 'WITH new_unit AS ( \
              INSERT INTO units (unit_number, tenant_capacity, price, size, date_available, contract_duration, accm_id) \
              VALUES (%s, %s, %s, %s, %s, %s, %s) \
              RETURNING * \
            ), \
            new_amenities AS ( \
              INSERT INTO private_amenities (unit_id) \
              SELECT unit_id FROM new_unit \
              RETURNING * \
            ) \
            SELECT * FROM new_unit NATURAL INNER JOIN new_amenities'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (number, tenant_capacity, price, size, date_available, duration, accm))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateUnit(self, identifier, number, available, tenant_capacity, price, size, date_available, duration):
    query = 'UPDATE units \
            SET unit_number = %s, available = %s, tenant_capacity = %s, price = %s, size = %s, date_available = %s, contract_duration = %s \
            FROM private_amenities\
            WHERE units.unit_id = %s AND private_amenities.unit_id = %s\
            RETURNING units.*, private_amenities.*'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (number, available, tenant_capacity, price, size, date_available, duration, identifier, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res
  
  def getByUnitNumber(self, accm, unit_numb):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM units WHERE accm_id = %s AND unit_number = \'%s\'' %(accm, unit_numb))
    res = cursor.fetchall()
    cursor.close()
    return res

  def available(self, availability, unit):
    query = 'UPDATE units\
        SET available = %s\
        WHERE unit_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (availability, unit))
    cursor.close()
    return

  def deleteUnitCascade(self, identifier):
    query = 'UPDATE units SET deleted_flag = true WHERE accm_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res
  
  def deleteUnit(self, identifier):
    query = 'UPDATE units SET deleted_flag = true WHERE unit_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res
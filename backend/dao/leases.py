from util.config import db
from psycopg2.extras import RealDictCursor

class Leases:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM leases')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM leases WHERE lease_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByUnitId(self, unit):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM leases WHERE unit_id = %s AND deleted_flag = false' %(unit))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByTenantId(self, tenant):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM leases WHERE tenant_id = %s AND deleted_flag = false' %(tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

# TODO set is_current_tenant to true if init_date >= now and to false if end_date < now for all leases when adding or updating lease

  def addLease(self, price, start, end, unit, tenant):
    query = 'INSERT INTO leases (price, init_date, end_date, unit_id, tenant_id) VALUES (%s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (price, start, end, unit, tenant))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateLease(self, identifier, price, start, end, currTenant, unit, tenant):
    query = 'UPDATE leases \
            SET price = %s, init_date = %s, end_date = %s, is_current_tenant = %s, unit_id = %s, tenant_id = %s \
            WHERE lease_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (price, start, end, currTenant, unit, tenant, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateCurrentTenant(self, identifier, currTenant):
    query = 'UPDATE leases SET is_current_tenant = %s WHERE lease_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (currTenant, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res
  
  def deleteLeaseCascade(self, identifier):
    query = 'UPDATE leases SET deleted_flag = true WHERE unit_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

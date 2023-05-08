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

  def getLandlordFromUnit(self, unit):
    query = 'SELECT landlords.landlord_id FROM landlords \
            INNER JOIN accommodations ON landlords.landlord_id = accommodations.landlord_id \
            INNER JOIN units ON accommodations.accm_id = units.accm_id \
            WHERE unit_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(unit))
    res = cursor.fetchone()
    cursor.close()
    return res

  def invalidTenant(self, tenant, start_date):
    query = 'SELECT * FROM tenants NATURAL INNER JOIN leases WHERE (tenant_id = %s AND is_current_tenant = true) \
            AND \'%s\' BETWEEN init_date AND end_date'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(tenant, start_date))
    res = cursor.fetchone()
    cursor.close()
    return res

  def addLease(self, price, start, end, unit, tenant):
    query = 'INSERT INTO leases (price, init_date, end_date, unit_id, tenant_id) \
              VALUES (%s, %s, %s, %s, %s) \
              RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (price, start, end, unit, tenant))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateLease(self, identifier, unit_id, tenant_id, price, isCurrentTenant, init_date, end_date):
    query = 'UPDATE leases \
            SET unit_id = %s, tenant_id = %s, price = %s, is_current_tenant = %s, init_date = %s, end_date = %s \
            WHERE lease_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (unit_id, tenant_id, price, isCurrentTenant, init_date, end_date, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateCurrentTenants(self):
    query = 'UPDATE leases SET is_current_tenant = ( \
              CASE \
                WHEN (NOW()::TIMESTAMP(0) >= init_date AND NOW()::TIMESTAMP(0) <= end_date) THEN true \
                ELSE false \
              END \
            ) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query)
    res = cursor.fetchall()
    cursor.close()
    return res

  def extensionValid(self, curr_date, new_date):
    query = 'SELECT %s < %s as is_valid'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (curr_date, new_date))
    res = cursor.fetchone()
    cursor.close()
    return res

  def extendLease(self, identifier, end):
    query = 'UPDATE leases \
            SET end_date = %s \
            WHERE lease_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (end, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def deleteLease(self, identifier):
    query = 'UPDATE leases SET deleted_flag = true WHERE lease_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
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

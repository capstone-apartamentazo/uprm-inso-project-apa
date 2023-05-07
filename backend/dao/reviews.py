from util.config import db
from psycopg2.extras import RealDictCursor

class Reviews:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM reviews')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM reviews WHERE review_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM reviews WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByTenantId(self, tenant):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM reviews WHERE tenant_id = %s AND deleted_flag = false' %(tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addReview(self, rating, comment, accm, tenant):
    query = 'INSERT INTO reviews (rating, comment, accm_id, tenant_id) VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (rating, comment, accm, tenant))
    res = cursor.fetchone()
    cursor.close()
    return res

  def deleteReview(self, identifier):
    query = 'UPDATE reviews SET deleted_flag = true WHERE accm_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def isFormerTenant(self, accm, tenant):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT leases.unit_id, tenant_id FROM leases \
                  INNER JOIN units ON leases.unit_id = units.unit_id \
                  WHERE accm_id = %s AND tenant_id = %s' %(accm, tenant))
    res = cursor.fetchall()
    cursor.close()
    return res
from util.config import db
from psycopg2.extras import RealDictCursor

class Notices:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM notices')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM notices WHERE notice_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM notices WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getTenantNotices(self, accm, tenant):
    query = 'SELECT notice_id, notice_title, notice_content, notices.accm_id, notice_send_date FROM notices \
            INNER JOIN accommodations on notices.accm_id = accommodations.accm_id \
            INNER JOIN units on accommodations.accm_id = units.accm_id \
            INNER JOIN leases on units.unit_id = leases.unit_id \
            WHERE notices.accm_id = %s \
            AND tenant_id = %s \
            AND is_current_tenant = true'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(accm, tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addNotice(self, title, content, accm):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('INSERT INTO notices (notice_title, notice_content, accm_id) VALUES (%s, %s, %s) RETURNING *', (title, content, accm))
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateNotice(self, identifier, title, content):
    query = 'UPDATE notices \
            SET notice_send_date = NOW()::TIMESTAMP(0), notice_title = %s, notice_content = %s \
            WHERE notice_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (title, content, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res
  
  def deleteNoticeCascade(self, identifier):
    query = 'UPDATE notices SET deleted_flag = true WHERE accm_id = %s AND deleted_flag = false RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchall()
    cursor.close()
    return res
  
  def getCurrentTenants(self, accm):
    query = 'SELECT tenants.tenant_id, tenants.tenant_name, tenants.tenant_email, tenants.tenant_phone \
            FROM tenants \
            JOIN leases ON leases.tenant_id = tenants.tenant_id \
            JOIN units ON units.unit_id = leases.unit_id \
            WHERE leases.is_current_tenant = true \
            AND leases.deleted_flag = false \
            AND units.deleted_flag = false \
            AND units.accm_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

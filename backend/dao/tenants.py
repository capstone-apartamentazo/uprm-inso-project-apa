from util.config import db
from psycopg2.extras import RealDictCursor

class Tenants:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM tenants WHERE deleted_flag = False')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM tenants WHERE tenant_id = %s' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByEmail(self, email):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM tenants WHERE tenant_email = %s' %(email))
    res = cursor.fetchone()
    cursor.close()
    return res

  def addTenant(self, name, email, password, phone):
    query = 'INSERT INTO tenants (tenant_name, tenant_email, tenant_password, tenant_phone) \
            VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (name, email, password, phone))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateTenant(self, identifier, name, email, password, phone):
    query = 'UPDATE tenants \
            SET tenant_name = %s, tenant_email = %s, tenant_password = %s, tenant_phone = %s \
            WHERE tenant_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (name, email, password, phone, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def getEmail(self, email, identifier):
    query = 'SELECT tenant_email FROM tenants \
            WHERE tenant_email = \'%s\' AND NOT tenant_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(email, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getPhoneNumber(self, number, identifier):
    query = 'SELECT tenant_phone FROM tenants \
            WHERE tenant_phone = \'%s\' AND NOT tenant_id = %s'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(number, identifier))
    res = cursor.fetchone()
    cursor.close()
    return res
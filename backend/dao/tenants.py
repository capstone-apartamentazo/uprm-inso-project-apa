from backend.util.config import db

class Tenants:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM tenants WHERE deleted_flag = False')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, id):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM tenants WHERE tenant_id = %s' %id)
    res = cursor.fetchone()
    cursor.close()
    return res

  def updateTenant(self, id, name, email, password, phone):
    query = 'UPDATE tenants \
            SET tenant_name=%s, tenant_email=%s, tenant_password=%s, tenant_phone=%s \
            WHERE tenant_id=%s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone, id))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def addTenant(self, name, email, password, phone):
    query = 'INSERT INTO tenants (tenant_name, tenant_email, tenant_password, tenant_phone) \
            VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def getEmail(self, email):
    cursor = db.cursor()
    cursor.execute('SELECT tenant_email FROM tenants WHERE tenant_email = \'%s\'' %email)
    res = cursor.fetchone()
    cursor.close()
    return res

  def getPhoneNumber(self, number):
    cursor = db.cursor()
    cursor.execute('SELECT tenant_phone FROM tenants WHERE tenant_phone = \'%s\'' %number)
    res = cursor.fetchone()
    cursor.close()
    return res
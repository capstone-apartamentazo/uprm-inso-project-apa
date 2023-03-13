from backend.util.config import db

class Tenants:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM tenants WHERE deleted_flag = false')
    res = []
    for row in cursor:
      res.append(row)
    cursor.close()
    return res

  def getById(self, id):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM tenants WHERE tenant_id = %s' %id)
    res = []
    for row in cursor:
      res.append(row)
    cursor.close()
    return res

  def updateTenant(self, id, name, email, password, phone):
    query = 'UPDATE tenants \
            SET tenant_name=%s, tenant_email=%s, tenant_password=%s, tenant_phone=%s \
            WHERE tenant_id=%s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (name, email, password, phone, id))
    res = []
    for row in cursor:
      res.append(row)
    db.commit()
    cursor.close()
    return res
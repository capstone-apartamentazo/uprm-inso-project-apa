from util.config import db
from psycopg2.extras import RealDictCursor

class Requests:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM requests')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM requests WHERE request_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByUnitId(self, unit):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM requests WHERE unit_id = %s AND deleted_flag = false' %(unit))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByTenantId(self, tenant):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM requests WHERE tenant_id = %s AND deleted_flag = false' %(tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addRequestWithoutTour(self, unit, tenant, comment):
    query = 'INSERT INTO requests (unit_id, tenant_id, comment) VALUES (%s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (unit, tenant, comment))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def addRequestWithTour(self, unit, tenant, tour, date, comment):
    query = 'INSERT INTO requests (unit_id, tenant_id, tenant_wants_tour, tour_date, comment) VALUES (%s, %s, %s, %s, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (unit, tenant, tour, date, comment))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateRequestTour(self, identifier, tour, date, comment):
    query = 'UPDATE requests \
            SET tenant_wants_tour = %s, tour_date = %s, comment = %s \
            WHERE request_id = %s \
            RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (tour, date, comment, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateLandlordApproval(self, identifier, approved):
    query = 'UPDATE requests SET landlord_approves = %s WHERE request_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (approved, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateTenantApproval(self, identifier, approved):
    query = 'UPDATE requests SET tenant_approves = %s WHERE request_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (approved, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def deleteRequestCascade(self, identifier):
    query = 'UPDATE requests SET deleted_flag = true WHERE unit_id = %s RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res
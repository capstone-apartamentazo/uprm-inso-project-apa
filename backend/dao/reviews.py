from backend.util.config import db

class Reviews:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM reviews')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM reviews WHERE review_id = %s AND deleted_flag = false' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, accm):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM reviews WHERE accm_id = %s AND deleted_flag = false' %(accm))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByTenantId(self, tenant):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM reviews WHERE tenant_id = %s AND deleted_flag = false' %(tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def addReview(self, rating, comment, accm, tenant):
    query = 'INSERT INTO reviews (rating, comment, accm_id, tenant_id) VALUES (%s, %s, %s, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (rating, comment, accm, tenant))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateReview(self, identifier, rating, comment):
    query = 'UPDATE reviews \
            SET review_send_date = NOW()::TIMESTAMP(0), rating = %s, comment = %s \
            WHERE review_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (rating, comment, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

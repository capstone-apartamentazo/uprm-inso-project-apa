from backend.util.config import db

class Notices:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM notices')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM notices WHERE notice_id = %s AND deleted_flag = false' %identifier)
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByAccommodationId(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM notices WHERE accm_id = %s AND deleted_flag = false' %identifier)
    res = cursor.fetchall()
    cursor.close()
    return res

  def addNotice(self, title, content, identifier):
    cursor = db.cursor()
    cursor.execute('INSERT INTO notices (notice_title, notice_content, accm_id) VALUES (%s, %s, %s) RETURNING *', (title, content, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def updateNotice(self, identifier, title, content):
    query = 'UPDATE notices \
            SET notice_send_date = NOW()::TIMESTAMP(0), notice_title = %s, notice_content = %s \
            WHERE notice_id = %s \
            RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (title, content, identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

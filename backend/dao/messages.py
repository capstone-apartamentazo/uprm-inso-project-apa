from backend.util.config import db

class Messages:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByPrimaryKeys(self, landlord, tenant, date):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages \
                    WHERE landlord_id = %s AND tenant_id = %s AND msg_send_date = \'%s\'' %(landlord, tenant, date))
    res = cursor.fetchone()
    cursor.close()
    return res
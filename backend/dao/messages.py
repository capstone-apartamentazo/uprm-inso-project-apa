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

  def getConversation(self, landlord, tenant):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages \
                    WHERE landlord_id = %s AND tenant_id = %s' %(landlord, tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def landlordSendsMessage(self, landlord, tenant, content):
    cursor = db.cursor()
    cursor.execute('INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) \
                    VALUES (%s, %s, true, \'%s\') RETURNING *' %(landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def tenantSendsMessage(self, landlord, tenant, content):
    cursor = db.cursor()
    cursor.execute('INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) \
                    VALUES (%s, %s, false, \'%s\') RETURNING *' %(landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
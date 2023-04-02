from backend.util.config import db

class Messages:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages WHERE message_id = %s' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByConstraint(self, landlord, tenant, date, landlord_sent_msg):
    query = 'SELECT * FROM messages WHERE landlord_id = %s AND tenant_id = %s AND msg_send_date = %s AND landlord_sent_msg = %s'
    cursor = db.cursor()
    cursor.execute(query, (landlord, tenant, date, landlord_sent_msg))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getConversation(self, landlord, tenant):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM messages WHERE landlord_id = %s AND tenant_id = %s ORDER BY messages.msg_send_date', (landlord, tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def landlordSendsMessage(self, landlord, tenant, content):
    query = 'INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (%s, %s, true, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def tenantSendsMessage(self, landlord, tenant, content):
    query = 'INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (%s, %s, false, %s) RETURNING *'
    cursor = db.cursor()
    cursor.execute(query, (landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def messageRead(self, identifier):
    query = 'UPDATE messages SET msg_read = true WHERE message_id = %s RETURNING *'
    cursor = db.cursor()
    cursor.execute(query %(identifier))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res
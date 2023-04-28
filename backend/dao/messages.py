from util.config import db
from psycopg2.extras import RealDictCursor

class Messages:

  def getAll(self):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM messages')
    res = cursor.fetchall()
    cursor.close()
    return res

  def getById(self, identifier):
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM messages WHERE message_id = %s' %(identifier))
    res = cursor.fetchone()
    cursor.close()
    return res

  def getByLandlordId(self, landlord):
    query = 'SELECT DISTINCT ON (tenant_id) * FROM messages WHERE landlord_id = %s ORDER BY tenant_id, msg_send_date DESC'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(landlord))
    res = cursor.fetchall()
    cursor.close()
    return res

  def getByTenantId(self, tenant):
    query = 'SELECT DISTINCT ON (landlord_id) * FROM messages WHERE tenant_id = %s ORDER BY landlord_id, msg_send_date DESC'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query %(tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def read(self, landlord, tenant, access):
    landlord_sent_msg = False
    if access == 'tenant':
      landlord_sent_msg = True
    query = 'UPDATE messages SET msg_read = true \
            WHERE landlord_id = %s AND tenant_id = %s AND landlord_sent_msg = %s AND msg_read = false'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (landlord, tenant, landlord_sent_msg))
    db.commit()
    cursor.close()

  def getConversation(self, landlord, tenant):
    query = 'SELECT * FROM messages WHERE landlord_id = %s AND tenant_id = %s ORDER BY msg_send_date'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (landlord, tenant))
    res = cursor.fetchall()
    cursor.close()
    return res

  def landlordSendsMessage(self, landlord, tenant, content):
    query = 'INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (%s, %s, true, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

  def tenantSendsMessage(self, landlord, tenant, content):
    query = 'INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (%s, %s, false, %s) RETURNING *'
    cursor = db.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, (landlord, tenant, content))
    res = cursor.fetchone()
    db.commit()
    cursor.close()
    return res

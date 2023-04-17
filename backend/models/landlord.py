from util.config import db

class Landlord:
  identifier = 0
  email = ""
  password = ""

  @property
  def identity(self):
      return 0

  @property
  def rolenames(self):
      return []

  @classmethod
  def lookup(self, email):
    query = 'SELECT * FROM landlords WHERE landlord_email = \'%s\''
    cursor = db.cursor()
    cursor.execute(query %(email))
    res = cursor.fetchone()
    cursor.close()
    landlord = Landlord()
    landlord.identifier = res[0]
    landlord.email = res[2]
    landlord.password = res[3]
    return landlord

  @classmethod
  def identify(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %identifier)
    res = cursor.fetchone()
    cursor.close()
    landlord = Landlord()
    landlord.identifier = res[0]
    landlord.email = res[2]
    landlord.password = res[3]
    return landlord
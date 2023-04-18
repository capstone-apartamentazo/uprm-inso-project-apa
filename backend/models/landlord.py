from util.config import db

class Landlord:
  identifier = 0
  landlord_name = str()
  landlord_email = str()
  landlord_password = str()
  landlord_phone = str()
  landlord_rating = str()

  def setInfo(self, row):
    self.identifier = row[0]
    self.landlord_name = row[1]
    self.landlord_email = row[2]
    self.landlord_password = row[3]
    self.landlord_phone = row[4]
    self.landlord_rating = row[5]

  @property
  def identity(self):
    return self.identifier
  
  @property
  def name(self):
    return self.landlord_name

  @property
  def password(self):
    return self.landlord_password

  @property
  def email(self):
    return self.landlord_email

  @property
  def phone(self):
    return self.landlord_phone

  @property
  def rating(self):
    return self.landlord_rating

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
    landlord.setInfo(res)
    return landlord

  @classmethod
  def identify(self, identifier):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %identifier)
    res = cursor.fetchone()
    cursor.close()
    landlord = Landlord()
    landlord.setInfo(res)
    return landlord
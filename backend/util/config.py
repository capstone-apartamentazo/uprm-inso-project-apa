from flask import Flask, jsonify
from flask_cors import CORS
from flask_praetorian import Praetorian
from psycopg2 import connect, Error as pgerror
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from os import environ
import logging

# load environment variables
load_dotenv()

# Connect to PostgreSQL database
try:
  database_url = environ.get('DATABASE_URL')
  db = connect(database_url)

  print('Connection successful')

  cursor = db.cursor()
  cursor.execute('SELECT version()')
  print(cursor.fetchone())
  cursor.close()

except pgerror:
  print('Error while connecting to PostgreSQL', pgerror)

# Initialize Flask and CORS app
app = Flask(__name__)
cors = CORS(app)

# Initialize logger for exception handling
logger = logging.getLogger()

# Setup app config
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')
app.config['JWT_ACCESS_LIFESPAN'] = { 'minutes': 60 }

# Create Landlord and Tenant classes for authorization features
class Landlord:
  def __init__(self, json=None):
    if json is not None:
      self.lid = json['landlord_id']
      self.password = json['landlord_password']
    else:
      self.lid = 0
      self.password = str()

  @property
  def identity(self):
    return self.lid

  @property
  def rolenames(self):
    return ['landlord']

  @classmethod
  def lookup(self, email):
    try:
      cursor = db.cursor(cursor_factory=RealDictCursor)
      cursor.execute('SELECT * FROM landlords WHERE landlord_email = \'%s\'' %(email))
      res = cursor.fetchone()
      cursor.close()
      if res:
        return Landlord(res)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @classmethod
  def identify(self, lid):
    try:
      cursor = db.cursor(cursor_factory=RealDictCursor)
      cursor.execute('SELECT * FROM landlords WHERE landlord_id = %s' %(lid))
      res = cursor.fetchone()
      cursor.close()
      if res:
        return Landlord(res)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

class Tenant:
  def __init__(self, json=None):
    if json is not None:
      self.tid = json['tenant_id']
      self.password = json['tenant_password']
    else:
      self.tid = 0
      self.password = str()

  @property
  def identity(self):
    return self.tid

  @property
  def rolenames(self):
    return ['tenant']

  @classmethod
  def lookup(self, email):
    try:
      cursor = db.cursor(cursor_factory=RealDictCursor)
      cursor.execute('SELECT * FROM tenants WHERE tenant_email = \'%s\'' %(email))
      res = cursor.fetchone()
      cursor.close()
      if res:
        return Tenant(res)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

  @classmethod
  def identify(self, tid):
    try:
      cursor = db.cursor(cursor_factory=RealDictCursor)
      cursor.execute('SELECT * FROM tenants WHERE tenant_id = %s' %(tid))
      res = cursor.fetchone()
      cursor.close()
      if res:
        return Tenant(res)
    except (Exception, pgerror) as e:
      db.rollback()
      logger.exception(e)
      return jsonify('Error Occured'), 400

# Initialize Praetorian with Flask app for Landlord and Tenant classes
landlord_guard = Praetorian(app, Landlord)
tenant_guard = Praetorian(app, Tenant)
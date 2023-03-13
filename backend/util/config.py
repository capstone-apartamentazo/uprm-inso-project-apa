from flask import Flask
from flask_cors import CORS
import psycopg2

localConfig = {
  'host': 'localhost',
  'dbname': 'apartamentazo',
  'user': 'admin',
  'password': 'rum802',
  'port': '5432'
}

herokuConfig = {
  'host': '',
  'dbname': '',
  'user': '',
  'password': '',
  'port': '5432'
}

# Connect to PostgreSQL database
try:
  pgConfig = localConfig
  db = psycopg2.connect(
    host=pgConfig['host'],
    database=pgConfig['dbname'],
    user=pgConfig['user'],
    password=pgConfig['password'],
    port=pgConfig['port']
    )

  print("Connection successful")
  
  cursor = db.cursor()
  # cursor.execute(open("backend/util/init.sql").read())
  cursor.execute('SELECT version()')
  print(cursor.fetchone())
  cursor.close()

except (Exception, psycopg2.Error) as error:
  print("Error while connecting to PostgreSQL", error)

# Init Flask App
app = Flask(__name__)
CORS(app)

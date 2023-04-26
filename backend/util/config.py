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
  'host': 'ec2-34-236-103-63.compute-1.amazonaws.com',
  'dbname': 'd94ppu9a7iv7u',
  'user': 'loiljbrkkiucqg',
  'password': 'ce381cc46d804dc2e6a4fe7f757095d021459da6bdfb282da70a7aac82dcb371',
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

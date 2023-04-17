from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import flask_praetorian
import psycopg2
import os

load_dotenv()

# Connect to PostgreSQL database
try:
  dbConfig = os.environ.get('DATABASE_URL')
  db = psycopg2.connect(dbConfig)

  print("Connection successful")
  
  cursor = db.cursor()
  cursor.execute('SELECT version()')
  print(cursor.fetchone())
  cursor.close()

except (Exception, psycopg2.Error) as error:
  print("Error while connecting to PostgreSQL", error)

# Init Flask App
app = Flask(__name__)
guard = flask_praetorian.Praetorian()
cors = CORS(app)

app.config["SECRET_KEY"] = "rum802"
app.config["JWT_ACCESS_LIFESPAN"] = { "hours": 24 }
app.config["JWT_REFRESH_LIFESPAN"] = { "days": 30 }

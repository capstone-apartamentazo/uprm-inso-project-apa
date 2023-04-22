from flask import Flask
from flask_cors import CORS
from flask_praetorian import Praetorian
from psycopg2 import connect, Error
from dotenv import load_dotenv
from os import environ

# load environment variables
load_dotenv()

# Connect to PostgreSQL database
try:
  database_url = environ.get('DATABASE_URL')
  db = connect(database_url)

  print("Connection successful")

  cursor = db.cursor()
  cursor.execute('SELECT version()')
  print(cursor.fetchone())
  cursor.close()

except (Exception, Error) as err:
  print("Error while connecting to PostgreSQL", err)

# Initialize Flask and CORS app
app = Flask(__name__)
cors = CORS(app)

# Setup app config
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')
app.config['JWT_ACCESS_LIFESPAN'] = { 'minutes': 60 }

# Initialize Praetorian
guard = Praetorian()
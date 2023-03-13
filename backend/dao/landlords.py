from backend.util.config import db

class Landlords:

  def getAll(self):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM landlords WHERE deleted_flag = False')
    res = []
    for row in cursor:
      res.append(row)
    cursor.close()
    return res
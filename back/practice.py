from db_connect import db
from models.Model import FoodHour

def practice():
    prac = db.session.query(FoodHour).first()[0]
    return prac


print(practice())
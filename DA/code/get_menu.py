#임시 파일(초안)
#============================================================== 임시 import
from flask import jsonify, request
from flask_restx import Resource
from db_connect import db
from datetime import date, datetime
from flask_restx import Namespace, fields


# ============================================================== coronaDto.py 부분
class DateFormat(fields.Raw):
    def format(self, value):
        return date.strftime(value, "%Y-%m-%d")


class CovDto:
    api = Namespace("food", description="추천 메뉴 api")
    food_model = api.model(
        "food_model",
        {
            "id": fields.Integer(readonly=True, description='아이디'),
            "food": fields.String(readonly=True, description='음식'),
            "date": DateFormat(),
        },
    )

#============================================================================================ Model.py 부분
class FoodHour(db.Model):
    __tablename__ = "foodhour"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    day = db.Column(db.String(10), nullable=False)
    hour = db.Column(db.Integer, nullable=False)
    food = db.Column(db.String(20), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    celsius = db.Column(db.Float, nullable=False)
    rain = db.Column(db.Float, nullable=False)

    def __init__(self, date, day, hour, food, count, celsius, rain):
        self.date = date
        self.day = day
        self.hour = hour
        self.food = food
        self.count = count
        self.celsius = celsius
        self.rain = rain
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

# =========================================================================================== #corona.py 부분
cov = CovDto.api

@cov.route("/food", methods=["GET"])
@cov.response(200, "Found")
@cov.response(404, "Not found")
@cov.response(500, "Internal Error")
# @corona_cnt.param("id", "해당 데이터의 ID")

def get_menu():
    '''시간 별로 가장 많이 시킨 배달 음식 추천'''
    curr_date = datetime.now()
    curr_hour = int(curr_date.strftime("%H"))
    new_food = db.session.query(FoodHour).filter(FoodHour.hour == curr_hour).all()
    result = {}
    for i in range(len(new_food)):
        try:
            result[new_food[i].food] += new_food[i].count
        except:
            result[new_food[i].food] = new_food[i].count
    return max(result)
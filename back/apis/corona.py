from flask import jsonify
from flask_restx import Resource, Namespace
from db_connect import db
from models.Model import Patient, DeliverCount
from dto.coronaDto import CoronaDto

corona_cnt = CoronaDto.api
_model = CoronaDto.pamo

@corona_cnt.route("/cov", methods=["GET"])
@corona_cnt.response(200, "Found")
@corona_cnt.response(404, "Not found")
@corona_cnt.response(500, "Internal Error")
# @corona_cnt.param("id", "해당 데이터의 ID")
class Cov(Resource):
    @corona_cnt.marshal_with(_model, envelope='res')
    def get(self):
        patients = db.session.query(Patient).filter(
        Patient.id < 10).all()
        # http://127.0.0.1:5000/corona_cnt/cov?q=month/day?start-date=20200101&end-date=20200215
       
        return patients

data_delivery = Namespace("deliver_cnt", description="배달건수 현황 api")
@data_delivery.route("/deliver", methods=["GET"])
@data_delivery.response(200, "Found")
@data_delivery.response(404, "Not found")
@data_delivery.response(500, "Internal Error")
class Deliver(Resource):
    def get(self):
        deliver = db.session.query(DeliverCount).limit(10)
        # http://127.0.0.1:5000/corona_cnt/cov?q=moanth/day?start-date=20200101&end-date=20200215
        res = []
        for i, item in enumerate(deliver):
            res.append(item.as_dict())
        return jsonify({"data": res})

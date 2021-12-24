from flask import jsonify
from flask_restx import Resource, Api, Namespace, fields, apidoc
from db_connect import db
from models.Model import Patient

# ns = api.namespace("data", description="코로나 발생 건수 api")
corona_cnt = Namespace("corona_cnt", description="코로나 발생 건수 api")

@corona_cnt.route("/cov", methods=["GET"])
@corona_cnt.response(200, "Found")
@corona_cnt.response(404, "Not found")
@corona_cnt.response(500, "Internal Error")
# @corona_cnt.param("id", "해당 데이터의 ID")
class Data(Resource):
    def get(self):
        patients = db.session.query(Patient).all()
        # http://127.0.0.1:5000/corona_cnt/cov?q=month/day?start-date=20200101&end-date=20200215
        res = []
        # res = [item.as_dict() for item in patients]
        for i, item in enumerate(patients):
            # if i < 10:
            # print(i)
            res.append(item.as_dict())
        return jsonify({"data": res})


data_delivery = Namespace("delivery", description="배달건수 현황 api")


@data_delivery.route("/deliver/<int:id>", methods=["GET"])
@data_delivery.response(200, "Found")
@data_delivery.response(404, "Not found")
@data_delivery.response(500, "Internal Error")
@data_delivery.param("id", "해당 데이터의 ID")
class Data(Resource):
    def get(self, id):
        con = sqlite3.connect("./coroanDeliverCnt.db")  # 빈 .db파일 생성 또는 읽기
        cur = con.cursor()
        q = "select * from corona where id = ?"
        r = cur.execute(q, (str(id),))
        res = r.fetchone()
        print(res)
        cur.close()
        return {"rsc": res}

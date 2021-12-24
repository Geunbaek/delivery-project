from flask import Flask, Blueprint
from flask_restx import Resource, Api, Namespace, fields, apidoc
from db_connect import db
from models.Model import Patient

# ns = api.namespace("data", description="코로나 발생 건수 api")
corona_cnt = Namespace("corona_cnt", description="코로나 발생 건수 api")


@corona_cnt.route("/cov/<int:id>", methods=["GET"])
@corona_cnt.response(200, "Found")
@corona_cnt.response(404, "Not found")
@corona_cnt.response(500, "Internal Error")
@corona_cnt.param("id", "해당 데이터의 ID")
class Data(Resource):
    def get(self, id):
        # con = sqlite3.connect("./coroanSeoul.db")  # 빈 .db파일 생성 또는 읽기
        # cur = con.cursor()
        # q = "select * from corona where id = ?"
        # r = cur.execute(q, (str(id),))
        # res = r.fetchone()
        # print(res)
        # cur.close()

        patients = Patient.query().all()
        print(patients)

        return {"rsc": patients}


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

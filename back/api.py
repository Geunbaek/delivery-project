from flask import Flask, Blueprint
from flask_restx import Resource, Api, apidoc
import sqlite3


app = Flask(__name__)

app.config.SWAGGER_UI_DOC_EXPANSION = "list"  # 펼쳐짐
app.config.SWAGGER_UI_OPERATION_ID = True
app.config.SWAGGER_UI_REQUEST_DURATION = True
app.config.SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get"]  # Try it out 제공

api_bp = Blueprint("api", __name__, url_prefix="/api")
# api = Api(api_bp, doc='/doc/',version='2.0.3', title='삼시카페 API',
#     description='팀 삼시카페의 프로젝트 API 문서입니다.',)
# app.register_blueprint(api_bp)


app.config.SWAGGER_VALIDATOR_URL = "http://127.0.0.1:5000/validator"

api = Api(
    app,
    version="2.0.3",
    title="삼시카페 API",
    description="팀 삼시카페의 프로젝트 API 문서입니다.",
    contact="팀 연락처",
    license="3o'cafe license",
    license_url="/test-license-3o'cafe",
)


@api.route("/my-resource/<int:id>", methods=["GET", "POST"])
@api.response(200, "Found")
@api.response(404, "Not found")
@api.response(500, "Internal Error")
@api.doc(params={"id": "An ID"})
@api.param("id", "int value만 가능합니다.")
class MyResource(Resource):
    def get(self, id):
        return {}

    @api.response(403, "Not Authorized")
    def post(self, id):
        api.abort(403)


ns = api.namespace("custom", description="operations")


@ns.route("/hello")
@ns.response(200, "Found")
# @api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        # id,name,categories,restaurant_type,review_avg,lat,lng,phone,address,franchise_name
        # 247821,존스가마장작로스팅,"['분식', '피자양식', '고기구이']",food,4.5,36.9529819601772,126.429312444501,050712908121,충청남도 서산시 대산읍 대산리 441-1 대산리 441-1 나동1층,
        return {
            "store": "247821,존스가마장작로스팅,\"['분식', '피자양식', '고기구이']\",food,4.5,36.9529819601772,126.429312444501,050712908121,충청남도 서산시 대산읍 대산리 441-1 대산리 441-1 나동1층"
        }


ns = api.namespace("data", description="코로나 발생 건수 api")


@ns.route("/cov/<int:id>", methods=["GET"])
@ns.response(200, "Found")
@ns.response(404, "Not found")
@ns.response(500, "Internal Error")
@ns.param("id", "해당 데이터의 ID")
class Data(Resource):
    def get(self, id):
        con = sqlite3.connect("./coroanSeoul.db")  # 빈 .db파일 생성 또는 읽기
        cur = con.cursor()
        q = "select * from corona where id = ?"
        r = cur.execute(q, (str(id),))
        res = r.fetchone()
        print(res)
        cur.close()
        return {"rsc": res}


ns = api.namespace("data", description="배달건수 현황 api")


@ns.route("/deliver/<int:id>", methods=["GET"])
@ns.response(200, "Found")
@ns.response(404, "Not found")
@ns.response(500, "Internal Error")
@ns.param("id", "해당 데이터의 ID")
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


if __name__ == "__main__":
    app.run(debug=True)

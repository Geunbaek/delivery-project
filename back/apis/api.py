from flask import Flask, Blueprint
from flask_restx import Resource, Api, apidoc, Namespace


test_api = Namespace("test_api", description="flask-restx 참조용 api")


@test_api.route("/my-resource/<int:id>", methods=["GET", "POST"])
@test_api.response(200, "Found")
@test_api.response(404, "Not found")
@test_api.response(500, "Internal Error")
@test_api.doc(params={"id": "An ID"})
@test_api.param("id", "int value만 가능합니다.")
class MyResource(Resource):
    def get(self, id):
        return {}

    @test_api.response(403, "Not Authorized")
    def post(self, id):
        test_api.abort(403)


hello = Namespace("hello", description="operations")


@hello.route("/hello")
@hello.response(200, "Found")
# @api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {
            "store": "247821,존스가마장작로스팅,\"['분식', '피자양식', '고기구이']\",food,4.5,36.9529819601772,126.429312444501,050712908121,충청남도 서산시 대산읍 대산리 441-1 대산리 441-1 나동1층"
        }


if __name__ == "__main__":
    app.run(debug=True)

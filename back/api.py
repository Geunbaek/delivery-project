from flask import Flask, Blueprint
from flask_restx import Resource, Api, apidoc

app = Flask(__name__)

app.config.SWAGGER_UI_DOC_EXPANSION = 'list' # 펼쳐짐
app.config.SWAGGER_UI_OPERATION_ID = True
app.config.SWAGGER_UI_REQUEST_DURATION = True
app.config.SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get"] # Try it out 제공 

api_bp = Blueprint('api', __name__, url_prefix='/api')
# api = Api(api_bp, doc='/doc/',version='2.0.3', title='삼시카페 API',
#     description='팀 삼시카페의 프로젝트 API 문서입니다.',)
# app.register_blueprint(api_bp)


app.config.SWAGGER_VALIDATOR_URL = 'http://127.0.0.1:5000/validator'

api = Api(
  app, 
  version='2.0.3', 
  title='삼시카페 API',
  description='팀 삼시카페의 프로젝트 API 문서입니다.',
  contact="팀 연락처",
  license="3o'cafe license",
  license_url="/test-license-3o'cafe"

)



@api.route('/my-resource/<int:id>', methods=['GET','POST'])
@api.response(200, 'Found')
@api.response(404, 'Not found')
@api.response(500, 'Internal Error')
@api.doc(params={'id': 'An ID'})
@api.param('id', 'int value만 가능합니다.')
class MyResource(Resource):
   
    def get(self, id):
        return {}

    @api.response(403, 'Not Authorized')
    def post(self, id):
        api.abort(403)

ns = api.namespace('custom', description='operations')

@ns.route('/hello')
@ns.response(200, 'Found')      
#@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

if __name__ == '__main__':
    app.run(debug=True)

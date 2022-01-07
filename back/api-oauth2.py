from flask import Flask, Blueprint
from flask_restx import Resource, Api, apidoc

app = Flask(__name__)

app.config.SWAGGER_UI_OAUTH_CLIENT_ID = 'MyClientId'
app.config.SWAGGER_UI_OAUTH_REALM = '-'
app.config.SWAGGER_UI_OAUTH_APP_NAME = '삼시카페 앱 이름'
app.config.SWAGGER_UI_DOC_EXPANSION = 'list' # 펼쳐짐
app.config.SWAGGER_UI_OPERATION_ID = True
app.config.SWAGGER_UI_REQUEST_DURATION = True
app.config.SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get"]

api_bp = Blueprint('api', __name__, url_prefix='/api')
# api = Api(api_bp, doc='/doc/',version='2.0.3', title='삼시카페 API',
#     description='팀 삼시카페의 프로젝트 API 문서입니다.',)
# app.register_blueprint(api_bp)


app.config.SWAGGER_VALIDATOR_URL = 'http://127.0.0.1:5000/validator'

# api = Api(app, version='2.0.3', title='삼시카페 API',
#     description='팀 삼시카페의 프로젝트 API 문서입니다.',
# )

api = Api(
    app,
    version='2.0.3',
    description='팀 삼시카페의 프로젝트 API 문서입니다.',
    title=app.config.SWAGGER_UI_OAUTH_APP_NAME,
    security={'OAuth2': ['read', 'write']},
    authorizations={
        'OAuth2': {
            'type': 'oauth2',
            'flow': 'implicit',
            'authorizationUrl': 'https://idp.example.com/authorize?audience=https://app.example.com',
            'clientId': app.config.SWAGGER_UI_OAUTH_CLIENT_ID,
            'scopes': {
                'openid': 'Get ID token',
                'profile': 'Get identity',
            }
        }
    }
)


@api.route('/my-resource/<id>')
@api.doc(params={'id': 'An ID'})
class MyResource(Resource):
    def get(self, id):
        return {}

    @api.response(403, 'Not Authorized')
    def post(self, id):
        api.abort(403)
        
@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

if __name__ == '__main__':
    app.run(debug=True)

@api.documentation
def custom_ui():
    return apidoc.ui_for(api)

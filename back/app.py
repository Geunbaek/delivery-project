from flask import Flask
from flask_restx import Api, apidoc

from flask_cors import CORS
from flask_migrate import Migrate
from db_connect import db
import os
import dotenv

migrate = Migrate()


def create_app():

    app = Flask(
        __name__, instance_relative_config=True
    )  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.

    if app.config['ENV'] == 'development':
        env_file = '.env.example'
    else: # 'production'
        env_file = '.env'
    dotenv.load_dotenv(env_file)

    DATABASE_URI = (
        f"mysql+pymysql://{os.environ.get('MYSQL_USER')}:{os.environ.get('MYSQL_PASSWORD')}@"
        f"{os.environ.get('MYSQL_HOST')}:{os.environ.get('MYSQL_PORT')}"
        f"/{os.environ.get('MYSQL_DATABASE')}?charset=utf8mb4"
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
    app.secret_key = os.getenv('SECRET_KEY')
    
    # 아래 설정 확인용 코드는 2022년 1월 5일 화요일 전후 삭제 예정
    print(f'본인이 설정한 값들 설정 잘됐는지 아래 print()에서 확인하세요')
    print(f'DATABASE_URI = {DATABASE_URI}')

    CORS(app)

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)
    from models import Model

    from apis.api import test_api, hello
    from apis.corona import cov, recommendStore

    app.config.SWAGGER_UI_DOC_EXPANSION = "list"  # 펼쳐짐
    app.config.SWAGGER_UI_OPERATION_ID = True
    app.config.SWAGGER_UI_REQUEST_DURATION = True
    app.config.SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get"]  # Try it out 제공
    app.config['RESTX_MASK_SWAGGER'] = False

    # api_bp = Blueprint("api", __name__, url_prefix="/api")
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

    api.add_namespace(cov)
    api.add_namespace(recommendStore)
    api.add_namespace(hello)
    api.add_namespace(test_api)

    return app



if __name__ == "__main__":
    create_app().run(host='0.0.0.0')

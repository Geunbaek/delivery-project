# flask
from flask import Flask
from flask_migrate import Migrate
from model.db_connect import db
import model.load_dcount 

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    migrate.init_app(app, db)
    with app.app_context():
        db.init_app(app)
    return app

app = create_app()
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:duddlf@127.0.0.1:3306/corona_web"
model.load_dcount.put_data()

from flask import Flask
from db_connect import db
import load_dcount 

def create_app():
    app = Flask(__name__)
    with app.app_context():
        db.init_app(app)
    return app

app = create_app()
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:duddlf@127.0.0.1:3306/corona_web"
load_dcount.put_data()
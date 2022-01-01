SQLALCHEMY_TRACK_MODIFICATIONS = False


db = {
    "user": "team3",
    "password": "team3",
    "host": "db",
    "port": 3306,
    "database": "corona_web",
}

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{db['user']}:{db['password']}@"
    f"{db['host']}:{db['port']}/{db['database']}?charset=utf8mb4"
)

SECRET_KEY = "dev"

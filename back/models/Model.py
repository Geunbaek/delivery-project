from db_connect import db
from datetime import date, datetime


class Patient(db.Model):
    __tablename__ = "patient"
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    gu = db.Column(db.String(20), nullable=False)
    patient_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, patient_count):
        self.date = date
        self.gu = gu
        self.patient_count = patient_count

    def as_dict(self):
        res = {}
        for c in self.__table__.columns:
            if c.name == 'date':
                res[c.name] = str(getattr(self, c.name))
            else:
                res[c.name] = getattr(self, c.name)
        return res


class DeliverCount(db.Model):
    __tablename__ = 'delivercount'
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    gu = db.Column(db.String(10), nullable=False)
    dong = db.Column(db.String(12), nullable=False)
    deliver_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, dong, deliver_count):
        self.date = date
        self.gu = gu
        self.dong = dong
        self.deliver_count = deliver_count

    def as_dict(self):
        res = {}
        for c in self.__table__.columns:
            if c.name == 'date':
                res[c.name] = str(getattr(self, c.name))
            else:
                res[c.name] = getattr(self, c.name)
        return res


class PatientDelivery(db.Model):
    __tablename__ = 'patientdelivery'
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    date = db.Column(db.Date, nullable=False)
    gu = db.Column(db.String(20), nullable=False)
    deliver_count = db.Column(db.Integer, nullable=False)
    patient_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, deliver_count, patient_count):
        self.date = date
        self.gu = gu
        self.deliver_count = deliver_count
        self.patient_count = patient_count

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class FoodHour(db.Model):
    __tablename__ = "foodhour"
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    day = db.Column(db.String(10), nullable=False)
    hour = db.Column(db.Integer, nullable=False)
    food = db.Column(db.String(20), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    weather = db.Column(db.String(10), nullable=False)

    def __init__(self, date, day, hour, food, count, weather):
        self.date = date
        self.day = day
        self.hour = hour
        self.food = food
        self.count = count
        self.weather = weather

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class YogiyoStore(db.Model):
    __tablename__ = "yogiyostore"
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    sid = db.Column(db.Integer)
    name = db.Column(db.String(50), nullable=False)
    categories = db.Column(db.String(50), nullable=False)
    review_avg = db.Column(db.Float, nullable=False)
    lat = db.Column(db.String(20), nullable=False)
    lng = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(15), nullable=True, default='-')
    address = db.Column(db.String(100), nullable=False)
    logo_url = db.Column(db.String(130), nullable=False)

    def __init__(self, sid, name, categories, review_avg, lat, lng, phone, address, logo_url):
        self.sid = sid
        self.name = name
        self.categories = categories
        self.review_avg = review_avg
        self.lat = lat
        self.lng = lng
        self.phone = phone
        self.address = address
        self.logo_url = logo_url

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class WeatherByHour(db.Model):
    __tablename__ = "weatherbyhour"
    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    hour = db.Column(db.String(3), nullable=False, unique=True)
    weather = db.Column(db.String(10), nullable=False)

    def __init__(self, hour, weather):
        self.hour = hour
        self.weather = weather

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

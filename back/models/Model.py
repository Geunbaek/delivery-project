from db_connect import db
from datetime import date, datetime


class Patient(db.Model):
    __tablename__ = "patient"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    gu = db.Column(db.String(20), nullable=False)
    patient_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, patient_count):
        self.date = date
        self.gu = gu
        self.patient_count = patient_count
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class DeliverCount(db.Model):
    __tablename__ = 'delivercount'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    gu = db.Column(db.String(10), nullable=False)
    dong = db.Column(db.String(12), nullable=False)
    delivery_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, dong, delivery_count):
        self.date = date
        self.gu = gu
        self.dong = dong
        self.delivery_count = delivery_count

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class PatientDeliver(db.Model):
    __tablename__ = 'patientdeliver'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
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
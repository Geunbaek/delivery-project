from db_connect import db
from datetime import date, datetime


class Patient(db.Model):
    __tablename__ = "patient"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    gu = db.Column(db.String(10), nullable=False)
    patient_count = db.Column(db.Integer, nullable=False)

    def __init__(self, date, gu, patient_count):
        self.date = date
        self.gu = gu
        self.patient_count = patient_count

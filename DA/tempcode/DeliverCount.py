from db_connect import db

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

from datetime import date
from flask_restx import Namespace, fields


class DateFormat(fields.Raw):
    def format(self, value):
        if len(str(value)) > 7:
            print(value)
            return date.strftime(value, "%Y-%m-%d")
        else:
            return value


class CovDto:
    api = Namespace("cov", description="코로나 발생 건수 api")
    patient_model = api.model(
        "patient_model",
        {
            "id": fields.Integer(readonly=True, description='아이디'),
            "gu": fields.String(readonly=True, description='지역 (구)'),
            "date": DateFormat(),
            "patient_count": fields.Integer,
        },
    )

    delivery_model = api.model(
        "delivery_model",
        {
            "id": fields.Integer,
            "gu": fields.String,
            "dong": fields.String,
            "date": DateFormat(),
            "deliver_count": fields.Integer,
        },
    )

    patient_delivery_model = api.model('patient_delivery_model', {
        'patients': fields.List(fields.Nested(patient_model)),
        'deliveries': fields.List(fields.Nested(delivery_model)),
    })


class RecommendStoreDto:
    api = Namespace("store", description="음식점 api")
    store_model = api.model(
        "store_model",
        {
            "id": fields.Integer,
            "name": fields.String,
            "categories": fields.String,
            "review_avg": fields.String,
            "lat": fields.String,
            "lng": fields.String,
            "phone": fields.String,
            "address": fields.String,
            "score": fields.Integer
        },
    )

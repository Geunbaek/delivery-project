from datetime import date
from flask_restx import Namespace, fields


class DateFormat(fields.Raw):
    def format(self, value):
        return date.strftime(value, "%Y-%m-%d")


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


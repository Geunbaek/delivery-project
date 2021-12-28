from datetime import date
from flask_restx import  Namespace,fields

class DateFormat(fields.Raw):
    def format(self, value):
        return date.strftime(value, "%Y-%m-%d")

# ns = api.namespace("data", description="코로나 발생 건수 api")

class CoronaDto:
    api = Namespace("corona_cnt", description="코로나 발생 건수 api")
    pamo = api.model('pamo', {
      'id': fields.Integer,
      'gu': fields.String,
      'date': DateFormat(),
      'patient_count': fields.Integer
    })

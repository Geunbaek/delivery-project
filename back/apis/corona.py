from flask import jsonify, request
from flask_restx import Resource
from db_connect import db
from models.Model import Patient, DeliverCount
from dto.coronaDto import CovDto

cov = CovDto.api

@cov.route("/patient", methods=["GET"])
@cov.response(200, "Found")
@cov.response(404, "Not found")
@cov.response(500, "Internal Error")
# @corona_cnt.param("id", "해당 데이터의 ID")
class Cov(Resource):
    @cov.marshal_with(CovDto.patient_model, envelope="data")
    def get(self):
        '''코로나 확진자 수 데이터 얻기'''
        patients = db.session.query(Patient).all()
        return patients

@cov.route("/delivery", methods=["GET"])
@cov.response(200, "Found")
@cov.response(404, "Not found")
@cov.response(500, "Internal Error")
class Delivery(Resource):
    @cov.marshal_with(CovDto.delivery_model, envelope="data")
    def get(self):
        '''배달 건수 데이터 얻기'''
        deliveries = DeliverCount.query.all()
        return deliveries

@cov.route("/patient-delivery", methods=["GET"])
@cov.response(200, "Found")
@cov.response(404, "Not found")
@cov.response(500, "Internal Error")
class Patient_Delivery(Resource):
    def get(self):
        '''코로나 확진자 수와 배달 건수 데이터 얻기'''
        # http://127.0.0.1:5000/cov/patient-delivery?unit=month또는day?startdate=2020-01-01&enddate=2020-02-15
        unit: str = request.args.get('unit', None)
        startdate: str = request.args.get('startdate', None)
        enddate: str = request.args.get('enddate', None)
        print(f'unit={unit}, startdate={startdate}, enddate={enddate}')

        
        if unit == 'day':
            patients_q = Patient.query.filter(Patient.date >= startdate, Patient.date <= enddate).all()
            patients = [item.as_dict() for item in patients_q]

            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= startdate, DeliverCount.date <= enddate).all()
            deliveries = [item.as_dict() for item in deliveries_q]
        elif unit == "month":
            patients_q = Patient.query.filter(Patient.date >= startdate, Patient.date <= enddate).all()
            patients = sumby_month(patients_q)

            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= str(startdate), DeliverCount.date <= str(enddate)).all()
            deliveries = sumby_month(deliveries_q)
        else: # 파라미터 없이 /cov/patient-delivery 로만 요청 받았을 때 전부 전달
            patients_q = Patient.query.all()
            patients = [item.as_dict() for item in patients_q]

            deliveries_q = DeliverCount.query.all()
            deliveries = [item.as_dict() for item in deliveries_q]
            

        return jsonify( dict(data = dict(patients=patients, deliveries=deliveries)) )
        

def sumby_month(queryObject):
    '''월별로 코로나확진자수나 배달건수 합산해주는 함수'''
    new_patient = queryObject[0].as_dict().copy()
    pre_month = new_patient['date'][:7] # '2020-01-15'에서 2020-01 월 까지만 저장
    new_patient['date'] = pre_month
    if type(queryObject[0]) == Patient:
        count_key_name = 'patient_count'
    else: # DeliverCount
        count_key_name = 'deliver_count'
    result = []
    length = len(queryObject)
    for i in range(1, length):
        cur_patient = queryObject[i].as_dict()
        cur_month = cur_patient['date'][:7]
        
        if pre_month == cur_month:
            # 월별로 코로나확진자/배달건 수를 합산     
            new_patient[count_key_name] += cur_patient[count_key_name]
        else: # pre_month != cur_month:
            result.append(new_patient)
            new_patient = cur_patient.copy()
            pre_month = cur_month
            new_patient['date'] = cur_month
    # 범위의 마지막 달 추가
    result.append(new_patient)

    return result
# Standard library imports
import time,datetime
from math import radians, cos, sin, asin, sqrt
# Third party imports
from flask import jsonify, request
from flask_restx import Resource
from flask_restx.fields import Float
from sqlalchemy import func, Numeric
from sqlalchemy.orm import aliased
from haversine import haversine

# Local application imports
from db_connect import db
from models.Model import Patient, DeliverCount, YogiyoStore,FoodHour
from dto.coronaDto import CovDto, RecommendStoreDto


cov = CovDto.api
recommendStore = RecommendStoreDto.api

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

parser = cov.parser()
#parser.add_argument('unit', type=str, help='day', location='args', default='month', required=True)
parser.add_argument('unit', type=str, help='day, month, none', location='args')
parser.add_argument('startdate', type=str, help='시작날짜', location='args')
parser.add_argument('enddate', type=str, help='종료날짜', location='args')
@cov.route("/patient-delivery", methods=["GET"])
@cov.doc(parser=parser)
@cov.response(200, "Found")
@cov.response(404, "Not found")
@cov.response(500, "Internal Error")
class PatientDelivery(Resource):
    @cov.marshal_with(CovDto.patient_delivery_model, envelope="data")
    @cov.expect(parser)
    def get(self):
        '''코로나 확진자 수와 배달 건수 데이터 얻기'''
        # http://127.0.0.1:5000/cov/patient-delivery?unit=month또는day?startdate=2020-01-01&enddate=2020-02-15
        #unit: str = request.args.get('unit', None)
        #startdate: str = request.args.get('startdate', None)
        #enddate: str = request.args.get('enddate', None)
        args = parser.parse_args()
        unit = args['unit']
        startdate = args['startdate']
        enddate = args['enddate']
        print(f'unit={unit}, startdate={startdate}, enddate={enddate}')

        
        if unit == 'day':
            start = time.time()
            '''
            patients_q = Patient.query.filter(Patient.date >= startdate, Patient.date <= enddate).all()
            patients = [item.as_dict() for item in patients_q]
            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= startdate, DeliverCount.date <= enddate).all()
            deliveries = [item.as_dict() for item in deliveries_q]
            '''
            
            patients_q = Patient.query.filter(Patient.date >= startdate, Patient.date <= enddate).all()
            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= startdate, DeliverCount.date <= enddate).all()
  
            end = time.time()
            print(end-start)
        elif unit == "month":
            
            start = time.time()

            '''
            patients_q = Patient.query.filter(Patient.date >= startdate, Patient.date <= enddate).all()
            patients = sumby_month(patients_q)
            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= str(startdate), DeliverCount.date <= str(enddate)).all()
            deliveries = sumby_month(deliveries_q)
            '''

            patients_q = db.session.query(Patient.id, Patient.gu ,func.sum(Patient.patient_count).label('patient_count'), func.date_format(Patient.date,'%Y-%m').label('date')).filter(Patient.date >= startdate, Patient.date <= enddate).group_by(func.date_format(Patient.date,'%Y-%m').label('date')).all()
            deliveries_q = db.session.query(DeliverCount.id, DeliverCount.gu,DeliverCount.dong,func.sum(DeliverCount.deliver_count).label('deliver_count'),func.date_format(DeliverCount.date,'%Y-%m').label('date')).filter(DeliverCount.date >= startdate, DeliverCount.date <= enddate).group_by(func.date_format(DeliverCount.date,'%Y-%m')).all()

            end = time.time()
            print(end-start)
        else: # 파라미터 없이 /cov/patient-delivery 로만 요청 받았을 때 전부 전달

            '''
            patients_q = Patient.query.all()
            patients = [item.as_dict() for item in patients_q]
            deliveries_q = DeliverCount.query.all()
            deliveries = [item.as_dict() for item in deliveries_q]
            '''
            patients_q = Patient.query.all()
            deliveries_q = DeliverCount.query.all()

        #return jsonify( dict(data = dict(patients=patients, deliveries=deliveries)) )
        res = {'patients':patients_q,'deliveries':deliveries_q}
        return res



storeParser = recommendStore.parser()
storeParser.add_argument('lat', type=float, help='위도', location='args')
storeParser.add_argument('lng', type=float, help='경도', location='args')
@recommendStore.route("/recommend-store", methods=["GET"])
@recommendStore.doc(parser=storeParser)
@recommendStore.response(200, "Found")
@recommendStore.response(404, "Not found")
@recommendStore.response(500, "Internal Error")
class RecommendStore(Resource):
    @recommendStore.marshal_with(RecommendStoreDto.store_model, envelope="data")
    @recommendStore.expect(storeParser)
    def get(self):
        '''추천 음식점 데이터 얻기'''
      
        args = storeParser.parse_args()
        lat = args['lat']
        lng = args['lng']
        
        print(f'lat={lat}, lng={lng}')

        '''
        user_location = (lat, lng)
        queryObject = db.session.query(YogiyoStore).all()
        result = []
        for i in range(0, len(queryObject)):
          new_s = queryObject[i].as_dict().copy()
          
          if haversine(user_location, (float(new_s['lat']),float(new_s['lng'])), unit = 'km') <= 3:
            result.append(new_s)
        
        
        return result 
        '''
        nearby_store = YogiyoStore.query.filter(
          func.acos(
            func.sin(func.radians(lat)) * func.sin(func.radians(YogiyoStore.lat)) + 
            func.cos(func.radians(lat)) * func.cos(func.radians(YogiyoStore.lat)) * 
            func.cos(func.radians(YogiyoStore.lng) - (func.radians(lng)))
            ) * 6371 <= 3).all()
        return nearby_store
       

"""
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
"""

def get_menu():
    '''시간 별로 가장 많이 시킨 배달 음식 추천'''
    curr_date = datetime.datetime.now()
    curr_hour = int(curr_date.strftime("%H"))
    new_food = db.session.query(FoodHour).filter(FoodHour.hour == curr_hour).all()
    result = {}
    for i in range(len(new_food)):
        try:
            result[new_food[i].food] += new_food[i].count
        except:
            result[new_food[i].food] = new_food[i].count
    return max(result)
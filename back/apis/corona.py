# Standard library imports

import time
import datetime
import random
import requests
import json
# Third party imports
from flask import jsonify, request
from flask_restx import Resource
from sqlalchemy import func, case, desc, literal_column
# Local application imports
from db_connect import db
from models.Model import Patient, DeliverCount, YogiyoStore, FoodHour
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
# parser.add_argument('unit', type=str, help='day', location='args', default='month', required=True)
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
        # unit: str = request.args.get('unit', None)
        # startdate: str = request.args.get('startdate', None)
        # enddate: str = request.args.get('enddate', None)
        args = parser.parse_args()
        unit = args['unit']
        startdate = args['startdate']
        enddate = args['enddate']
        print(f'unit={unit}, startdate={startdate}, enddate={enddate}')

        if unit == 'day':
            start = time.time()
            '''
            patients_q = Patient.query.filter(
                Patient.date >= startdate, Patient.date <= enddate).all()
            patients = [item.as_dict() for item in patients_q]
            deliveries_q = DeliverCount.query.filter(
                DeliverCount.date >= startdate, DeliverCount.date <= enddate).all()
            deliveries = [item.as_dict() for item in deliveries_q]
            '''

            patients_q = Patient.query.filter(
                Patient.date >= startdate, Patient.date <= enddate).all()
            deliveries_q = DeliverCount.query.filter(
                DeliverCount.date >= startdate, DeliverCount.date <= enddate).all()

            end = time.time()
            print(end-start)
        elif unit == "month":

            start = time.time()

            '''
            patients_q = Patient.query.filter(
                Patient.date >= startdate, Patient.date <= enddate).all()
            patients = sumby_month(patients_q)
            deliveries_q = DeliverCount.query.filter(DeliverCount.date >= str(
                startdate), DeliverCount.date <= str(enddate)).all()
            deliveries = sumby_month(deliveries_q)
            '''

            patients_q = db.session.query(Patient.id, Patient.gu, func.sum(Patient.patient_count).label('patient_count'), func.date_format(
                Patient.date, '%Y-%m').label('date')).filter(Patient.date >= startdate, Patient.date <= enddate).group_by(func.date_format(Patient.date, '%Y-%m').label('date')).all()
            deliveries_q = db.session.query(DeliverCount.id, DeliverCount.gu, DeliverCount.dong, func.sum(DeliverCount.deliver_count).label('deliver_count'), func.date_format(
                DeliverCount.date, '%Y-%m').label('date')).filter(DeliverCount.date >= startdate, DeliverCount.date <= enddate).group_by(func.date_format(DeliverCount.date, '%Y-%m')).all()

            end = time.time()
            print(end-start)
        else:  # 파라미터 없이 /cov/patient-delivery 로만 요청 받았을 때 전부 전달

            '''
            patients_q = Patient.query.all()
            patients = [item.as_dict() for item in patients_q]
            deliveries_q = DeliverCount.query.all()
            deliveries = [item.as_dict() for item in deliveries_q]
            '''
            patients_q = Patient.query.all()
            deliveries_q = DeliverCount.query.all()

        # return jsonify( dict(data = dict(patients=patients, deliveries=deliveries)) )
        res = {'patients': patients_q, 'deliveries': deliveries_q}
        return res


storeParser = recommendStore.parser()
storeParser.add_argument('lat', type=float, help='위도', location='args')
storeParser.add_argument('lng', type=float, help='경도', location='args')
storeParser.add_argument('dislikefood', type=str,
                         help='싫어하는 음식 한식, 한식|분식', location='args')
storeParser.add_argument('likefood', type=str,
                         help='좋아하는 음식 한식, 중식|치킨', location='args')


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

        # 프론트에서 넘어온 파라미터를 변수에 담음
        args = storeParser.parse_args()

        lat = args['lat']  # 위도
        lng = args['lng']  # 경도
        dislikefood = args['dislikefood']  # 싫어하는 음식
        likefood = args['likefood']  # 선호하는 음식

        print(
            f'lat={lat}, lng={lng}, dislikefood={dislikefood}, likefood={likefood}')

        # sqlalchemy query와 filter에 들어갈 각각의 변수 선언
        sub_queries = ""
        sub_filters = []

        # 현재시간 반영여부
        cur_time = True

        #review_q = "case([(YogiyoStore.review_avg >= 4.9, 100),(YogiyoStore.review_avg >= 4.7, 90),(YogiyoStore.review_avg >= 4.5, 80)], else_=50)*0.3"

        # 리뷰평점은 무조건 반영이라 if문에 안넣음
        review_q = "(CASE	when review_avg >= 4.9 then 100 when review_avg >= 4.7 then 90 when review_avg >= 4.5 then 80 else 50 END) * 0.3"
        # query에 들어갈 변수에 리뷰평점 쿼리문 추가
        sub_queries += review_q
        print(sub_queries)

        # 3km이내 음식점으로 데이터 좁히는 쿼리문
        nearby_q = func.acos(
            func.sin(func.radians(lat)) * func.sin(func.radians(YogiyoStore.lat)) +
            func.cos(func.radians(lat)) * func.cos(func.radians(YogiyoStore.lat)) *
            func.cos(func.radians(YogiyoStore.lng) - (func.radians(lng)))
        ) * 6371 <= 3
        # filter에 들어갈 변수에 위 쿼리문 추가
        sub_filters.append(nearby_q)

        # 싫어하는 음식이 있을때(파라미터 넘어왔을때)
        if dislikefood:
            # filter에 들어갈 변수에 위 쿼리문 추가, 들어온 파라미터를 | 기준으로 yogiyostore테이블의 카테고리에서 각각 찾아서 ''으로 치환한 다음에 카테코리가 공백이 아닌 데이터를 찾음
            sub_filters.append(func.regexp_replace(YogiyoStore.categories,
                                                   dislikefood, '') != "")
        # 현재시간 반영할때
        if cur_time:
            #sub_queries += "+ case([(YogiyoStore.categories.like('분식'), 100),(YogiyoStore.categories.like('치킨'), 90),(YogiyoStore.categories.like('피자'), 80)], else_=50)*0.3"
            # 현재시간 몇시인지 추출
            curr_hour = int(datetime.datetime.now().strftime("%H"))
            # FoodHour테이블에서 현재시간에 제일 많이 팔린 카테고리 1,2,3위 가져오는 쿼리문
            timerank = db.session.query(FoodHour.food, func.sum(FoodHour.count).label('total')).filter(
                FoodHour.hour == curr_hour).group_by(FoodHour.food).order_by(desc('total')).limit(3).all()
            print(timerank[0].food)
            # query에 들어갈 변수에 현재시간에 많이 팔린 음식 점수반영하는 쿼리문 추가
            # yogiyostore카테고리에 1위 카테고리가 있으면 100점, 2위카테고리는 90점, 3위 카테고리는 80점, 그외는 50점
            # 이 점수의 반영비율을 30%라 0.3을 곱함
            sub_queries += "+ (CASE when  categories like '%"+timerank[0].food+"%' then 100 when  categories like '%" + \
                timerank[1].food+"%' then 90 when  categories like '%" + \
                timerank[2].food+"%' then 80	else 50 END) * 0.2"

        # 선호음식이 있을때(파라미터 넘어왔을때)
        if likefood:
            #sub_queries += "+ case([(YogiyoStore.categories.op('regexp')(r'야식|피자|'), 100)], else_=50)*0.4"

            # query에 들어갈 변수에 선호하는 음식 점수반영하는 쿼리문 추가
            # 들어온 파라미터를 | 기준으로 yogiyostore테이블의 카테고리에서 각각 찾아서 있으면 100점 없으면 50점
            # 이 점수의 반영비율을 40%라 0.4을 곱함
            sub_queries += "+ (CASE	when categories REGEXP ('" + \
                likefood+"') then 100 else 50 END) * 0.3"

        weather = curr_weather()
        if weather:
            weatherrank = db.session.query(FoodHour.food, func.sum(FoodHour.count).label('total')).filter(
                FoodHour.weather == weather).group_by(FoodHour.food).order_by(desc('total')).all()
            print(weatherrank)
            sub_queries += "+ (CASE when  categories like '%"+weatherrank[0].food+"%' then 100 when  categories like '%" + \
                weatherrank[1].food+"%' then 90 when  categories like '%" + \
                weatherrank[2].food+"%' then 80	else 50 END) * 0.2"
        

        # sub_filters 와 sub_queries로 음식점 찾는 쿼리문
        recommend_store = db.session.query(YogiyoStore.id, YogiyoStore.name, YogiyoStore.categories, YogiyoStore.review_avg, YogiyoStore.lat, YogiyoStore.lng, YogiyoStore.phone, YogiyoStore.address, literal_column(sub_queries).label('score')).filter(*sub_filters).order_by(desc('score')).limit(100).all()
        
        # 랜덤으로 섞는 코드
        random.shuffle(recommend_store)

        return recommend_store


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

    new_food = db.session.query(FoodHour).filter(
        FoodHour.hour == curr_hour).all()

    result = {}
    for i in range(len(new_food)):
        try:
            result[new_food[i].food] += new_food[i].count
        except:
            result[new_food[i].food] = new_food[i].count

    return max(result)

def curr_weather():
    hr = datetime.datetime.now().strftime("%H")+'00'
    dt = datetime.datetime.now().strftime("%Y%m%d")

    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params ={'serviceKey' : '7fn3iG+xpyNJCYToaIb5rZczQEJzbiT31Uyhi/A93reJb0YXU9Kb6w3NEkQdWKnWSQJ6akKLyibDDW+Tw8Riag==', 
            'pageNo' : '1', 
            'numOfRows' : '1000', 
            'dataType' : 'JSON', 
            'base_date' : dt, 
            'base_time' : hr, 
            'nx' : '60', 
            'ny' : '127' 
            }

    response = requests.get(url, params=params)
    contents = response.text

    json_ob = json.loads(contents)

    body = json_ob['response']['body']['items']['item']

    weather = ''
    rain = float(body[0]['obsrValue'])
    temperature = float(body[4]['obsrValue'])

    if rain == 0:
        weather += '맑음'
    else:
        if rain == 1 or rain > 3:
            weather += '비옴'
        elif 1 < rain < 4:
            weather += '눈옴'
    if temperature >= 22:
        weather += ' 더움'
    elif 6 <= temperature < 22:
        weather += ' 선선'
    elif temperature < 6:
        weather += ' 추움'
    
    return weather
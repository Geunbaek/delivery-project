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
from models.Model import YogiyoStore, FoodHour
from dto.coronaDto import RecommendStoreDto

recommendStore = RecommendStoreDto.api

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
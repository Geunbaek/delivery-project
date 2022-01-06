import random
from flask import jsonify
from flask_restx import Resource, abort
from dto.coronaDto import StoreDto
from models.Model import YogiyoStore, FoodHour
from db_connect import db
from sqlalchemy import func
from datetime import datetime
from flask_restx import Namespace
from apis.util import getNearStore, getFoodKindRankByHour, getFoodKindRankByDay, getFoodKindRankByWeather


store = StoreDto.api

storeParser = store.parser()
storeParser.add_argument('lat', type=float, help='위도. (예) 37.5749351791722', location='args')
storeParser.add_argument('lng', type=float, help='경도. (예) 127.085789171262', location='args')
# storeParser.add_argument('dislikefood', type=str,
#                          help='싫어하는 음식: (예) 치킨, 한식, 한식|분식', location='args')
# storeParser.add_argument('likefood', type=str,
#                          help='좋아하는 음식: (예) 분식, 한식, 중식|치킨', location='args')


@store.route("/hourstore")
@store.doc(parser=storeParser)
@store.response(200, "성공적으로 수행 됨")
@store.response(400, "요청 정보 정확하지 않음")
@store.response(500, "API 서버에 문제가 발생하였음")
class HourStore(Resource):
  @store.marshal_with(StoreDto.store_model, envelope="data")
  @store.expect(storeParser)
  def get(self):
    '''현재 시간대 배달을 많이 시킨 음식 종류를 파는 주변 음식점 정보 얻기
       즉, 시간별 잘 팔린 음식 종류 분석 데이터와 주변 음식점 매칭
    '''
    args = storeParser.parse_args()
    # 디폴트 좌표값 : 강남구
    lat = args['lat'] if args['lat'] != None else 37.514575
    lng = args['lng'] if args['lat'] != None else 127.04955555555556
    if lat == None or lng == None:
        abort(400, msg='요청 정보 정확하지 않음.')
    
    # 요기요 테이블 시작 [[
    # 1. 평점으로 필터링
    avg_review_point = 4.5
    res_query = db.session.query(YogiyoStore).filter(YogiyoStore.review_avg >= avg_review_point)

    # 2. 거리 필터링
    res_query = getNearStore(res_query, lat, lng)
    # 요기요 테이블 끝 ]]

    # FoodHour 테이블
    # 3. 현재 시간대 잘 팔린 음식종류 순위 얻기
    hour_query = getFoodKindRankByHour(None)
    hour_foods = []
    for i in range(hour_query.count()):
        hour_foods.append(hour_query[i].food)
    hour_food_dict = {hour_query[0].hour: hour_foods}
    hour_key = hour_query[0].hour
    print('음식 종류', len(hour_foods), hour_foods) # 시간대 2, 3위 음식종류
    print('음식 종류', len(hour_foods), hour_food_dict) # 시간대 2, 3위 음식종류

    # 3. 현재 시간대 잘 팔린 음식종류 3위까지만 필터링
    regex = r'' + '|'.join(hour_foods[:3])
    result = res_query.filter(YogiyoStore.categories.op('regexp')(regex)).limit(20).all()

    random.shuffle(result)
    return result



@store.route("/dayweekstore")
@store.doc(parser=storeParser)
@store.response(200, "성공적으로 수행 됨")
@store.response(400, "요청 정보 정확하지 않음")
@store.response(500, "API 서버에 문제가 발생하였음")
class DayWeekStore(Resource):
  @store.marshal_with(StoreDto.store_model, envelope="data")
  @store.expect(storeParser)
  def get(self):
    '''현재 요일에 배달 건수 높은 음식 종류 파는 주변 음식점 정보
       즉, 요일별 배달이 많이 된 음식 종류 분석 데이터와 주변 음식점 매칭
    '''
    args = storeParser.parse_args()
    # 디폴트 좌표값 : 강남구
    lat = args['lat'] if args['lat'] != None else 37.514575
    lng = args['lng'] if args['lat'] != None else 127.04955555555556
    if lat == None or lng == None:
        abort(400, msg='요청 정보 정확하지 않음.')
    
    # 1. 평점으로 필터링
    avg_review_point = 4.5
    res_query = db.session.query(YogiyoStore).filter(YogiyoStore.review_avg >= avg_review_point)

    # 2. 거리 필터링
    res_query = getNearStore(res_query, lat, lng)
    # 요기요 테이블 끝

    # FoodHour 테이블
    # 현재 요일 배달 건수 높은 음식 종류 쿼리 얻기
    day_query = getFoodKindRankByDay(None)
    day_foods = []
    for i in range(day_query.count()):
        day_foods.append(day_query[i].food)
    day_food_dict = {day_query[0].day: day_foods}
    day_key = day_query[0].day
    print('음식 종류', len(day_foods), day_foods) # 시간대 2, 3위 음식종류
    print('음식 종류', len(day_foods), day_food_dict) # 시간대 2, 3위 음식종류

    # 3. 현재 시간대 잘 팔린 음식종류 3위까지만 필터링
    regex = r'' + '|'.join(day_foods[:4])
    result = res_query.filter(YogiyoStore.categories.op('regexp')(regex)).limit(20).all()

    random.shuffle(result)
    return result


@store.route("/starrating-store")
@store.doc(parser=storeParser)
@store.response(200, "성공적으로 수행 됨")
@store.response(400, "요청 정보 정확하지 않음")
@store.response(500, "API 서버에 문제가 발생하였음")
class StarRatingStore(Resource):
  @store.marshal_with(StoreDto.store_model, envelope="data")
  @store.expect(storeParser)
  def get(self):
    '''평점이 높은 주변 음식점 정보 얻기
    '''
    args = storeParser.parse_args()
    # 디폴트 좌표값 : 강남구
    lat = args['lat'] if args['lat'] != None else 37.514575
    lng = args['lng'] if args['lat'] != None else 127.04955555555556
    
    # 1. 평점으로 필터링
    avg_review_point = 4.3
    res_query = db.session.query(YogiyoStore).filter(YogiyoStore.review_avg >= avg_review_point)
    # 2. 거리 필터링
    res_query = getNearStore(res_query, lat, lng)
    # 3. Ordering
    result = res_query.order_by(YogiyoStore.review_avg.desc()).limit(20).all()

    random.shuffle(result)   
    return result





'''FoodHour 테이블 분석 데이터 관려 APIs'''
foodrank = Namespace("foodrank", description="데이터 분석 결과 리턴 APIs")

@foodrank.route("/hourly", methods=["GET"])
class HourFoodKindRank(Resource):
    def get(self):
        ''' 시간대별 배달 건수가 높은 음식 종류 얻기'''
        hour_query = getFoodKindRankByHour(None, True)
        fdict = {}
        for row in hour_query:
            fdict[row.hour] = fdict.setdefault(row.hour, [])
            fdict[row.hour].append(row.food)

        return jsonify(dict(data=[fdict]))


@foodrank.route("/dayofweek", methods=["GET"])
class DayFoodKindRank(Resource):
    def get(self):
        ''' 요일별 배달 건수가 높은 음식 종류 얻기'''
        day_query = getFoodKindRankByDay(None, True)
        fdict = {}
        for row in day_query:
            fdict[row.day] = fdict.setdefault(row.day, [])
            fdict[row.day].append(row.food)

        return jsonify(dict(data=[fdict]))


@foodrank.route("/wether", methods=["GET"])
class WeatherFoodKindRank(Resource):
    def get(self):
        ''' 날씨별 배달 건수가 높은 음식 종류 얻기'''
        weather_query = getFoodKindRankByWeather(None, True)
        fdict = {}
        for row in weather_query:
            fdict[row.weather] = fdict.setdefault(row.weather, [])
            fdict[row.weather].append(row.food)

        return jsonify(dict(data=[fdict]))

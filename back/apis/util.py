from sqlalchemy import func, desc
from models.Model import YogiyoStore, FoodHour
from db_connect import db
from datetime import datetime
from pytz import timezone
from apis.openApi import curr_weather

'''GPS 좌표상 가까운 거리 구하는 쿼리'''
def getNearStore(res_query, lat, lng):
    near_store = res_query.filter(
        func.acos(
        func.sin(func.radians(lat)) * func.sin(func.radians(YogiyoStore.lat)) + 
        func.cos(func.radians(lat)) * func.cos(func.radians(YogiyoStore.lat)) * 
        func.cos(func.radians(YogiyoStore.lng) - (func.radians(lng)))
        ) * 6371 <= 2)
    return near_store

'''시간대 별로 배달 건수 높은 음식 종류 쿼리 얻는 함수'''
def getFoodKindRankByHour(hour = None, getAll = False):
    query = db.session.query(FoodHour.hour, FoodHour.food, func.sum(FoodHour.count).label('cnt'))

    if getAll: # 모든 시간대 음식종류 랭킹 정보
        return query.group_by(FoodHour.hour, FoodHour.food).order_by(FoodHour.hour, desc('cnt'))
    
    if hour == None: # 현재 한국 시간
        curr_date = datetime.now(timezone('Asia/Seoul'))
        hour = int(curr_date.strftime("%H"))
    query = query.filter(FoodHour.hour == hour).group_by(FoodHour.hour, FoodHour.food).order_by(FoodHour.hour, desc('cnt'))
    return query

'''요일별로 배달 건수 높은 음식 종류 쿼리 얻는 함수'''
def getFoodKindRankByDay(day_of_week = None, getAll = False):
    query = db.session.query(FoodHour.day, FoodHour.food, func.sum(FoodHour.count).label('cnt'))

    if getAll: # 모든 시간대 음식종류 랭킹 정보
        return query.group_by(FoodHour.day, FoodHour.food).order_by(FoodHour.day, desc('cnt'))
    
    if day_of_week == None: # 현재 한국 시간
        curr_date = datetime.now(timezone('Asia/Seoul'))
        day = curr_date.strftime("%A")
    query = query.filter(FoodHour.day == day).group_by(FoodHour.day, FoodHour.food).order_by(FoodHour.day, desc('cnt'))
    return query

'''날씨별로 배달 건수 높은 음식 종류 쿼리 얻는 함수'''
def getFoodKindRankByWeather(weather = None, getAll = False):
    query = db.session.query(FoodHour.weather, FoodHour.food, func.sum(FoodHour.count).label('cnt'))

    if getAll: # 모든 시간대 음식종류 랭킹 정보
        return query.group_by(FoodHour.weather, FoodHour.food).order_by(FoodHour.weather, desc('cnt'))
    
    if weather == None: # 현재 한국 시간
        weather = curr_weather()
    query = query.filter(FoodHour.weather == weather).group_by(FoodHour.weather, FoodHour.food).order_by(FoodHour.weather, desc('cnt'))
    return query
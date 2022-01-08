import os
import dotenv
from apscheduler.schedulers.background import BackgroundScheduler
from flask_apscheduler import APScheduler
import time
import requests
import json

from datetime import datetime, timedelta
from pytz import timezone

#from db_connect import db
from models.Model import WeatherByHour
from apis import convert_to_grid  # 추가부분
import pymysql
import app
from db_connect import db
#scheduler = BackgroundScheduler()

scheduler = APScheduler()

# @scheduler.task('interval', id='update_data', hour=00, minute=00, seconds=10)
# @scheduler.task('cron', id='update_data', hour=0) # 12시마다, 즐겨찾기, 어드민 페이지(권한 실시간 변경)


# @scheduler.task('interval', id='update_weather',  seconds=20)
@scheduler.task('cron', id='update_weather', hour='0-23', minute='42-58/2')
def update_weather():
    try:
        print(os.environ.get('MYSQL_USER'))
        db = pymysql.connect(
            user=os.environ.get('MYSQL_USER'),
            passwd=os.environ.get('MYSQL_PASSWORD'),
            host=os.environ.get('MYSQL_HOST'),
            port=int(os.environ.get('MYSQL_PORT')),
            db=os.environ.get('MYSQL_DATABASE'),
            charset='utf8mb4'
        )
        cursor = db.cursor()

        print("스케줄 시작")
        print("*****")
        print(scheduler.app)
        # 좌표 변환
        nX, nY = convert_to_grid.get_grid(
            float(37.55289604835523), float(126.98825083712343))

        hour = (datetime.now(timezone('Asia/Seoul')) -
                timedelta(minutes=40)).strftime("%H")
        hr = int(hour)

        print(hr)

        if hr < 10:
            hr = "0" + str(hr) + "00"
        else:
            hr = str(hr)+"00"
        '''여기까지 추가부분'''
        print(hr)
        dt = datetime.now(timezone('Asia/Seoul')).strftime("%Y%m%d")
        if hr == '2300':
            dt = (datetime.now(timezone('Asia/Seoul')) -
                  timedelta(days=1)).strftime("%Y%m%d")
        print(dt)

        url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
        params = {'serviceKey': '7fn3iG+xpyNJCYToaIb5rZczQEJzbiT31Uyhi/A93reJb0YXU9Kb6w3NEkQdWKnWSQJ6akKLyibDDW+Tw8Riag==',
                  'pageNo': '1',
                  'numOfRows': '1000',
                  'dataType': 'JSON',
                  'base_date': dt,
                  'base_time': hr,
                  'nx': f'{nX}',
                  'ny': f'{nY}'
                  }

        response = requests.get(url, params=params, timeout=2)
        print(response)
        contents = (response.text).encode('utf-8')
        print(response.text)
        json_ob = json.loads(contents)

        body = json_ob['response']['body']['items']['item']

        weather = ''
        rain = float(body[0]['obsrValue'])
        temperature = float(body[4]['obsrValue'])

        if rain == 0:
            weather += '맑음'
        else:
            if rain == 1 or rain > 3:
                weather += '비'
            elif 1 < rain < 4:
                weather += '눈'

        if temperature >= 22:
            weather += ' 더움'
        elif 6 <= temperature < 22:
            weather += ' 선선'
        elif temperature < 6:
            weather += ' 추움'
        print(weather)

        # db.session.query(WeatherByHour).filter(WeatherByHour.hour == hour).update(
        #     {'weather': weather})
        # db.session.commit()

        cursor.execute(
            'UPDATE weatherbyhour SET weather = %s WHERE hour = %s',
            (weather, hour)
        )
        db.commit()
        db.close()
    except:
        print('스케줄 에러')


def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60) % 60


def init_scheduler(app):

    scheduler.api_enabled = True
    scheduler.init_app(app)
    scheduler.start()

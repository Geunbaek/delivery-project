import requests
import json

from datetime import datetime, timedelta
from pytz import timezone
from apis import convert_to_grid  # 추가부분

''' 현재 날씨 OpenAPI로 얻어옴 - 공공데이터 포털의 기상청 단기 예보 '''


def curr_weather(lat, lng):
    '''여기부터 추가부분'''
    # 좌표 변환
    nX, nY = convert_to_grid.get_grid(lat, lng)

    hr = int(datetime.now(timezone('Asia/Seoul')).strftime("%H"))

    # 진화님 코드
    # hr = datetime.now(timezone('Asia/Seoul')) - timedelta(minutes=40)
    # hr = hr.strftime("%H")+'00'


    hr -= 1
    if hr < 10:
        hr = "0" + str(hr) + "00"
    else:
        hr = str(hr)+"00"
    '''여기까지 추가부분'''

    dt = datetime.now(timezone('Asia/Seoul')).strftime("%Y%m%d")

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
            weather += '비'
        elif 1 < rain < 4:
            weather += '눈'
    if temperature >= 22:
        weather += ' 더움'
    elif 6 <= temperature < 22:
        weather += ' 선선'
    elif temperature < 6:
        weather += ' 추움'

    return weather


def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60) % 60

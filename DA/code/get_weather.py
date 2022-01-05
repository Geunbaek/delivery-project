import requests
import json
from datetime import datetime 

def curr_weather():
    hr = datetime.now().strftime("%H")+'00'
    dt = datetime.now().strftime("%Y%m%d")

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

print(curr_weather())
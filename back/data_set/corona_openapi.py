# 참고: https://kibua20.tistory.com/145 [모바일 SW 개발자가 운영하는 블로그]
import requests
import xmltodict 
import json 
import datetime 
def getCovidKR(end_day, start_day): 
  url='http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson' 
  #ServiceKey는 url decode 한 값임.
  payload = { 'ServiceKey': '...님꺼 넣으셈...', 'startCreateDt' : start_day, 'endCreateDt' : end_day, }
  
  res = requests.get(url, params=payload) 
  if (res.status_code == 200): 
    # Ordered dictionary type 리턴
    result = xmltodict.parse(res.text)

    #dictionlay type 으로 변경 작업
    covDict = json.loads(json.dumps(result))
    
    afterData = covDict['response']['body']['items']['item'][0]
    beforeData = covDict['response']['body']['items']['item'][1]

    # 특정 기간에 발생한 환자수 구하기
    print('누적 확진자:', afterData['decideCnt'])
    print('추가 확진자:', int(afterData['decideCnt']) - int(beforeData['decideCnt']))
    print('%s일 %s시 기준' %(afterData["stateDt"], afterData["stateTime"]))
  else: 
    print('res.status_code is NOT ok') 
    
if __name__ == "__main__":
  # 문제 있는 날짜 설정: 새벽에 하나의 데이터만 얻어와서 에러남.
  today = datetime.datetime.now() - datetime.timedelta(1)
  yesterday = today - datetime.timedelta(1)
  d1 = today.strftime("%Y%m%d")
  d2 = yesterday.strftime("%Y%m%d")
  getCovidKR(d1, d2)

# 참고: https://kibua20.tistory.com/145 [모바일 SW 개발자가 운영하는 블로그]
import requests
import xmltodict
import json
import sqlite3
from datetime import datetime, timedelta
from pytz import timezone


def getCovidKR(end_day, start_day):
    url = (
        "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"
    )
    # ServiceKey는 url decode 한 값임.
    payload = {
        "ServiceKey": "서비스키",
        "startCreateDt": start_day,
        "endCreateDt": end_day,
    }

    res = requests.get(url, params=payload)
    if res.status_code == 200:
        # result에 Ordered dictionary type 리턴
        result = xmltodict.parse(res.text)

        # dictionlay type 으로 변경 작업
        covDict = json.loads(json.dumps(result))

        # 특정 기간에 발생한 환자수 구하기
        afterData = covDict["response"]["body"]["items"]["item"][0]
        beforeData = covDict["response"]["body"]["items"]["item"][1]
        patient_cnt = int(afterData["decideCnt"]) - int(beforeData["decideCnt"])

        print("누적 확진자:", afterData["decideCnt"])
        print("추가 확진자:", patient_cnt)
        print("%s일 %s시 기준" % (afterData["stateDt"], afterData["stateTime"]))

        saveSqlDb(afterData["stateDt"], patient_cnt)
    else:
        print("res.status_code is NOT ok")


def createDb():
    try:
        with sqlite3.connect("./coronaPatientCnt.db") as con:  # 빈 .db파일 생성
            cur = con.cursor()
            # cur.execute('create table corona (id integer primary key autoincrement, days DATETIME, patient_cnt integer)')
            cur.execute(
                "create table corona (id integer primary key autoincrement, days integer, patient_cnt integer)"
            )
            con.commit()
    except:
        print("이미 .db 파일 있거나 테이블 생성 실패")


def saveSqlDb(date: int, patient_cnt: int):
    con = sqlite3.connect("coronaPatientCnt.db")  # .db파일 읽기
    cur = con.cursor()
    # yesterday = datetime.now() - timedelta(1)
    result = (date, patient_cnt)
    cur.execute("insert into corona(days, patient_cnt) values(?,?)", result)

    con.commit()
    con.close()


if __name__ == "__main__":
    createDb()

    # 문제 있는 날짜 설정 코드 대략 수정: 새벽에 하나의 데이터만 얻어와서 에러나서 수정
    today = datetime.now(timezone('Asia/Seoul')) - timedelta(20)
    yesterday = today - timedelta(1)
    d1 = today.strftime("%Y%m%d")
    d2 = yesterday.strftime("%Y%m%d")
    getCovidKR(d1, d2)

import sqlite3
from datetime import datetime, timedelta
import csv

# con = sqlite3.connect("./coroanSeoul.db")  # 빈 .db파일 생성 또는 읽기
# cur = con.cursor()
# cur.execute(
#     "create table corona (id integer primary key autoincrement, date text, region text)"
# )

# # csv 파일 읽기
# # 인코딩 문제시 encoding = ''에 utf-8 > euc-kr > cp949 순서로 해볼것
# with open("./back/data_set/서울시 코로나19 확진자 현황.csv") as data:
#     records = csv.DictReader(data)
#     # result = [ (c['id'], c['name'], c['categories'], c['restaurant_type'], c['review_avg'], c['lat'], c['lng'], c['phone'], c['address'], c['franchise_name'], f'https://i.ibb.co/{IMG_URLS[i]}/{i+1}.jpg' ) for i, c in enumerate(records)]
#     result = [(c["date"], c["region"]) for i, c in enumerate(records)]

# cur.executemany("insert into corona(date, region) values(?, ?);", result)

# con.commit()
# con.close()


con = sqlite3.connect("./coroanDeliverCnt.db")  # 빈 .db파일 생성 또는 읽기
cur = con.cursor()
cur.execute(
    "create table corona (id integer primary key autoincrement, date text, count integer, day text, region1 text, region2 text, cat text)"
)

with open("./back/data_set/시간대별 음식종류 배달건수 2020-07_2.csv") as data:
    records = csv.DictReader(data)
    result = [
        (c["date"], c["count"], c["day"], c["region1"], c["region2"], c["cat"])
        for i, c in enumerate(records)
    ]

cur.executemany(
    "insert into corona(date, count, day, region1, region2, cat) values(?,?,?,?,?,?);",
    result,
)

con.commit()
con.close()

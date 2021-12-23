import sqlite3
from datetime import datetime, timedelta
import csv

con = sqlite3.connect("./yogiyoDel.db") # 빈 .db파일 생성 또는 읽기
cur = con.cursor()
cur.execute('create table corona (id integer primary key autoincrement, name text, address text)')

# csv 파일 읽기
# 인코딩 문제시 encoding = ''에 utf-8 > euc-kr > cp949 순서로 해볼것
with open('./back/data_set/yogiyo_delivery4.csv', encoding="utf8") as data :
    records = csv.DictReader(data)
    # result = [ (c['id'], c['name'], c['categories'], c['restaurant_type'], c['review_avg'], c['lat'], c['lng'], c['phone'], c['address'], c['franchise_name'], f'https://i.ibb.co/{IMG_URLS[i]}/{i+1}.jpg' ) for i, c in enumerate(records)]
    result = [ (c['name'], c['address'] ) for i, c in enumerate(records)]

cur.executemany("insert into corona(name, address) values(?, ?);", result)

con.commit()
con.close()
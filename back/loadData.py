import csv
from random import randint
from datetime import date, datetime, timedelta, timezone
import pymysql


SQLALCHEMY_TRACK_MODIFICATIONS = False

db_connection = pymysql.connect(
    user    = "root",
    passwd  = "root",
    host    = "localhost",
    port    = 33060,
    db      = 'corona_web',
    charset = 'utf8mb4'
)


con = db_connection
cur = con.cursor(pymysql.cursors.DictCursor)
# cur.execute("CREATE TABLE book IF NOT EXISTS (id integer primary key auto_increment, book_name varchar(50), publisher varchar(30), author varchar(30), publication_date DATETIME, pages integer, isbn bigint(20), description text, link varchar(256));")

# csv 파일 읽기
# 인코딩 문제시 encoding = ''에 utf-8 > euc-kr > cp949 순서로 해볼것
with open('./data_set/seoul_patient_count.csv', encoding='utf-8-sig') as data :
    records = csv.DictReader(data)
    result = []
    # pdate = datetime.strptime(c['date'], '%Y-%m-%d').date()
    # result = [ c['id'], c['date'], c['gu'], c['patient_count'] for c in records]
    for c in records:
      result.append([c['date'], c['gu'], c['patient_count']])

# csv 파일 MysQL에 삽입
cur.executemany("insert into patient(date, gu, patient_count) values(%s, %s, %s)", result)


with open('./data_set/seoul_delivery_count_with_patient.csv', encoding='utf-8-sig') as data :
    
    records = csv.DictReader(data)
    result = []
    for c in records:
        result.append([c['date'], c['gu'], c['deliver_count'], c['patient_count']])

cur.executemany("insert into patientdelivery(date, gu, deliver_count, patient_count) values(%s, %s, %s, %s)", result)


with open('./data_set/seoul_deliver_count.csv', encoding='utf-8-sig') as data :
    records = csv.DictReader(data)
    result = []
    # pdate = datetime.strptime(c['date'], '%Y-%m-%d').date()
    # result = [ c['id'], c['date'], c['gu'], c['patient_count'] for c in records]
    for c in records:
      # print(records)
      result.append([c['date'], c['gu'], c['dong'],c['deliver_count']])

cur.executemany("insert into delivercount(date, gu, dong, deliver_count) values(%s, %s,%s, %s)", result)


with open('./data_set/food_weather.csv', encoding='utf-8-sig') as data :
    records = csv.DictReader(data)
    result = []
    # pdate = datetime.strptime(c['date'], '%Y-%m-%d').date()
    # result = [ c['id'], c['date'], c['gu'], c['patient_count'] for c in records]
    for c in records:
      # print(records)
      print(c)
      result.append([c['date'], c['day'], c['hour'], c['food'], c['count'], c['celsius(C)'], c['rain(mm)']])

# csv 파일 MysQL에 삽입
cur.executemany("insert into foodhour(date, day, hour, food, count, celsius, rain) values(%s, %s,%s, %s, %s, %s, %s)", result)

with open('./data_set/yogiyo_delivery_in_seoul.csv', encoding='utf-8-sig') as data :
    records = csv.DictReader(data)
    result = []
    # pdate = datetime.strptime(c['date'], '%Y-%m-%d').date()
    # result = [ c['id'], c['date'], c['gu'], c['patient_count'] for c in records]
    for c in records:
      # print(records)
      if c['phone'] == '':
          c['phone'] = '-'
      print(c)
      result.append([c['name'], c['categories'], c['review_avg'], c['lat'], c['lng'], c['phone'], c['address']])

# csv 파일 MysQL에 삽입
cur.executemany("insert into yogiyostore(name, categories, review_avg, lat, lng, phone, address) values(%s, %s,%s, %s, %s, %s, %s)", result)

con.commit()
con.close()
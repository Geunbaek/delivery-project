import csv
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
with open('../CSVs/food_weather.csv', encoding='utf-8-sig') as data :
    records = csv.DictReader(data)
    result = []
    # pdate = datetime.strptime(c['date'], '%Y-%m-%d').date()
    # result = [ c['id'], c['date'], c['gu'], c['patient_count'] for c in records]
    for c in records:
      # print(records)
      result.append([c['date'], c['day'], c['hour'], c['food']], c['celsius'], c['rain'])

# csv 파일 MysQL에 삽입
cur.executemany("insert into foodhour(date, day, hour, food, celsius, rain) values(%s, %s,%s, %s, %s, %s)", result)


con.commit()
con.close()

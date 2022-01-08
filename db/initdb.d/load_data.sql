-- csv 파일들은 프로젝트 폴더의 /db/data 폴더에 있어야, DBMS 컨테이너 안의 /var/lib/mysql 쪽에서 마운트/역참조 할수있다
-- docker-compose.yml 에 db 서비스의 volumes: 쪽에 디렉토리 지정되있음.
LOAD DATA INFILE './seoul_patient_count.csv' INTO TABLE patient FIELDS TERMINATED BY ',' (date, gu, patient_count);
LOAD DATA INFILE './seoul_deliver_count.csv' INTO TABLE delivercount FIELDS TERMINATED BY ',' (date, gu, dong, deliver_count);
LOAD DATA INFILE './seoul_delivery_count_with_patient.csv' INTO TABLE patientdelivery FIELDS TERMINATED BY ',' (date, gu, deliver_count, patient_count);
LOAD DATA INFILE './food_weather.csv' INTO TABLE foodhour FIELDS TERMINATED BY ',' (date, day, hour, food, count, weather);
LOAD DATA INFILE './yogiyo_delivery_in_seoul.csv' INTO TABLE yogiyostore FIELDS TERMINATED BY ',' (
  sid,
  name,
  categories,
  review_avg,
  lat,
  lng,
  phone,
  address,
  logo_url
);
INSERT INTO
  weatherbyhour (hour, weather)
VALUES
  ('00', NULL),('01', NULL),('02', NULL),('03', NULL),('04', NULL),('05', NULL),('06', NULL),('07', NULL),('08', NULL),('09', NULL),('10', NULL),('11', NULL),
  ('12', NULL),('13', NULL),('14', NULL),('15', NULL),('16', NULL),('17', NULL),('18', NULL),('19', NULL),('20', NULL),('21', NULL),('22', NULL),('23', NULL);
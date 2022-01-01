-- 이 폴더에 스크립트 파일이 여러 개 있다면 파일 이름의 사전순서대로 실행됩니다.

DROP DATABASE IF EXISTS corona_web;

CREATE DATABASE corona_web;
USE corona_web;


CREATE TABLE patient (
  id INTEGER AUTO_INCREMENT,
  date date NOT NULL,
  gu varchar(30) NOT NULL,
  patient_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE delivercount (
  id INTEGER AUTO_INCREMENT,
  date date NOT NULL,
  gu varchar(10) NOT NULL,
  dong varchar(12) NOT NULL,
  deliver_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE patientdelivery (
  id INTEGER AUTO_INCREMENT,
  date date NOT NULL,
  gu varchar(20) NOT NULL,
  deliver_count INTEGER NOT NULL,
  patient_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE foodhour (
  id INTEGER AUTO_INCREMENT,
  date date NOT NULL,
  day VARCHAR(10) NOT NULL,
  hour INTEGER NOT NULL,
  food VARCHAR(20) NOT NULL,
  count INTEGER NOT NULL,
  weather VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE yogiyostore (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  categories VARCHAR(50) NOT NULL,
  review_avg FLOAT NOT NULL,
  lat VARCHAR(20) NOT NULL,
  lng VARCHAR(20) NOT NULL,
  phone VARCHAR(15) DEFAULT '-',
  address VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

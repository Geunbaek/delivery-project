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
  gu varchar(30) NOT NULL,
  dong varchar(20) NOT NULL,
  deliver_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE patientdelivery (
  id INTEGER AUTO_INCREMENT,
  date date NOT NULL,
  gu varchar(30) NOT NULL,
  deliver_count INTEGER NOT NULL,
  patient_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);
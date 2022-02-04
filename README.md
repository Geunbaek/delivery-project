<img src="https://img.shields.io/badge/Pandas-E34F26?style=for-the-badge&logo=Pandas&logoColor=white"> <img src="https://img.shields.io/badge/React-00F?style=for-the-badge&logo=React&logoColor=blue"> <img src="https://img.shields.io/badge/Flask-000?style=for-the-badge&logo=Flask&logoColor=white"> <img alt="NGINX" src="https://img.shields.io/badge/NGINX-009639.svg?&amp;style=for-the-badge&amp;logo=NGINX&amp;logoColor=white" class="js-lazy-loaded qa-js-lazy-loaded" loading="lazy"> <img alt="MariaDB" src="https://img.shields.io/badge/Maria%20DB-1F305F.svg?&amp;style=for-the-badge&amp;logo=MariaDB&amp;logoColor=white" class="js-lazy-loaded qa-js-lazy-loaded" loading="lazy"> <img alt="Docker" src="https://img.shields.io/badge/Docker-ffff00.svg?&amp;style=for-the-badge&amp;logo=Docker&amp;logoColor=gray" class="js-lazy-loaded qa-js-lazy-loaded" loading="lazy">

# 코로나 배달 분석 웹 서비스@삼시카페팀

### - 코로나 시대 증가한  배달 수요에따라 배달 음식 점을 추천해주는 웹 서비스.   

### < [프로젝트 설치와 실행, 배포 방법 링크](InstallAndRun.md) >
<br>

## 0. 웹 서비스 구현 결과 화면
[삼시카페 링크](https://elice-second-project-team3.netlify.app/)
![SamsiCafe](https://kdt-gitlab.elice.io/003-part3-deliveryservice/team3/project-template/uploads/84a397cfc7af13cf2f5f244d5e980dee/SamsiCafe.gif)
## 1. 프로젝트 소개

코로나 확진자 수와 배달 건수가 유사하게 증가함을 분석해서 배달 수요가 증가했음을 파악.   
그에 따라 배달 음식 점을 추천하되 사용자 선택 피로를 줄여주기 위해   
사용자 입력 정보와 분석한 데이터 기반으로 배달 음식점을 추천해주는 웹 서비스.   
(머신러닝/딥러닝 추천알고리즘 아님)   

대한민국의 인구 1/5 가량이 서울에 거주, 배달수요도 활발하기때문에,   
가벼운 서비스를 기획해서 서울 지역으로 서비스 범위를 좁혔다


  - [UI 와이어프레임, 기획 링크](https://kdt-gitlab.elice.io/003-part3-deliveryservice/team3/project-template/-/wikis/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%ED%9A%8D)

<사용 데이터 셋>
- [서울시 코로나19 확진자 현황](https://data.seoul.go.kr/dataList/OA-20279/S/1/datasetView.do)
- ['시간-지역별 배달 주문건수' 링크](https://bdp.kt.co.kr/invoke/SOKBP2603/?goodsCode=KGUTIMEORDER)
- ['업종-지역별 배달 주문건수' (KT 통신 빅데이터 플랫폼)](https://bdp.kt.co.kr/invoke/SOKBP2603/?goodsCode=KGUINDTORDER)
- [기상청_단기예보 ((구)_동네예보) 조회서비스](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
- 요기요 크롤링
## 2. 프로젝트 목표

  - 배달 음식점을 보는데 너무 복잡하지 않나?
  - 배달 음식점을 적절히 추천/나열해 주나?
    - 사용자의 위치, 선호/비선호 음식종류, 음식점 평점, 시간대/(요일별)/날씨별 인기 음식점(배달건수)를 반영하여 음식점 나열

## 3. 프로젝트 구성도

  - 기술 스택
    - 데이터 분석 : Numpy, Pandas, Matplotlib, Seaborn, Google Colab, 크롤링, Open API, etc
    - FrontEnd : React, React-Redux, Redux-saga, Chart.js, Kakaomap, styled-component, etc
    - BackEnd : python3, Flask, flask-restx, MariaDB, flask-SqlAlchemy, Docker-compose, Swagger Rest Api Doc, Open API, etc
  - 배포 환경: MS Azure VM (Ubuntu 20.04, 엘리스측 제공)
  - 실행 환경: 
  ![Docker_compose_dev](/uploads/947aab1424cc6e92fdf92e8b8b3f3669/Docker_compose_dev.png)

## 4. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 박진화 | 팀장/백엔드 개발 |
| 김현주 | 백엔드 개발 |
| 박근백 | 프론트엔드 개발 |
| 김세현 | 데이터 분석 |
| 정재윤 | 데이터 분석 |

## 5. 버전
  - 0.1

# 코로나 배달 분석 웹 서비스@삼시카페팀

# [ 도커 컴포즈로 React, Flask, DB 한방에 설치&실행 시키기 ]
### (MariadDB에 테이블생성+데이터삽입, Nginx 설치&실행도 같이 됨)
[ 개발 환경 ]
 - 사전 조건: 윈도우일때 도커+WSL2(Ubuntu 20.04)가 설치되있어야 한다.
윈도우(10)에서 도커 설치는 WSL2 우분투에 하지말고 윈도우에 도커 설치해야 함.
아래 링크에서 우측의 'Get Docker Desktop' 누르면 윈도우용 설치파일 다운로드 됨.
https://hub.docker.com/editions/community/docker-ce-desktop-windows

 - DB, Flask 설정 변경하고 싶은때 (DB 계정/포트 정보, 그외 환경 변수 정보 ) 아래 파일 수정. 수정안하고 실행해도 됨
    - /back/.env.example (개발용. FLASK_ENV=development일 경우)
    - FLASK_ENV=production 일 경우 /back/.env 파일 사용
 - 프로젝트 루트 디렉토리를 커맨드창이나/터미널로 연다.
 - 프로젝트 루트에서 docker-compose up 를 치면 설치와 실행 준비가 된다.
 - 브라우저에 localhost:4000을 쳐서 첫화면 중간 즘에 그래프가 잘 출력되면 모든게 잘 설치, 실행된 것이다.
 - 실행 : 브라우져 주소 창에 아래 입력
    - 웹 서비스 : [http://localhost:4000](http://localhost:4000)
      - 웹 서비스 진입 포트 변경법 : docker-compose.yml파일 > frontend: > ports: > "4000:80"에서 4000부분을 80(운영서버)이나 3000 등으로 변경
    - 서버 REST API Swagger 문서 : [http://localhost:5000](http://localhost:5000)
      - 코로나 배달 분석 웹 서비스 REST API(Swagger) 문서입니다.\
            소스코드에서 문서를 관리하며,\
            문서 상에서 PostMan처럼 직접 API를 작동시키며 테스트 할 수 있습니다.
    - DBMS 접속 방법
      - MySQL Workbench 같은 GUI 툴이나 DB 도커컨테이너 안 터미널에서 mysql -u root -p 로 host: 127.0.0.1, port: 3306, user: root, pw: root 로 MYSQL_USER=team3, database: corona_web 설정하고 접속

 ### - MS Azure에 도커로 배포해 놓은거 확인하기
 - 웹 서비스 : [http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com](http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com)

 - 서버 REST API Swagger 문서 - [http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com:5000](http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com:5000)
 - 포트가 안열린건지 3306 포트로 DBMS에 현재 접근 할 수 없습니다.

 ### [ 주의 사항 ]
 - Flask 쪽 커밋시 주의 사항
    - /back/requirements.txt에 사용한 패키지 추가해야 함.
    - 꼭 필요한 것만 추가해야 이미지나 컨테이너 생성/실행시 빠르고 불필요한 충돌 없음.
    - 불필요한 패키지가 많이 설치된 가상환경 사용시 /back/requirements.txt에 필요한 패키지만 추려내서 추가하기 번거로울 수 있으므로, 가상 환경 새로 만들고 /back/requirements.txt의 패키지들 설치하고 필요한 패키지만 pip3 freeze > requirements.txt에 새로 추가할 것 권장.
 - CSV 파일 내용 DB에 삽입 방법
    - csv 파일 형식을 윈도우에서 사용하는 UTF-8(BOM) 형식말고 UTF-8형식으로 주셔야 함. UTF8 형식일때 새로운 (아래) 방식으로 데이터 넣을때 첫행 date 컬럼 날짜 데이터 하나가 '0000-00-00'으로 들어감. https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=fworld&logNo=220186597821
    - 한 컬럼에 쌍 따옴표("")랑 쉼표(,)  있으면 아래 LOAD DATA INFILE 명령으로 삽입 불가능. 아래처럼 수정하거나 다른 방법으로 삽입해야 함.
      - 이런 형식을 : "서울 양천구 신정동 1030-6 210호,211호"
      - 우측처럼 수정 ==> 서울 양천구 신정동 1030-6 210호 211호
      - ""(쌍따옴표) 안 ,(쉼표) 제거   2. 쌈따옴표도 제거

    - CSV파일에서 컬럼명들이 있는 첫행과 id가 있는 1열 자체를 삭제 해야 함. 아래 방식 사용해서 수정하면되지만, 원본 파일은 컬럼명이 있는게 데이터 식별에 좋으므로 원본 파일은 컬럼명 있는걸로 전달. id 열은 필요없으면 안넣고 주시면 됨.
      - VSCode의 확장 중 'Edit csv'를 설치 > VSCode에서 해당 파일 선택 > F1 키 누름 > csv로 검색 > 'CSV: Edit csv' 선택 > 일반 텍스트 파일 처럼 열려있던 csv 파일이 엑셀 비슷하게 표 형식으로 새 탭에 열림 > 컬럼명이 있는 1행의 좌측 '1'행 번호 클릭 > 휴지통 아이콘 클릭하여 1행 공간까지 전체 삭제 > id 들이 나열된 1열의 상단 'column 1' 클릭 > 휴지통 아이콘 클릭하여 1열 공간 제체를 삭제
    - 디비에 넣어야 할 모든 csv 파일들을(기존에 /db/data 에 있던 csv 파일들 포함) /db 폴더 아래 복사 > WSL2 우분투 터미널 상의 /db 폴더에서 'bash delAndCopyCsv.sh' 입력 후 엔터 (/db/data/ 아래 있는 모든 db 관련 데이터(DB에 이미 삽입된 데이터 포함) 삭제 후 새 csv 파일들을 /db/data/ 에 복사하는 작업을 함)
    - 데이터를 넣을 테이블 생성
      - /db/initdb.d/create_table.sql 에 테이블 생성용 SQL 쿼리를 작성(기 작성된 쿼리 참고)
      - /db/initdb.d/load_data.sql 에 csv파일 안의 데이터 삽입용 한 줄짜리 아래처럼 명령문 작성
      ```
      LOAD DATA INFILE './seoul_patient_count.csv' INTO TABLE patient FIELDS TERMINATED BY ',' (date, gu, patient_count);
      또는
      LOAD DATA INFILE './yogiyo_delivery_in_seoul.csv' INTO TABLE yogiyostore FIELDS TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY "\" (name, categories, review_avg, lat, lng, phone, address);
      ```
      - /db 에서 터미널로 bash delAndCopyCsv.sh 엔터쳐서 DB 파일들 삭제. 삭제해야 docker-compose up 입력했을때 자동으로 테이블 만들면서 데이터를 넣어줌.
      - 프로젝트 루트에서 터미널로 docker-compose up 엔터쳤을때 db관련 파일들이 없으면 테이블들 생성되고 데이터도 삽입된 후 웹서비스 실행 됨.


<br><br>
## [ 도커 사용안하고 Flask 서버 돌리는 방법 ]
    - /back/.env.example 파일에서 MYSQL_HOST=db 라고 되있는 부분을 MYSQL_HOST=localhost로 변경
    - 그외 로컬 DBMS의 정보로 수정
    - corona_web 이라는 database 생성 (이건 CLI를 이용하든 MySql WorkBench를 이용하든 수동으로 만드셔야 함)
### 데이터베이스 스키마 설정
빈 데이터 베이스에 테이블을 생성합니다.
```
cd back 또는 back 디렉토리에서 아래 명령 실행(back 상단의 루트 디렉토리에서 해도 될지도 모름;;)
flask db init
falsk db migrate
falsk db upgrade
* 디비 테이블의 속성 등을 변경시 위 명령 중 migrate, upgrade 만 하면됩니다.(단, 테이블의 데이터가 없을시 가능 할 듯 함)
```

### 초기 데이터 로딩
사전에 준비해둔 데이터를 채웁니다
```
cd back (back 디레토리로 이동)
python loadData.py
```

### 서버 실행
```
cd back (back 디레토리로 이동)
python app.py
```

### [ 배포 방법 ] - 엘리스에서 임시 제공해준 MS Azure 가상머신에 배포하는 방법임.
### 최초 배포
### 전제 : ssh로 elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com 여기에 접속한 후 아래 절차 수행
- 우분투에 도커 설치
- git clone https://kdt-gitlab.elice.io/003-part3-deliveryservice/team3/project-template.git
- mv project-template/ DATeam3  (폴더명 바꾸기, 필수아님)
- sudo docker-compose -f docker-compose-ops.yml up
- ( 처음이라 모든 이미지(특히 프론트엔드 설치시 오래걸림)와 컨테이너 설치하느라 시간 몇분 걸림
웹 서비스 접속후 테스트 )
- 웹서비스 접속 주소: http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com
- 서버 REST API (Swagger) 문서 웹서비스 주소 - http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com:5000

### 재배포 방법
- (베스트 케이스일때)
- cd ~/DATeam3
- git pull
- sudo docker-compose down (기존 돌아가고 있는 도커 컨테이너들 중지&삭제)
- sudo docker-compose up --build   (이미지 다시 빌드하고 컨테이너도 다시생성한 후 우리 웹서비스 실행)

<br>

- (지저분한 상황 발생했을때)   
- csv 파일 다운로드 못받거나 하면 다른 폴더에 소스 코드 git pull 받기
- cd ~/DATeam3
- sudo docker-compose down (기존 돌아가고 있는 도커 컨테이너들 중지&삭제)
- sudo docker-compose -f docker-compose-ops.yml up (새로운 폴더에 소스를 다운 받았다면)

<br><br><br><br><br><br>

# [ 예전 코드 실행 방식 ]
## FE 실행방법
1. node.js 설치
2. front 폴더에서 npm i 명령어 실행
3. npm start 명령어 실행

# 서버(REST API) 설치/실행 방법
## 서버 설치 방법

- 서버의 메인/루트 폴더는 /back 입니다.

### pip를 사용하는 방법은 pip3 freeze > requirements.txt 해봤는데 제 가상 환경에 너무 많은 패키지가 깔려서 별 도움이 안됨 (죄송)

서버 실행엔 [app.py](http://app.py) 와 /apis/[corona.py](http://corona.py/) 가 핵심이라 여기서 사용하는 아래의 것들을 파이썬 가상환경에 pip3/pip install 패키지명 으로 수동 설치(이런것도 도커로 번거롭고 에러나는 절차를 줄일려고 시도해 볼겁니다)

- 가상환경 생성 후 가상 환경으로 변경 또는 VSCode 에서 Python select interpreter로 가상환경 선택해줌
- 가상환경에 flask, flask_restx, flask_cors, flask_migrate, flask_sqlalchemy, 외 추후 서버 실행시 모듈 못 찾는다고 나오는 패키지들 설치

### 데이터베이스 설정

MariaDB  설치시  아래 계정 정보대로 설정 또는 config.py파일에서 본인의 환경에 맞게 설정

user: root
password: root

port : 33060
database: corona_web (이건 CLI를 이용하든 MySql WorkBench를 이용하든 수동으로 만드셔야 함)

### Docker를 사용해서 데이터베이스를 설정하는 방법

리눅스 컨테이너 관리 도구 [Docker](https://www.docker.com/products/docker-desktop) 를 사용하여 새로운 환경(새 컴퓨터/ 새 서버)에서도 통일된 환경으로 DB를 좀더 간단히 설치하는 방법을 강구 중입니다.

### 데이터베이스 스키마 설정

빈 데이터 베이스에 테이블을 생성합니다.

```
cd back 또는 back 디렉토리에서 아래 명령 실행(back 상단의 루트 디렉토리에서 해도 될지도 모름;;)
flask db init
falsk db migrate
falsk db upgrade
* 디비 테이블의 속성 등을 변경시 위 명령 중 migrate, upgrade 만 하면됩니다.(단, 테이블의 데이터가 없을시 가능 할 듯 함)
```

### 초기 데이터 로딩

사전에 준비해둔 데이터를 채웁니다

```
cd back (back 디레토리로 이동)
python loadData.py
python load_data_deliver.py
```

### 서버 실행

서버를 실행시킵니다.

```
cd back (back 디레토리로 이동)
python app.py
```


<br><br><br><br><br>
### 아래는 기본 템플릿 내용임
<br><br>


- 최종 서비스 명을 위 괄호 부분에 작성하세요.
- 최종 서비스의 한 줄 소개를 작성하세요.


## 프로젝트 구성 안내

* `bullet point 에 적힌 내용을 수정해 주시면 됩니다.`

* `초기 기획은 언제든 수정될 수 있으니 웹서비스 결과를 내는데 초점을 두시기 바랍니다.`

## 1. 프로젝트 소개

**어떠한 인공지능 모델과 알고리즘을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

  - 사용하려는 인공지능 모델과 알고리즘을 명시
  - 인공지능에 사용하려는 데이터를 명시, 이에 대한 설명
  - 기술 스택 (python, d3, pandas, jupyter, javascript, MySQL 등)
  - 사용된 라이브러리 (numpy, matplotlib, wordcloud 등)
  - 웹서비스에 대한 자세한 개요

## 2. 프로젝트 목표

**웹서비스의 해결 과제와 인공지능으로 해결하기 위한 방안 논의 (50자 이상)**
  - 프로젝트 아이디어 동기
  - 문제를 해결하기 위한 특정 질문 명시
  - 인공지능을 통해 해결하려는 문제를 구체적으로 작성

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  - 주요 기능 (주된 활용성) 및 서브 기능
  - 프로젝트만의 차별점, 기대 효과

## 4. 프로젝트 구성도
  - 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 멤버1 | 팀장/프론트엔드 개발 |
| 멤버2 | 백엔드 개발/인공지능 |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 or 인공지능 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 인공지능 학습 결과 시각화 담당, UI 디자인 완성
- 수정 단계: 코치님 피드백 반영해서 프론트 디자인 수정

3. 백엔드

- 기획 단계: 데이터셋을 확보하기 위한 데이터베이스 구축, 데이터셋 수집
- 개발 단계: 데이터 베이스 구축 및 API 활용, 웹서비스 사용자의 정보 수집 기능 구현, 인공지능 학습 결과를 활용한 기능 구현
- 수정 단계: 코치님 피드백 반영해서 백엔드 설계/기능 수정

4. 인공지능

- 기획 단계: 웹 서비스 프로젝트 주제에 맞는 모델 및 알고리즘 설정, 모델과 알고리즘에 적합한 데이터셋 수집
- 개발 단계: 데이터 전처리, 학습 모델 구현, 학습 데이터 가공 및 모델 정밀도 향상
- 수정 단계: 코치님 피드백 반영해서 인공지능 학습 방식 수정


## 6. 버전
  - 프로젝트의 버전 기입

## 7. FAQ
  - 자주 받는 질문 정리

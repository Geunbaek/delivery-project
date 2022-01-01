# (코로나 배달 분석 웹) @삼시카페

# 도커 컴포즈로 React, Flask, DB 한방에 설치&실행 시키기
### (MariadDB에 테이블생성+데이터로드, Nginx 설치,실행도 같이 됨)
 - 사전 조건: 윈도우일때 도커+WSL2(Ubuntu 20.04)가 설치되있어야 한다.
윈도우(10)에서 도커 설치는 WSL2 우분투에 하지말고 윈도우에다가 도커 설치해야 함.
아래 링크에서 우측의 'Get Docker Desktop' 누르면 윈도우 설치파일 다운로드 됨.
https://hub.docker.com/editions/community/docker-ce-desktop-windows

 - /back/config.example.py 파일을 복사해서 /back/config.py을 만든 후 그대로 놔두시거나 자신의 환경에 맞게 수정
 - (WSL2 우분투에서) 프로젝트 루트 디렉토리를 커맨드창이나/터미널로 연다.
 - 프로젝트 루트에서 docker-compose up 를 치면 설치와 실행 준비가 된다.
 - 브라우저에 localhost:4000을 쳐서 첫화면 중간 즘에 그래프가 잘 출력되면 모든게 잘 설치, 실행된 것이다.
 - 실행 : 브라우져 주소 창에 아래 입력
    - 웹 서비스 : [http:localhost:4000](http:localhost:4000)
    - 서버 REST API Swagger 문서(현재 일부 api만 작동테스트 가능) : [http:localhost:5000](http:localhost:5000)

 ### - MS Azure에 배포해 놓은거 확인하기
 - 웹 서비스 : [http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com](http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com)
 - 서버 REST API Swagger 문서(현재 일부 api만 작동테스트 가능) - [http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com:5000](http://elice-kdt-3rd-team-03.koreacentral.cloudapp.azure.com:5000)

<br><br><br><br><br><br>

# 예전 코드 실행 방식
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

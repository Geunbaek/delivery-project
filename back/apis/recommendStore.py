from pytz import timezone
import random
# Third party imports
from flask_restx import Resource, abort, inputs
from requests.models import Response
from sqlalchemy import func, case, desc, literal_column
from apis.openApi import curr_weather
from datetime import datetime, timedelta
# Local application imports
from db_connect import db
from models.Model import YogiyoStore, FoodHour, WeatherByHour
from dto.coronaDto import RecommendStoreDto

recommendStore = RecommendStoreDto.api

storeParser = recommendStore.parser()
storeParser.add_argument(
    'lat', type=float, help='위도. (예) 37.5749351791722', location='args', required=True)
storeParser.add_argument(
    'lng', type=float, help='경도. (예) 127.085789171262', location='args', required=True)
storeParser.add_argument('dislikefood', type=str,
                         help='싫어하는 음식 종류만 파는 음식점을 제외합니다:\n \
                         다음 음식 종류만 입력 가능합니다.\n \
                         한식|분식|중식|찜탕|치킨|피자|회|일식|패스트푸드|도시락|야식|족발/보쌈|아시안/양식|카페/디저트\n \
                         (예) 치킨, 한식, 한식|분식, ...',
                         location='args')
storeParser.add_argument('likefood', type=str,
                         help='좋아하는 음식 종류에 가중치를 줍니다.\n \
                        다음 음식 종류만 입력 가능합니다.\n \
                        한식|분식|중식|찜탕|치킨|피자|회|일식|패스트푸드|도시락|야식|족발/보쌈|아시안/양식|카페/디저트\n \
                        (예) 분식, 한식, 중식|치킨, ...',
                         location='args')
# storeParser.add_argument('curweather', type=inputs.boolean,
#                          help='날씨 반영 여부, True or False', location='args')


@recommendStore.route("/recommend-store", methods=["GET"])
@recommendStore.doc(parser=storeParser)
@recommendStore.response(200, "성공적으로 수행 됨")
@recommendStore.response(400, "요청 정보 정확하지 않음")
@recommendStore.response(500, "API 서버에 문제가 발생하였음")
class RecommendStore(Resource):
    @recommendStore.marshal_with(RecommendStoreDto.store_model, envelope="data")
    @recommendStore.expect(storeParser)
    def get(self):
        '''추천 음식점 데이터 얻기.
           유저의 위치, 비선호 음식종류로 필터링.
           선호 음식종류, 음식점 평점, 현재 시간대/날씨별 배달 건수 높은 음식류 가중치 반영.

           1. 음식점 리뷰 평점 점수별로 순위를 추천에 일정 비율 반영,
           2. 유저의 위치 3km 반경 필터링,
           3. 비선호 음식종류 필터링,
           4. 현재 시간대에 배달 건수가 많은 음식 종류 1,2,3,하위 순위 점수로 추천에 일정 비율 반영,
           5. 선호 음식 종류에 가중치 반영,
           6. 현재 날씨에 많이 배달 시킨 음식 1,2,3위 점수로 추천에 일정 비율 반영,
        '''

        # 프론트에서 넘어온 파라미터를 변수에 담음
        args = storeParser.parse_args()
        lat = args['lat']  # 위도
        lng = args['lng']  # 경도
        if lat == None or lng == None:
            abort(400, msg='요청 정보 정확하지 않음.')
        dislikefood = args['dislikefood']  # 싫어하는 음식
        likefood = args['likefood']  # 선호하는 음식
        curweather = True  # args['curweather']

        print(
            f'lat={lat}, lng={lng}, dislikefood={dislikefood}, likefood={likefood},cur_weather={curweather}')

        # sqlalchemy query와 filter에 들어갈 각각의 변수 선언
        sub_queries = ""
        sub_filters = []

        # 현재시간 반영여부
        cur_time = True

        # 가중치
        rate = {}

        if cur_time == True & curweather == True:
            rate = {'review': '0.3', 'like': '0.3', 'cur': '0.2'}
        elif cur_time | curweather:
            rate = {'review': '0.3', 'like': '0.4', 'cur': '0.3'}

        #review_q = "case([(YogiyoStore.review_avg >= 4.9, 100),(YogiyoStore.review_avg >= 4.7, 90),(YogiyoStore.review_avg >= 4.5, 80)], else_=50)*0.3"

        # 리뷰평점은 무조건 반영이라 if문에 안넣음
        review_q = "(CASE	when review_avg >= 4.9 then 100 when review_avg >= 4.7 then 90 when review_avg >= 4.5 then 80 else 50 END) * " + \
            rate['review']
        # query에 들어갈 변수에 리뷰평점 쿼리문 추가
        sub_queries += review_q

        # 3km이내 음식점으로 데이터 좁히는 쿼리문
        nearby_q = func.acos(
            func.sin(func.radians(lat)) * func.sin(func.radians(YogiyoStore.lat)) +
            func.cos(func.radians(lat)) * func.cos(func.radians(YogiyoStore.lat)) *
            func.cos(func.radians(YogiyoStore.lng) - (func.radians(lng)))
        ) * 6371 <= 3
        # filter에 들어갈 변수에 위 쿼리문 추가
        sub_filters.append(nearby_q)

        # 싫어하는 음식이 있을때(파라미터 넘어왔을때)
        if dislikefood:
            # filter에 들어갈 변수에 위 쿼리문 추가, 들어온 파라미터를 | 기준으로 yogiyostore테이블의 카테고리에서 각각 찾아서 ''으로 치환한 다음에 카테코리가 공백이 아닌 데이터를 찾음
            sub_filters.append(func.regexp_replace(YogiyoStore.categories,
                                                   dislikefood, '') != "")
        # 현재시간 반영할때
        if cur_time:
            #sub_queries += "+ case([(YogiyoStore.categories.like('분식'), 100),(YogiyoStore.categories.like('치킨'), 90),(YogiyoStore.categories.like('피자'), 80)], else_=50)*0.3"
            # 현재시간 몇시인지 추출
            curr_hour = int(datetime.now(
                timezone('Asia/Seoul')).strftime("%H"))
            # FoodHour테이블에서 현재시간에 제일 많이 팔린 카테고리 1,2,3위 가져오는 쿼리문
            timerank = db.session.query(FoodHour.food, func.sum(FoodHour.count).label('total')).filter(
                FoodHour.hour == curr_hour).group_by(FoodHour.food).order_by(desc('total')).limit(3).all()

            sbq = db.session.query(FoodHour.food, (func.sum(
                FoodHour.count)/24).label('avg')).group_by(FoodHour.food).subquery()

            timeraterank = db.session.query(FoodHour.food, (func.sum(FoodHour.count)/sbq.c.avg).label('rate')).join(sbq, sbq.c.food == FoodHour.food).filter(
                FoodHour.hour == curr_hour).group_by(FoodHour.food).order_by(desc('rate')).limit(3).all()

            first_score = 100

            if timerank[0].food == '치킨':
                first_score -= 10

            # query에 들어갈 변수에 현재시간에 많이 팔린 음식 점수반영하는 쿼리문 추가
            # yogiyostore카테고리에 1위 카테고리가 있으면 100점, 2위카테고리는 90점, 3위 카테고리는 80점, 그외는 50점
            # 이 점수의 반영비율을 30%라 0.3을 곱함
            sub_queries += "+ (CASE when  categories like '%"+timerank[0].food+"%' then " + str(first_score) + " when  categories like '%" + \
                timerank[1].food+"%' then 90 when  categories like '%" + \
                timerank[2].food+"%' then 80	else 50 END) * " + \
                str(float(rate['cur'])/2)

            sub_queries += "+ (CASE when  categories like '%"+timeraterank[0].food+"%' then " + str(first_score) + " when  categories like '%" + \
                timeraterank[1].food+"%' then 90 when  categories like '%" + \
                timeraterank[2].food + \
                "%' then 80	else 50 END) * " + str(float(rate['cur'])/2)

        # 선호음식이 있을때(파라미터 넘어왔을때)
        if likefood:
            #sub_queries += "+ case([(YogiyoStore.categories.op('regexp')(r'야식|피자|'), 100)], else_=50)*0.4"

            # query에 들어갈 변수에 선호하는 음식 점수반영하는 쿼리문 추가
            # 들어온 파라미터를 | 기준으로 yogiyostore테이블의 카테고리에서 각각 찾아서 있으면 100점 없으면 50점
            # 이 점수의 반영비율을 40%라 0.4을 곱함
            sub_queries += "+ (CASE	when categories REGEXP ('" + \
                likefood+"') then 100 else 50 END) * " + rate['like']

        if curweather:

            try:
                print("openAPI")
                weather = curr_weather(lat, lng)
            except:
                print("from db")
                hour = (datetime.now(timezone('Asia/Seoul')) -
                        timedelta(hours=1)).strftime("%H")
                weather = db.session.query(WeatherByHour.weather).filter(
                    WeatherByHour.hour == hour).first()[0]

            print(weather)

            if (weather) and (weather != ''):

                weatherrank = db.session.query(FoodHour.food, func.sum(FoodHour.count).label('total')).filter(
                    FoodHour.weather == weather).group_by(FoodHour.food).order_by(desc('total')).all()
                print(weatherrank)
                first_score = 100

                if weatherrank[0].food == '치킨':
                    first_score -= 10

                sub_queries += "+ (CASE when  categories like '%"+weatherrank[0].food+"%' then " + str(first_score) + " when  categories like '%" + \
                    weatherrank[1].food+"%' then 90 when  categories like '%" + \
                    weatherrank[2].food + \
                    "%' then 80	else 50 END) * " + rate['cur']

        # sub_filters 와 sub_queries로 음식점 찾는 쿼리문
        recommend_store = db.session.query(YogiyoStore.id, YogiyoStore.sid, YogiyoStore.name, YogiyoStore.categories, YogiyoStore.review_avg, YogiyoStore.lat, YogiyoStore.lng,
                                           YogiyoStore.phone, YogiyoStore.address, YogiyoStore.logo_url, literal_column(sub_queries).label('score')).filter(*sub_filters).order_by(desc('score')).limit(50).all()

        # 랜덤으로 섞는 코드
        random.shuffle(recommend_store)

        return recommend_store[:10]


def get_menu():
    '''시간 별로 가장 많이 시킨 배달 음식 추천'''
    curr_date = datetime.now(timezone('Asia/Seoul'))
    curr_hour = int(curr_date.strftime("%H"))

    new_food = db.session.query(FoodHour).filter(
        FoodHour.hour == curr_hour).all()

    result = {}
    for i in range(len(new_food)):
        try:
            result[new_food[i].food] += new_food[i].count
        except:
            result[new_food[i].food] = new_food[i].count

    return max(result)

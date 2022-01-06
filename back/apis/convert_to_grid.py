from math import asin, sin, cos, tan, log

NX = 149  # X축 격자점 수
NY = 253  # Y축 격자점 수


def get_grid(lon, lat):
    # 동네예보 지도 정보
    class map:
        pass

    map.Re = 6371.00877  # 지도반경
    map.grid = 5.0  # 격자간격 (km)
    map.slat1 = 30.0  # 표준위도 1
    map.slat2 = 60.0  # 표준위도 2
    map.olon = 126.0  # 기준점 경도
    map.olat = 38.0  # 기준점 위도
    map.xo = 210 / map.grid  # 기준점 X좌표
    map.yo = 675 / map.grid  # 기준점 Y좌표

    return map_conv(lon, lat, map)  # x, y


# 좌표 변환
def map_conv(lon, lat, map):
    a, b = lamcproj(lon, lat, map)
    a = int(a + 1.5)
    b = int(b + 1.5)
    return a, b


# Lambert Conformal Conic Projection
def lamcproj(lon, lat, map):
    PI = asin(1.0) * 2.0
    DEGRAD = PI / 180.0

    re = map.Re / map.grid
    slat1 = map.slat1 * DEGRAD
    slat2 = map.slat2 * DEGRAD
    olon = map.olon * DEGRAD
    olat = map.olat * DEGRAD

    sn = tan(PI * 0.25 + slat2 * 0.5) / tan(PI * 0.25 + slat1 * 0.5)
    sn = log(cos(slat1) / cos(slat2)) / log(sn)
    sf = tan(PI * 0.25 + slat1 * 0.5)
    sf = pow(sf, sn) * cos(slat1) / sn
    ro = tan(PI * 0.25 + olat * 0.5)
    ro = re * sf / pow(ro, sn)

    ra = tan(PI * 0.25 + lat * DEGRAD * 0.5)
    ra = re * sf / pow(ra, sn)
    theta = lon * DEGRAD - olon
    if theta > PI:
        theta -= 2.0 * PI
    if theta < -PI:
        theta += 2.0 * PI
    theta *= sn
    x = ((ra * sin(theta)) + map.xo).real
    y = ((ro - ra * cos(theta)) + map.yo).real
    return x, y

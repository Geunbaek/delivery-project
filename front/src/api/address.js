import axios from "axios";

export const getAddressAPI = async (pos) => {
  const headers = {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_API_KEY}`,
  };
  const res = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${pos.lng}&y=${pos.lat}&input_coord=WGS84`,
    { headers }
  );

  return res.data;
};

export const getCoordsAPI = async (addr) => {
  const headers = {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_API_KEY}`,
  };
  const res = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${addr}`,
    { headers }
  );
  return res.data;
};

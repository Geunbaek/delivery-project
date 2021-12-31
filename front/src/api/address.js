import axios from "axios";

export const getAddressAPI = async (pos) => {
  // const params = {
  //   unit: "month",
  //   startdate: "2020-01-01",
  //   enddate: "2021-08-30",
  // };
  const headers = {
    Authorization: `KakaoAK 0c9bdd99fffd8a0e9c32565b1129c6eb`,
  };
  const res = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${pos.lng}&y=${pos.lat}&input_coord=WGS84`,
    { headers }
  );

  return res.data;
};

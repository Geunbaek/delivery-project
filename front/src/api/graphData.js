import axios from "axios";

export const getGraphDataAPI = async (unit, startdate, enddate) => {
  const params = {
    unit,
    startdate,
    enddate,
  };

  const res = await axios.get("/cov/patient-delivery", {
    params,
  });
  return res.data.data;
};

export const getDayOfWeekGraphDataAPI = async () => {
  const params = {};

  const res = await axios.get("/foodrank/dayofweek");
  return res.data.data;
};

export const getHourGraphDataAPI = async () => {
  const params = {};

  const res = await axios.get("/foodrank/hourly");
  return res.data.data;
};

export const getWeatherGraphDataAPI = async () => {
  const params = {};

  const res = await axios.get("/foodrank/wether");
  return res.data.data;
};

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

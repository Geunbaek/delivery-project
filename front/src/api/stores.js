import axios from "axios";

export const getStoresAPI = async (pos) => {
  const params = {
    ...pos,
  };
  const res = await axios.get("/store/recommend-store", { params });
  return res.data.data;
};

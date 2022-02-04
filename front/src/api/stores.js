import axios from "axios";

export const getStoresAPI = async (pos, preference) => {
  const dislikefood = Object.keys(preference)
    .filter((pref) => preference[pref] === 2)
    .join("|");
  const likefood = Object.keys(preference)
    .filter((pref) => preference[pref] === 1)
    .join("|");
  const params = {
    ...pos,
    dislikefood,
    likefood,
  };
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/store/recommend-store`,
    { params }
  );
  return res.data.data;
};

export const getStoresByDayOfWeekAPI = async (pos) => {
  const params = {
    ...pos,
  };
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/store2/dayweekstore`,
    { params }
  );
  return res.data.data;
};

export const getStoresByHourAPI = async (pos) => {
  const params = {
    ...pos,
  };
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/store2/hourstore`,
    { params }
  );
  return res.data.data;
};

export const getStoresByStarsAPI = async (pos) => {
  const params = {
    ...pos,
  };
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/store2/starrating-store`,
    { params }
  );
  return res.data.data;
};

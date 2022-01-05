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
  const res = await axios.get("/store/recommend-store", { params });
  return res.data.data;
};

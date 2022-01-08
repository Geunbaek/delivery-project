import {
  getStores,
  getStoresByDayOfWeek,
  getStoresByHour,
  getStoresByStars,
} from "../modules/stores";

export const type = ["종합", "요일", "시간", "별점"];
export const typeFunc = {
  종합: getStores,
  요일: getStoresByDayOfWeek,
  시간: getStoresByHour,
  별점: getStoresByStars,
};
export const typeInfo = {
  종합: "stores",
  요일: "storesByDayOfWeek",
  시간: "storesByHour",
  별점: "storesByStars",
};

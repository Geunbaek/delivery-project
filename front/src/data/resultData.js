import {
  getStores,
  getStoresByDayOfWeek,
  getStoresByHour,
  getStoresByStars,
} from "../modules/stores";

import { getHourGraphData, getWeatherGraphData } from "../modules/graphData";

export const type = ["종합", "시간", "별점"];
export const typeFunc = {
  종합: getStores,
  시간: getStoresByHour,
  별점: getStoresByStars,
};
export const typeInfo = {
  종합: "stores",
  시간: "storesByHour",
  별점: "storesByStars",
};

export const chartType = ["날씨", "시간"];

export const chartTypeFunc = {
  날씨: getWeatherGraphData,
  시간: getHourGraphData,
};

export const chartTypeInfo = {
  날씨: "weatherGraphData",
  시간: "hourGraphData",
};

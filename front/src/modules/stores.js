import { call, put, takeEvery } from "redux-saga/effects";
import {
  getStoresAPI,
  getStoresByDayOfWeekAPI,
  getStoresByHourAPI,
  getStoresByStarsAPI,
} from "../api/stores";

import { reducerUtils } from "../lib/reducerUtil";

const GET_STORES = "stores/GET_STORES";
const GET_STORES_SUCCESS = "stores/GET_STORES_SUCCESS";
const GET_STORES_ERROR = "stores/GET_STORES_ERROR";

const GET_STORES_BY_DAY_OF_WEEK = "stores/GET_STORES_BY_DAY_OF_WEEK";
const GET_STORES_BY_DAY_OF_WEEK_SUCCESS =
  "stores/GET_STORES_BY_DAY_OF_WEEK_SUCCESS";
const GET_STORES_BY_DAY_OF_WEEK_ERROR = "store/GET_STORES_BY_DAY_OF_WEEK_ERROR";

const GET_STORES_BY_HOUR = "stores/GET_STORES_BY_HOUR";
const GET_STORES_BY_HOUR_SUCCESS = "stores/GET_STORES_BY_HOUR_SUCCESS";
const GET_STORES_BY_HOUR_ERROR = "store/GET_STORES_BY_HOUR_ERROR";

const GET_STORES_BY_STARS = "stores/GET_STORES_BY_STARS";
const GET_STORES_BY_STARS_SUCCESS = "stores/GET_STORES_BY_STARS_SUCCESS";
const GET_STORES_BY_STARS_ERROR = "store/GET_STORES_BY_STARS_ERROR";

export const getStores = (pos, dislikefood, likefood) => ({
  type: GET_STORES,
  payload: { pos, dislikefood, likefood },
});

export const getStoresByDayOfWeek = (pos) => ({
  type: GET_STORES_BY_DAY_OF_WEEK,
  payload: { pos },
});

export const getStoresByHour = (pos) => ({
  type: GET_STORES_BY_HOUR,
  payload: { pos },
});

export const getStoresByStars = (pos) => ({
  type: GET_STORES_BY_STARS,
  payload: { pos },
});

function* getStoresSaga(action) {
  const { pos, dislikefood, likefood } = action.payload;
  try {
    const payload = yield call(getStoresAPI, pos, dislikefood, likefood);
    yield put({ type: GET_STORES_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_STORES_ERROR, error: e });
  }
}

function* getStoresByDayOfWeekSaga(action) {
  const { pos } = action.payload;
  try {
    const payload = yield call(getStoresByDayOfWeekAPI, pos);
    yield put({ type: GET_STORES_BY_DAY_OF_WEEK_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_STORES_BY_DAY_OF_WEEK_ERROR, error: e });
  }
}

function* getStoresByHourSaga(action) {
  const { pos } = action.payload;
  try {
    const payload = yield call(getStoresByHourAPI, pos);
    yield put({ type: GET_STORES_BY_HOUR_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_STORES_BY_HOUR_ERROR, error: e });
  }
}

function* getStoresByStarsSaga(action) {
  const { pos } = action.payload;
  try {
    const payload = yield call(getStoresByStarsAPI, pos);
    yield put({ type: GET_STORES_BY_STARS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_STORES_BY_STARS_ERROR, error: e });
  }
}

export function* storesSaga() {
  yield takeEvery(GET_STORES, getStoresSaga);
  yield takeEvery(GET_STORES_BY_DAY_OF_WEEK, getStoresByDayOfWeekSaga);
  yield takeEvery(GET_STORES_BY_HOUR, getStoresByHourSaga);
  yield takeEvery(GET_STORES_BY_STARS, getStoresByStarsSaga);
}

export const initialState = {
  stores: reducerUtils.initial(),
  storesByDayOfWeek: reducerUtils.initial(),
  storesByHour: reducerUtils.initial(),
  storesByStars: reducerUtils.initial(),
};

export default function stores(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        stores: reducerUtils.loading(),
      };
    case GET_STORES_SUCCESS:
      return {
        ...state,
        stores: reducerUtils.success(action.payload),
      };
    case GET_STORES_ERROR:
      return {
        ...state,
        stores: reducerUtils.error(action.error),
      };
    case GET_STORES_BY_DAY_OF_WEEK:
      return {
        ...state,
        storesByDayOfWeek: reducerUtils.loading(),
      };
    case GET_STORES_BY_DAY_OF_WEEK_SUCCESS:
      return {
        ...state,
        storesByDayOfWeek: reducerUtils.success(action.payload),
      };
    case GET_STORES_BY_DAY_OF_WEEK_ERROR:
      return {
        ...state,
        storesByDayOfWeek: reducerUtils.error(action.error),
      };
    case GET_STORES_BY_HOUR:
      return {
        ...state,
        storesByHour: reducerUtils.loading(),
      };
    case GET_STORES_BY_HOUR_SUCCESS:
      return {
        ...state,
        storesByHour: reducerUtils.success(action.payload),
      };
    case GET_STORES_BY_HOUR_ERROR:
      return {
        ...state,
        storesByHour: reducerUtils.error(action.error),
      };
    case GET_STORES_BY_STARS:
      return {
        ...state,
        storesByStars: reducerUtils.loading(),
      };
    case GET_STORES_BY_STARS_SUCCESS:
      return {
        ...state,
        storesByStars: reducerUtils.success(action.payload),
      };
    case GET_STORES_BY_STARS_ERROR:
      return {
        ...state,
        storesByStars: reducerUtils.error(action.error),
      };
    default:
      return state;
  }
}

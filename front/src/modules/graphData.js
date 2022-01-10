import { call, put, takeEvery } from "redux-saga/effects";
import {
  getDayOfWeekGraphDataAPI,
  getGraphDataAPI,
  getHourGraphDataAPI,
  getWeatherGraphDataAPI,
} from "../api/graphData";
import { reducerUtils } from "../lib/reducerUtil";

const GET_GRAPH_DATA = "graphData/GET_GRAPH_DATA";
const GET_GRAPH_DATA_SUCCESS = "graphData/GET_GRAPH_DATA_SUCCESS";
const GET_GRAPH_DATA_ERROR = "graphData/GET_GRAPH_DATA_ERROR";

// getDayOfWeekGraphDataAPI
const GET_DAY_OF_WEEK_GRAPH_DATA = "graphData/GET_DAY_OF_WEEK_GRAPH_DATA";
const GET_DAY_OF_WEEK_GRAPH_DATA_SUCCESS =
  "graphData/GET_DAY_OF_WEEK_GRAPH_DATA_SUCCESS";
const GET_DAY_OF_WEEK_GRAPH_DATA_ERROR =
  "graphData/GET_DAY_OF_WEEK_GRAPH_DATA_ERROR";

// getHourGraphDataAPI
const GET_HOUR_GRAPH_DATA = "graphData/GET_HOUR_GRAPH_DATA";
const GET_HOUR_GRAPH_DATA_SUCCESS = "graphData/GET_HOUR_GRAPH_DATA_SUCCESS";
const GET_HOUR_GRAPH_DATA_ERROR = "graphData/GET_HOUR_GRAPH_DATA_ERROR";

// getWeatherGraphDataAPI
const GET_WEATHER_GRAPH_DATA = "graphData/GET_WEATHER_GRAPH_DATA";
const GET_WEATHER_GRAPH_DATA_SUCCESS =
  "graphData/GET_WEATHER_GRAPH_DATA_SUCCESS";
const GET_WEATHER_GRAPH_DATA_ERROR = "graphData/GET_WEATHER_GRAPH_DATA_ERROR";

export const getGraphData = (type, startDate, endDate) => ({
  type: GET_GRAPH_DATA,
  payload: {
    type,
    startDate,
    endDate,
  },
});

// export const getDayOfWeekGraphData = () => ({
//   type: GET_DAY_OF_WEEK_GRAPH_DATA,
// });

export const getHourGraphData = () => ({
  type: GET_HOUR_GRAPH_DATA,
});

export const getWeatherGraphData = () => ({
  type: GET_WEATHER_GRAPH_DATA,
});

function* getGraphDataSaga(action) {
  const { type, startDate, endDate } = action.payload;
  try {
    const payload = yield call(getGraphDataAPI, type, startDate, endDate);
    const label = payload.patients.map((patient) => patient.date);
    const patient = payload.patients.map((patient) => patient.patient_count);
    const deliver = payload.deliveries.map((deliver) => deliver.deliver_count);
    yield put({
      type: GET_GRAPH_DATA_SUCCESS,
      payload: { label, patient, deliver },
    });
  } catch (e) {
    yield put({ type: GET_GRAPH_DATA_ERROR, error: e });
  }
}

function* getWeatherGraphDataSaga(action) {
  try {
    const payload = yield call(getWeatherGraphDataAPI);
    yield put({
      type: GET_WEATHER_GRAPH_DATA_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({ type: GET_WEATHER_GRAPH_DATA_ERROR, error: e });
  }
}

function* getHourGraphDataSaga(action) {
  try {
    const payload = yield call(getHourGraphDataAPI);
    yield put({
      type: GET_HOUR_GRAPH_DATA_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({ type: GET_HOUR_GRAPH_DATA_ERROR, error: e });
  }
}

export function* graphDataSaga() {
  yield takeEvery(GET_GRAPH_DATA, getGraphDataSaga);
  yield takeEvery(GET_HOUR_GRAPH_DATA, getHourGraphDataSaga);
  yield takeEvery(GET_WEATHER_GRAPH_DATA, getWeatherGraphDataSaga);
}

const initialState = {
  deliveryGraphData: reducerUtils.initial(),
  // dayOfWeekGraphData: reducerUtils.initial(),
  hourGraphData: reducerUtils.initial(),
  weatherGraphData: reducerUtils.initial(),
};

export default function graphData(state = initialState, action) {
  switch (action.type) {
    case GET_GRAPH_DATA:
      return {
        ...state,
        deliveryGraphData: reducerUtils.loading(),
      };
    case GET_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        deliveryGraphData: reducerUtils.success(action.payload),
      };
    case GET_GRAPH_DATA_ERROR:
      return {
        ...state,
        deliveryGraphData: reducerUtils.error(action.error),
      };
    case GET_HOUR_GRAPH_DATA:
      return {
        ...state,
        hourGraphData: reducerUtils.loading(),
      };
    case GET_HOUR_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        hourGraphData: reducerUtils.success(action.payload),
      };
    case GET_HOUR_GRAPH_DATA_ERROR:
      return {
        ...state,
        hourGraphData: reducerUtils.error(action.error),
      };
    case GET_WEATHER_GRAPH_DATA:
      return {
        ...state,
        weatherGraphData: reducerUtils.loading(),
      };
    case GET_WEATHER_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        weatherGraphData: reducerUtils.success(action.payload),
      };
    case GET_WEATHER_GRAPH_DATA_ERROR:
      return {
        ...state,
        weatherGraphData: reducerUtils.error(action.error),
      };
    default:
      return state;
  }
}

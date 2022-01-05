import { call, put, takeEvery } from "redux-saga/effects";
import { getStoresAPI } from "../api/stores";

const GET_STORES = "stores/GET_STORES";
const GET_STORES_SUCCESS = "stores/GET_STORES_SUCCESS";
const GET_STORES_ERROR = "stores/GET_STORES_ERROR";

export const getStores = (pos) => ({
  type: GET_STORES,
  payload: pos,
});

function* getStoresSaga(action) {
  const { lat, lng } = action.payload;

  try {
    const payload = yield call(getStoresAPI, { lat, lng });
    yield put({ type: GET_STORES_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_STORES_ERROR, error: e });
  }
}

export function* storesSaga() {
  yield takeEvery(GET_STORES, getStoresSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function stores(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_STORES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_STORES_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

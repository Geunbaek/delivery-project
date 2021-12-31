import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAddressAPI } from "../api/address";

const GET_ADDRESS = "address/GET_ADDRESS";
const GET_ADDRESS_SUCCESS = "address/GET_ADDRESS_SUCCESS";
const GET_ADDRESS_ERROR = "address/GET_ADDRESS_ERROR";

export const getAddress = (pos) => ({ type: GET_ADDRESS, payload: pos });

function* getAddressSaga(action) {
  const { payload: pos } = action;
  try {
    const payload = yield call(getAddressAPI, pos);
    yield put({ type: GET_ADDRESS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e });
  }
}

export function* addressSaga() {
  yield takeLatest(GET_ADDRESS, getAddressSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function address(state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_ADDRESS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ADDRESS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

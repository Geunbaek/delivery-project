import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAddressAPI, getCoordsAPI } from "../api/address";
import { reducerUtils } from "../lib/reducerUtil";

const GET_ADDRESS = "address/GET_ADDRESS";
const GET_ADDRESS_SUCCESS = "address/GET_ADDRESS_SUCCESS";
const GET_ADDRESS_ERROR = "address/GET_ADDRESS_ERROR";

const GET_COORDS = "address/GET_COORDS";
const GET_COORDS_SUCCESS = "address/GET_COORDS_SUCCESS";
const GET_COORDS_ERROR = "address/GET_COORDS_ERROR";

export const getAddress = (pos) => ({
  type: GET_ADDRESS,
  payload: pos,
});

export const getCoords = (addr) => ({
  type: GET_COORDS,
  payload: addr,
});

function* getAddressSaga(action) {
  const { payload: pos } = action;
  try {
    const payload = yield call(getAddressAPI, pos);
    const document = payload.documents.shift();
    const inform = {
      addressName:
        document?.road_address?.address_name ?? document.address.address_name,
      coords: pos,
    };
    yield put({ type: GET_ADDRESS_SUCCESS, payload: inform });
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e });
  }
}

function* getCoordsSaga(action) {
  const { payload: addr } = action;
  try {
    const payload = yield call(getCoordsAPI, addr);
    const document = payload.documents.shift();
    const { y: lat, x: lng } = document;
    const inform = {
      addressName:
        document?.road_address?.address_name ?? document.address.address_name,
      coords: { lat, lng },
    };
    yield put({ type: GET_COORDS_SUCCESS, payload: inform });
  } catch (e) {
    yield put({ type: GET_COORDS_ERROR, error: e });
  }
}

export function* addressSaga() {
  yield takeLatest(GET_ADDRESS, getAddressSaga);
  yield takeEvery(GET_COORDS, getCoordsSaga);
}

export const initialState = reducerUtils.initial();

export default function address(state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS:
      return reducerUtils.loading();
    case GET_ADDRESS_SUCCESS:
      return reducerUtils.success(action.payload);
    case GET_ADDRESS_ERROR:
      return reducerUtils.error(action.error);
    case GET_COORDS:
      return reducerUtils.loading();
    case GET_COORDS_SUCCESS:
      return reducerUtils.success(action.payload);
    case GET_COORDS_ERROR:
      return reducerUtils.error(action.error);
    default:
      return state;
  }
}

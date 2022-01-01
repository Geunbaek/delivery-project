import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAddressAPI, getCoordsAPI } from "../api/address";

const GET_ADDRESS = "address/GET_ADDRESS";
const GET_ADDRESS_SUCCESS = "address/GET_ADDRESS_SUCCESS";
const GET_ADDRESS_ERROR = "address/GET_ADDRESS_ERROR";

const GET_COORDS = "address/GET_COORDS";
const GET_COORDS_SUCCESS = "address/GET_COORDS_SUCCESS";
const GET_COORDS_ERROR = "address/GET_COORDS_ERROR";

export const getAddress = (pos, swiper) => ({
  type: GET_ADDRESS,
  payload: pos,
  swiper,
});
export const getCoords = (addr) => ({ type: GET_COORDS, payload: addr });

function* getAddressSaga(action) {
  const { payload: pos, swiper } = action;
  try {
    const payload = yield call(getAddressAPI, pos);
    const inform = {
      addressName:
        payload.documents[0]?.road_address?.address_name ||
        payload.documents[0].address.address_name,
      coords: pos,
    };
    yield put({ type: GET_ADDRESS_SUCCESS, payload: inform });
    // yield swiper.slideTo(1);
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e });
  }
}

function* getCoordsSaga(action) {
  const { payload: addr } = action;
  try {
    const payload = yield call(getCoordsAPI, addr);
    const inform = {
      addressName:
        payload.documents[0]?.road_address?.address_name ||
        payload.documents[0].address.address_name,
      coords: {
        lat: payload.documents[0].y,
        lng: payload.documents[0].x,
      },
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
    case GET_COORDS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_COORDS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_COORDS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

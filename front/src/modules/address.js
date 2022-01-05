import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAddressAPI, getCoordsAPI } from "../api/address";
import { inSeoulCheck } from "../components/survey/sections/Location";

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

export const getCoords = (addr, setIsInSeoul, swiper) => ({
  type: GET_COORDS,
  payload: addr,
  setIsInSeoul,
  swiper,
});

function* getAddressSaga(action) {
  const { payload: pos } = action;
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
  const { payload: addr, setIsInSeoul, swiper } = action;
  try {
    const payload = yield call(getCoordsAPI, addr);
    const { y: lat, x: lng } = payload.documents[0];
    if (inSeoulCheck(lat, lng)) {
      setIsInSeoul(false);
      // throw new Error("Not in seoul");
    }
    const inform = {
      addressName:
        payload.documents[0]?.road_address?.address_name ||
        payload.documents[0].address.address_name,
      coords: {
        lat,
        lng,
      },
    };
    setIsInSeoul(true);
    swiper.slideTo(swiper.activeIndex + 1);
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

import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import address, { addressSaga } from "./address";
import graphData, { graphDataSaga } from "./graphData";
import stores, { storesSaga } from "./stores";
import preference from "./preference";
import { categories } from "../data/categories";

const RESET = "RESET";

export const storeReset = () => ({
  type: RESET,
});

const appReducer = combineReducers({
  address,
  graphData,
  stores,
  preference,
});

export function* rootSaga() {
  yield all([addressSaga(), graphDataSaga(), storesSaga()]);
}

function rootReducer(state, action) {
  if (action.type === RESET) {
    state = {
      address: {
        loading: false,
        data: null,
        error: null,
      },
      graphData: {
        loading: false,
        data: null,
        error: null,
      },
      stores: {
        stores: { loading: false, data: null, error: null },
        storesByDayOfWeek: { loading: false, data: null, error: null },
        storesByHour: { loading: false, data: null, error: null },
        storesByStars: { loading: false, data: null, error: null },
      },
      preference: {
        categories,
      },
    };
  }
  return appReducer(state, action);
}

export default rootReducer;

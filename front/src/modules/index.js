import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import address, { addressSaga } from "./address";
import graphData, { graphDataSaga } from "./graphData";
import stores, { storesSaga } from "./stores";
import preference from "./preference";

const rootReducer = combineReducers({
  address,
  graphData,
  stores,
  preference,
});

export function* rootSaga() {
  yield all([addressSaga(), graphDataSaga(), storesSaga()]);
}

export default rootReducer;

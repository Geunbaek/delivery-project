import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import address, { addressSaga } from "./address";
import graphData, { graphDataSaga } from "./graphData";
import stores, { storesSaga } from "./stores";

const rootReducer = combineReducers({
  address,
  graphData,
  stores,
});

export function* rootSaga() {
  yield all([addressSaga(), graphDataSaga(), storesSaga()]);
}

export default rootReducer;

import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import address, { addressSaga } from "./address";
import graphData, { graphDataSaga } from "./graphData";

const rootReducer = combineReducers({
  address,
  graphData,
});

export function* rootSaga() {
  yield all([addressSaga(), graphDataSaga()]);
}

export default rootReducer;

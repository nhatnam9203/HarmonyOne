import authSaga from "./authSaga";
import { all } from "redux-saga/effects";

export default function* sagaRoot() {
  yield all([
    authSaga(),
  ]);
}

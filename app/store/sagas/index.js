import authSaga from "./authSaga";
import appointmentSaga from "./appointmentSaga";
import { all } from "redux-saga/effects";

export default function* sagaRoot() {
  yield all([
    authSaga(),
    appointmentSaga(),
  ]);
}

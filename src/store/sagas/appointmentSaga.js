import { put, takeLatest, all, select, delay } from 'redux-saga/effects';
import { requestAPI } from '@utils';
import NavigationService from '@navigation/NavigationService';

function* getAppointmentList(action) {
  try {
    yield put({ type: 'START_LOADING_ROOT' });
    const response = yield requestAPI(action);
    switch (parseInt(response.codeNumber)) {
      case 200:
        yield put({ type: 'SET_APPOINTMENT_LIST', payload: response.data });
        break;
      case 404:
        yield put({ type: 'SET_APPOINTMENT_LIST', payload: [] });
        break;
      default:
        yield put({ type: 'SET_CONTENT_ERROR', content: response.message });
        break;
    }
    yield put({ type: 'STOP_LOADING_ROOT' });
  } catch (e) {
    yield put({ type: 'STOP_LOADING_ROOT' });
  }
}

function* mySaga() {
  yield all([takeLatest('GET_APPOINTMENT_LIST', getAppointmentList)]);
}
export default mySaga;

import { put, takeLatest, all, select , delay } from "redux-saga/effects";
import { requestAPI } from "@utils";
import NavigationService from "@navigation/NavigationService";

function* loginMID(action) {
    try {
        yield put({ type: "START_LOADING_BUTTON" });
        const response = yield requestAPI(action);
        switch (parseInt(response.codeNumber)) {
            case 200:
                NavigationService.navigate("LoginPincode", { merchantCode: action.body.merchantCode });
                break;
            default:
                yield put({ type: "SET_CONTENT_ERROR", content: response.message });
                break;
        }
        yield put({ type: "STOP_LOADING_BUTTON" });
    } catch (e) {
        yield put({ type: "STOP_LOADING_BUTTON" });
    }
}

function* loginPincode(action) {
    try {
        yield put({ type: "START_LOADING_ROOT" });
        const response = yield requestAPI(action);
        switch (parseInt(response.codeNumber)) {
            case 200:
                yield put({
                    type: 'SET_INFO_LOGIN',
                    payload: response.data
                })
                yield put({
                    type: 'LOGIN_SUCCESS',
                })
                break;
            default:
                yield put({ type: "SET_CONTENT_ERROR", content: response.message });
                action.cb();
                break;
        }
        yield put({ type: "STOP_LOADING_ROOT" });
    } catch (e) {
        yield put({ type: "STOP_LOADING_ROOT" });
    }
}

function* logout(action) {
    try {
        yield delay(500);
        yield put({ type: "START_LOADING_ROOT" });
        const response = yield requestAPI(action);
        switch (parseInt(response.codeNumber)) {
            case 200:
                yield put({
                    type: 'LOGOUT_SUCCESS',
                })
                break;
            default:
                yield put({ type: "SET_CONTENT_ERROR", content: response.message });
                action.cb();
                break;
        }
        yield put({ type: "STOP_LOADING_ROOT" });
    } catch (e) {
        yield put({ type: "STOP_LOADING_ROOT" });
    }
}


function* mySaga() {
    yield all([
        takeLatest("LOGIN_MID", loginMID),
        takeLatest("LOGIN_PINCODE", loginPincode),
        takeLatest("LOGOUT", logout),
    ]);
}
export default mySaga;

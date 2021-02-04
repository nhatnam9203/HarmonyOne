import { put, takeLatest, all } from "redux-saga/effects";
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
                yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
                break;
        }
        yield put({ type: "STOP_LOADING_BUTTON" });
    } catch (e) {
        yield put({ type: "STOP_LOADING_BUTTON" });
    }
}

function* loginPincode(action) {
    try {
        yield put({ type: "START_LOADING_BUTTON" });
        const response = yield requestAPI(action);
        switch (parseInt(response.codeNumber)) {
            case 200:
                yield put({ 
                    type : 'SET_INFO_LOGIN',
                    payload : response.data
                 })
                break;
            default:
                yield put({ type: "SHOW_POPUP_ERROR", content: response.message });
                action.cb();
                break;
        }
        yield put({ type: "STOP_LOADING_BUTTON" });
    } catch (e) {
        yield put({ type: "STOP_LOADING_BUTTON" });
    }
}


function* mySaga() {
    yield all([
        takeLatest("LOGIN_MID", loginMID),
        takeLatest("LOGIN_PINCODE", loginPincode),
    ]);
}
export default mySaga;

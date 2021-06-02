import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer'
import * as authReducer from './authReducer'
import * as appointmentReducer from './appointmentReducer'
export default Object.assign(
    loadingReducer,
    loginReducer,
    authReducer,
    appointmentReducer,
);
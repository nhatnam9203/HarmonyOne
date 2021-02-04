import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer'
import * as authReducer from './authReducer'
export default Object.assign(
    loadingReducer,
    loginReducer,
    authReducer
);
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

/**
|--------------------------------------------------
| APP SLICES
|--------------------------------------------------
*/
const log = (obj, message = '') => {
  //   Logger.log(`[AppMerchant  Slice] ${message}`, obj);
};
const reducerName = 'hpo.app';
const initialState = {
  appLoading: false,
  deviceId: null,
  deviceName: null,
  isPlash: true,
  merchantID: null,
  rememberMID: false,
  exportLoading: false,
  exportType: '',
};
let appSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    showLoading: {
      reducer: (state, action) => {
        state.appLoading = true;
      },
    },
    hideLoading: {
      reducer: (state, action) => {
        state.appLoading = false;
      },
    },
    setDeviceInfo: {
      reducer: (state, action) => {
        return Object.assign({}, state, action.payload);
      },
    },
  },
});

let { actions, reducer } = appSlice;

let appMerchantReducer = persistReducer(
  {
    key: 'app',
    storage: AsyncStorage,
    whitelist: ['merchantID', 'rememberMID'],
  },
  reducer,
);

module.exports = {
  reducer: appMerchantReducer,
  actions: { ...actions },
};

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
  isHome: false,
  isError: false,
  messageError: "",
  errorType: "info",
  titleError: "",
  isSignalR: true,
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

    setError: {
      reducer: (state, action) => {
        state.isError = action.payload?.isError;
        state.messageError = action.payload?.messageError;
        state.errorType = action.payload?.errorType;
        state.titleError = action.payload?.titleError;
      }
    },

    setStatusHomeScreen: (state, action) => {
      state.isHome = action.payload;
    },


    startSignalR: (state, action) => {
      state.isSignalR = true;
    },

    stopSignalR: (state, action) => {
      state.isSignalR = false;
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

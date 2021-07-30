import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.auth';
const initialState = { merchantID: null, staff: null };
const authSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    loginMerchant: {
      reducer: (state, action) => {
        state.merchantID = action.payload;
      },
      // prepare: (params) => {
      //   console.log(params);
      // },
    },
    staffSignIn: {
      reducer: (state, action) => {
        state.staff = action.payload;
      },
      // prepare: (params) => {
      //   console.log(params);
      // },
    },
    signOutApp: {
      reducer: (state, action) => {
        return initialState;
      },
    },
  },
});

const { actions, reducer } = authSlice;

let authMerchantReducer = persistReducer(
  {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['staff'],
  },
  reducer,
);

module.exports = {
  reducer: authMerchantReducer,
  actions: { ...actions },
};

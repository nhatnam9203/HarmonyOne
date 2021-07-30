import { createSlice } from '@reduxjs/toolkit';

const reducerName = 'hpo.auth';
const initialState = { merchantID: null, staff: null };
const authSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    logInMerchant: {
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

module.exports = {
  reducer,
  actions: { ...actions },
};

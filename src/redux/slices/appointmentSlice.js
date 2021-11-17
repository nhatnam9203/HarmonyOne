import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const reducerName = 'hpo.appointment';
const initialState = {
  appointmentsByDate: [],
  appointmentDate: new Date(),
  appointmentDetail: {},
  blockTimes: [],
  groupAppointments: [],
  promotionAppointment: [],
  discount : [],
  startProcessingPax: false,
};

const appointmentSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    setAppointmentsByDate: (state, action) => {
      state.appointmentsByDate = action.payload;
    },
    setAppointmentDetail: (state, action) => {
      state.appointmentDetail = action.payload;
    },
    setBlockTimeBydate: (state, action) => {
      state.blockTimes = action.payload;
    },
    setAppointmentDate: (state, action) => {
      state.appointmentDate = action.payload;
    },
    setGroupAppointment: (state, action) => {
      state.groupAppointments = action.payload;
    },
    setPromotionAppointment: (state, action) => {
      state.promotionAppointment = action.payload;
    },
    updateGroupAppointment: (state, action) => {
      const checkoutPaymentResponse = action.payload?.checkoutPaymentResponse;
      let tempGroupAppointment = {
        ...state.groupAppointments,
        checkoutPayments:
          checkoutPaymentResponse?.paidAmounts &&
          Array.isArray(checkoutPaymentResponse?.paidAmounts)
            ? checkoutPaymentResponse?.paidAmounts.reverse()
            : tempGroupAppointment?.checkoutPayments,
        dueAmount: checkoutPaymentResponse?.dueAmount,
      };
      state.groupAppointments = tempGroupAppointment;
    },

  },
});

const { actions, reducer } = appointmentSlice;

let appointmentReducer = persistReducer(
  {
    key: 'appointment',
    storage: AsyncStorage,
    whitelist: [],
  },
  reducer,
);

module.exports = {
  reducer: appointmentReducer,
  actions: { ...actions },
};

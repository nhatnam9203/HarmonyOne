import appSlice from './appSlice';
import authSlice from './authSlice';
import customerSlice from "./customerSlice";
import bookAppointmentSlice from "./bookAppoinentmentSlice";

const rootReducers = Object.assign(
  {},
  {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    customer : customerSlice.reducer,
    bookAppointment : bookAppointmentSlice.reducer,
  },
);

module.exports = {
  rootReducers,
  auth: authSlice.actions,
  app: appSlice.actions,
  customer : customerSlice.actions,
  bookAppointment : bookAppointmentSlice.actions,
};

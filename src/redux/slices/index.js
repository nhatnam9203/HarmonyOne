import appSlice from './appSlice';
import authSlice from './authSlice';
import customerSlice from "./customerSlice";
import bookAppointmentSlice from "./bookAppoinentmentSlice";
import serviceSlice from "./serviceSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import extraSlice from "./extraSlice";
import reviewSlice from "./reviewSlice";
import marketingSlice from "./marketingSlice";
import staffSlice from "./staffSlice";
import appointmentSlice from "./appointmentSlice";
import merchantSlice from "./merchantSlice";
import notificationSlice from "./notificationSlice";
import editAppointmentSlice from "./editAppointmentSlice";
import invoiceSlice from "./invoiceSlice";

const rootReducers = Object.assign(
  {},
  {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    bookAppointment: bookAppointmentSlice.reducer,
    service: serviceSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    extra: extraSlice.reducer,
    review: reviewSlice.reducer,
    marketing: marketingSlice.reducer,
    staff: staffSlice.reducer,
    appointment: appointmentSlice.reducer,
    merchant: merchantSlice.reducer,
    notification: notificationSlice.reducer,
    editAppointment : editAppointmentSlice.reducer,
    invoice : invoiceSlice.reducer,
  },
);

module.exports = {
  rootReducers,
  auth: authSlice.actions,
  app: appSlice.actions,
  customer: customerSlice.actions,
  bookAppointment: bookAppointmentSlice.actions,
  service: serviceSlice.actions,
  category: categorySlice.actions,
  product: productSlice.actions,
  extra: extraSlice.actions,
  review: reviewSlice.actions,
  marketing: marketingSlice.actions,
  staff: staffSlice.actions,
  appointment: appointmentSlice.actions,
  merchant: merchantSlice.actions,
  notification : notificationSlice.actions,
  editAppointment : editAppointmentSlice.actions,
  invoice : invoiceSlice.actions,
};

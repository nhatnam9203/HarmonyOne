import React from 'react';
import {
  useAxiosQuery,
  getListCustomer,
  selectPaymentMethod,
  checkoutSubmit,
  useAxiosMutation,
  checkoutAppointment,
  getAppointmentByDate
} from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { dateToFormat } from "@shared/utils";
import { bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogSuccessRef = React.useRef();

  const {
    appointment: { appointmentDetail, groupAppointments = [], appointmentDate }
  } = useSelector(state => state);
  const [methodPay, setMethodPay] = React.useState(null);


  const [, submitSelectPaymentMethod] = useAxiosMutation({
    ...selectPaymentMethod(),
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const body = await checkoutSubmit(response.data);
        applyCheckoutSubmit(body.params);
      }
    }
  });

  const [, applyCheckoutSubmit] = useAxiosMutation({
    ...checkoutSubmit(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dialogSuccessRef?.current?.show();
      }
    }
  });

  const [, submitCheckoutAppointment] = useAxiosMutation({
    ...checkoutAppointment(),
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const data = {
          method: methodPay.method,
          amount: parseFloat(appointmentDetail?.total),
          giftCardId: 0,
        }
        const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
        submitSelectPaymentMethod(body.params);
      }
    }
  });

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });


  return {
    appointmentDetail,
    methodPay,
    dialogSuccessRef,

    onChangeMethodPay: (item) => {
      setMethodPay(item)
    },

    back: () => {
      // NavigationService.back();
    },

    onSubmitPayment: async () => {
      const body = await checkoutAppointment(appointmentDetail?.appointmentId);
      submitCheckoutAppointment(body.params);
    },

    onOK: () => {
      fetchAppointmentByDate();
      NavigationService.navigate(screenNames.AppointmentScreen);
      dispatch(bookAppointment.resetBooking());
    }
  }
};
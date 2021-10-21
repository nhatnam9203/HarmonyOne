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
import { bookAppointment, appointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { Alert } from 'react-native';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogSuccessRef = React.useRef();
  const dialogActiveGiftCard = React.useRef();

  const {
    appointment: { appointmentDetail, groupAppointments = [], appointmentDate }
  } = useSelector(state => state);
  const [methodPay, setMethodPay] = React.useState(null);


  const [, submitSelectPaymentMethod] = useAxiosMutation({
    ...selectPaymentMethod(),
    isStopLoading: true,
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

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });

  React.useLayoutEffect(() => {
    dialogActiveGiftCard?.current?.hide();
  }, []);

  return {
    appointmentDetail,
    methodPay,
    dialogSuccessRef,
    dialogActiveGiftCard,

    onChangeMethodPay: (item) => {
      setMethodPay(item);
      if (item?.method == "giftcard") {
        dialogActiveGiftCard?.current?.show();
      }
    },

    back: () => {
      // NavigationService.back();
    },

    onSubmitPayment: async () => {
      const data = {
        method: methodPay.method,
        amount: parseFloat(appointmentDetail?.total),
        giftCardId: 0,
      }
      const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
      submitSelectPaymentMethod(body.params);
    },

    onPayGiftCard: async (amount, giftCardId) => {
      const data = {
        method: "giftcard",
        amount,
        giftCardId,
      }
      const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
      submitSelectPaymentMethod(body.params);
      setTimeout(() => {
        dialogActiveGiftCard?.current?.hide();
      }, 200);
    },

    onOK: () => {
      fetchAppointmentByDate();
      NavigationService.navigate(screenNames.AppointmentScreen);
      dispatch(bookAppointment.resetBooking());
    }
  }
};
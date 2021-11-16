import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointment, bookAppointment } from "@redux/slices";
import { BackHandler } from "react-native";
import { useAxiosQuery, checkoutAppointment, useAxiosMutation } from "@src/apis";
import NavigationService from "@navigation/NavigationService";
import { Alert } from "react-native";


export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    appointment: { appointmentDetail, groupAppointments = [] },
    bookAppointment: { isQuickCheckout }
  } = useSelector(state => state)

  const [, submitCheckoutAppointment] = useAxiosMutation({
    ...checkoutAppointment(),
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        NavigationService.navigate(screenNames.PaymentPage);
      }
    }
  });

  return {
    appointmentDetail,
    groupAppointments,
    selectPayment: async () => {
      const body = await checkoutAppointment(appointmentDetail?.appointmentId);
      submitCheckoutAppointment(body.params);
    },

    onPressBack: () => {
      if (isQuickCheckout) {
        NavigationService.navigate(screenNames.AppointmentScreen)
        dispatch(bookAppointment.resetBooking());
      } else {
        NavigationService.back();
      }
    }
  };
};

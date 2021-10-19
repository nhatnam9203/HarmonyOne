import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointment, bookAppointment } from "@redux/slices";
import { getGroupAppointmentById, useAxiosQuery } from "@src/apis";
import NavigationService from "@navigation/NavigationService";
import { Alert } from "react-native";


export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    appointment: { appointmentDetail },
    bookAppointment: { isQuickCheckout }
  } = useSelector(state => state);

  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentDetail?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
        NavigationService.navigate(screenNames.PaymentPage);
      }
    }
  });


  return {
    appointmentDetail,
    selectPayment: () => {
      fetchGroupApointmentById();
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

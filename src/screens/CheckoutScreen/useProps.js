import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointment, bookAppointment, app } from "@redux/slices";
import { BackHandler } from "react-native";
import { useAxiosQuery, checkoutAppointment, useAxiosMutation } from "@src/apis";
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useAndroidBackHandler } from "react-navigation-backhandler";
import NavigationService from "@navigation/NavigationService";
import { Alert } from "react-native";


export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    appointment: { appointmentDetail, groupAppointments = [] },
    bookAppointment: { isQuickCheckout },
    auth : { staff }
  } = useSelector(state => state);

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const route = useRoute();
  const isFocused = useIsFocused();

  const [, submitCheckoutAppointment] = useAxiosMutation({
    ...checkoutAppointment(),
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        NavigationService.navigate(screenNames.PaymentPage);
      }
    }
  });

  useAndroidBackHandler(() => {
    const routeName = route.name;
    if (routeName == screenNames.CheckoutScreen && isQuickCheckout) {
      // do something
      NavigationService.navigate(screenNames.AppointmentScreen);
      return true;
    }

    return false;
  });

  return {
    appointmentDetail,
    groupAppointments,
    roleName,
    selectPayment: async () => {
      if (Array.isArray(groupAppointments?.appointments) && groupAppointments?.appointments?.length > 1) {
        dispatch(
          app.setError({
            isError: true,
            messageError: "Harmone One is not pay multiple appointment. Please use Harmony POS app.",
            errorType: "error",
            titleError: "Alert",
          }));
      } else {
        const body = await checkoutAppointment(appointmentDetail?.appointmentId);
        submitCheckoutAppointment(body.params);
      }
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

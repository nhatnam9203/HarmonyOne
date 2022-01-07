import React from "react";
import NavigationService from "@navigation/NavigationService";
import { useSelector } from "react-redux";
import { useAndroidBackHandler } from "react-navigation-backhandler";
import { useRoute } from '@react-navigation/native';

export const useProps = ({
  route
}) => {

  const routeTest = useRoute();

  console.log({ routeName : routeTest.name });

  useAndroidBackHandler(() => {
    const routeName = useRoute().name;
    if (routeName == screenNames.CheckoutScreen) {
      // do something
      NavigationService.navigate(screenNames.AppointmentScreen);
      return true;
    }

    return false;
  });

  const {
    bookAppointment: { isAddMore }
  } = useSelector(state => state);

  return {
    isAddMore,

    onBack: () => {
      if (isAddMore) {
        NavigationService.navigate(screenNames.ReviewConfirm);
      } else {
        NavigationService.back();
      }
    }
  };
};

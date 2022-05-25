import React from "react";
import NavigationService from "@navigation/NavigationService";
import { useSelector } from "react-redux";
import { useAndroidBackHandler } from "react-navigation-backhandler";
import { useRoute } from '@react-navigation/native';

export const useProps = ({
  route
}) => {

  const routeTest = useRoute();
  const dialogActiveGiftCard = React.useRef();

  // useAndroidBackHandler(() => {
  //   const routeName = useRoute().name;
  //   if (routeName == screenNames.CheckoutScreen) {
  //     // do something
  //     NavigationService.navigate(screenNames.AppointmentScreen);
  //     return true;
  //   }

  //   return false;
  // });

  const {
    bookAppointment: { isAddMore }
  } = useSelector(state => state);

  return {
    isAddMore,
    dialogActiveGiftCard,

    showDialogGiftCard: () => {
      dialogActiveGiftCard?.current?.show();
    },

    onCheckGiftCardSucces: (data, serialNumber) => {
      dialogActiveGiftCard?.current?.hide();
      NavigationService.navigate(
        screenNames.EnterGiftCardAmount, {
        giftCardInfo: {
          ...data,
          name: "Gift card - " + serialNumber?.toString()?.substring(serialNumber?.toString()?.length - 4)
        }
      }
      );
    },

    onBack: () => {
      if (isAddMore) {
        NavigationService.navigate(screenNames.ReviewConfirm);
      } else {
        NavigationService.back();
      }
    }
  };
};

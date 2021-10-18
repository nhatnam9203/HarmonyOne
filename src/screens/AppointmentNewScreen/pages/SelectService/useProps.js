import React from "react";
import NavigationService from "@navigation/NavigationService";
import { useSelector } from "react-redux";

export const useProps = ({
  route
}) => {
  
  const {
    bookAppointment : { isAddMore }
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

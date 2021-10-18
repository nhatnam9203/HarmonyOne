import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointment } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";


export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    appointment: { appointmentDetail }
  } = useSelector(state => state);


  return {
    appointmentDetail,
    selectPayment: () => {
      NavigationService.navigate(screenNames.PaymentPage);
    }
  };
};

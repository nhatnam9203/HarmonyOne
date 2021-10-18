import React from "react";
import { } from '@src/apis';
import NavigationService from "@navigation/NavigationService";
import { bookAppointment } from "@redux/slices";
import { useDispatch, useSelector } from "react-redux";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    bookAppointment : { customerBooking }
  } = useSelector(state => state); 

  return {

    customerBooking,

    addCustomer: () => {
      NavigationService.navigate(screenNames.CustomersScreen, { isQuickCheckout: true });
      dispatch(bookAppointment.resetBooking());
      setTimeout(() => {
        dispatch(bookAppointment.setQuickCheckout(true));
      }, 300);
    },

    changeCustomer : () =>{
      NavigationService.navigate(screenNames.CustomersScreen, { isQuickCheckout: true });
    },

    deleteCustomer : () =>{
      dispatch(bookAppointment.setCustomerBooking({}));
    },

    addService : () =>{
      dispatch(bookAppointment.setQuickCheckout(true));
      NavigationService.navigate(screenNames.AppointmentNewScreen);
    }
  };
};

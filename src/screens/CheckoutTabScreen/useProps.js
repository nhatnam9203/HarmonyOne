import React from "react";
import { } from '@src/apis';
import NavigationService from "@navigation/NavigationService";
import { bookAppointment } from "@redux/slices";
import { useDispatch, useSelector } from "react-redux";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    bookAppointment: { customerBooking },
    auth: { staff }
  } = useSelector(state => state);

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  return {

    customerBooking,

    addCustomer: () => {
      if (roleName == "staff") {
        NavigationService.navigate(screenNames.CustomerNewRoleStaff, { isQuickCheckout: true });
      } else {
        NavigationService.navigate(screenNames.CustomersScreen, { isQuickCheckout: true });
      }

      dispatch(bookAppointment.resetBooking());
      setTimeout(() => {
        dispatch(bookAppointment.setQuickCheckout(true));
      }, 300);
    },

    changeCustomer: () => {
      if (roleName == "staff") {
        NavigationService.navigate(screenNames.CustomerNewRoleStaff, { isQuickCheckout: true, isChangeCustomer: true, customerId: customerBooking?.customerId });
      } else {
        NavigationService.navigate(screenNames.CustomersScreen, { isQuickCheckout: true });
      }
    },

    deleteCustomer: () => {
      dispatch(bookAppointment.setCustomerBooking({}));
    },

    addService: () => {
      dispatch(bookAppointment.setQuickCheckout(true));
      NavigationService.navigate(screenNames.AppointmentNewScreen);
    }
  };
};

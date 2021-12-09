import React from "react";
import NavigationService from "@navigation/NavigationService";
import { useAxiosQuery, getServiceByStaff } from '@src/apis';
import { bookAppointment, service } from "@redux/slices";
import { useDispatch, useSelector } from "react-redux";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    bookAppointment: { customerBooking },
    auth: { staff }
  } = useSelector(state => state);

  const [, submitGetServiceByStaff] = useAxiosQuery({
    ...getServiceByStaff(staff?.staffId),
    queryId: "getServiceByStaff_checkoutTabScreen",
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(service.setServiceByStaff(data));
      NavigationService.navigate(screenNames.AppointmentNewScreen);
    }
  });


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
      if (roleName == "staff") {
        submitGetServiceByStaff();
      } else {
        NavigationService.navigate(screenNames.AppointmentNewScreen);
      }
    }
  };
};

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment } from "@redux/slices";
import {
  addAppointment,
  useAxiosMutation,
  getAppointmentByDate,
  useAxiosQuery,
  getAppointmentById,
  addItemIntoAppointment,
  getGroupAppointmentById
} from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate },
    auth: { staff },

  } = useSelector(state => state);

  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
      if (isQuickCheckout) {
        NavigationService.navigate(screenNames.CheckoutScreen);
      } else {
        dialogBookingRef?.current?.show();
      }
    },
  });

  const [, submitAddAppointment] = useAxiosMutation({
    ...addAppointment(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const appointmentId = response?.data;
        setAppointmentId(appointmentId)
        const tempData = {
          services: servicesBooking,
          extras: extrasBooking.map(ex => ({ extraId: ex.extraId })),
          products: [],
          giftCards: [],
        }
        const body = await addItemIntoAppointment(appointmentId, tempData);
        submitAddItem(body.params);
      }
    }
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentIdUpdate),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.CheckoutScreen);
      }
    },
  });

  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentIdUpdate),
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
      }
    }
  });



  const [, submitAddItem] = useAxiosMutation({
    ...addItemIntoAppointment(),
    isLoadingDefault: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        if (isQuickCheckout) {
          fetchAppointmentById();
          fetchGroupApointmentById();
        }
      }
    },
  });

  return {
    customerBooking,
    servicesBooking,
    extrasBooking,
    dayBooking,
    timeBooking,
    dialogBookingRef,
    isQuickCheckout,

    getTotalItem: (service, itemType) => {
      let total = 0;
      total += parseInt(service[itemType])
      for (let i = 0; i < extrasBooking.length; i++) {
        if ((extrasBooking[i].serviceId == service.serviceId) && extrasBooking[i].checked) {
          total += extrasBooking[i][itemType];
        }
      }
      return total;
    },

    getTotalPrice: (service) => {
      let total = 0;
      total += formatNumberFromCurrency(service.price);
      for (let i = 0; i < extrasBooking.length; i++) {
        if ((extrasBooking[i].serviceId == service.serviceId) && extrasBooking[i].checked) {
          total += formatNumberFromCurrency(extrasBooking[i].price);
        }
      }
      return formatMoney(total);
    },

    getAllTotal: () => {
      let price = 0;
      let duration = 0;
      for (let i = 0; i < servicesBooking.length; i++) {
        price += formatNumberFromCurrency(servicesBooking[i].price);
        duration += servicesBooking[i].duration;
      }
      for (let i = 0; i < extrasBooking.length; i++) {
        if (extrasBooking[i].checked) {
          price += formatNumberFromCurrency(extrasBooking[i].price);
          duration += formatNumberFromCurrency(extrasBooking[i].duration);
        }
      }

      return {
        price: formatMoney(price),
        duration: convertMinsToHrsMins(duration),
      }
    },

    changeCustomer: () => {
      NavigationService.navigate(
        screenNames.CustomersScreen,
        { isBookAppointment: true, isReviewConfirm: true }
      );
    },

    deleteService: (service) => {
      dispatch(bookAppointment.deleteService(service))
    },

    changeDateTime: () => {
      NavigationService.navigate(screenNames.SelectDateTime);
    },

    addMore: () => {
      NavigationService.navigate(screenNames.SelectService, { isAddMore: true });
      dispatch(bookAppointment.updateStatusAddMore(true));
    },

    onPressBack: () => {
      if (isQuickCheckout) {
        NavigationService.navigate(screenNames.SelectStaff);
      } else {
        NavigationService.navigate(screenNames.SelectDateTime);
      }
    },

    confirm: async () => {

      const data = {
        staffId: servicesBooking[0].staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId || 0,
        fromTime: !isQuickCheckout ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A"),
        status: isQuickCheckout ? "checkin" : "confirm",
        categories: [],
        services: [],
        extras: [],
        products: [],
      }

      const body = await addAppointment(data);
      submitAddAppointment(body.params);
    },

    onOK: () => {
      NavigationService.navigate(screenNames.AppointmentScreen);
      setTimeout(() => {
        dispatch(bookAppointment.resetBooking());
      }, 800);
    }
  };
};

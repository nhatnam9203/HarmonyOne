import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment } from "@redux/slices";
import { addAppointment, useAxiosMutation, getBlockTimeByDate, useAxiosQuery, updateAppointment } from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate },
    auth: { staff }
  } = useSelector(state => state);


  const [, fetchBlockTimes] = useAxiosQuery({
    ...getBlockTimeByDate(dateToFormat(appointmentDate, "MM/DD/YYYY")),
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });

  const [, submitAddAppointment] = useAxiosMutation({
    ...addAppointment(),
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const appointmentId = response?.data;
        const data = getDataUpdate();
        const body = await updateAppointment(appointmentId, data);
        submitUpdateAppointment(body.params);
      }
    }
  });

  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchBlockTimes();
        dialogBookingRef?.current?.show();
      }
    }
  });

  const getDataUpdate = () => {
    const data = {
      staffId: servicesBooking[0].staffId,
      fromTime: `${dayBooking} ${timeBooking}`,
      status: isQuickCheckout ? "checkin" : "confirm",
      categories: [],
      services: servicesBooking,
      extras: extrasBooking.map(ex => ({ ...ex, status: 1 })),
      products: [],
      giftCards: []
    };
    return data;
  }

  return {
    customerBooking,
    servicesBooking,
    extrasBooking,
    dayBooking,
    timeBooking,
    dialogBookingRef,

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

    confirm: async () => {

      const data = {
        staffId: servicesBooking[0].staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId,
        fromTime: `${dayBooking} ${timeBooking}`,
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
    }
  };
};

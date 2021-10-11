import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins, updateAppointment } from "@shared/utils";
import { bookAppointment, appointment } from "@redux/slices";
import { addAppointment, useAxiosMutation, getBlockTimeByDate, useAxiosQuery } from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";


export const useProps = (_params) => {

  const dispatch = useDispatch();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking },
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
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchBlockTimes();
        NavigationService.navigate(screenNames.AppointmentScreen);
      }
    }
  });

  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        // fetchBlockTimes();
        // NavigationService.navigate(screenNames.AppointmentScreen);
      }
    }
  });

  return {
    customerBooking,
    servicesBooking,
    extrasBooking,
    dayBooking,
    timeBooking,

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
    },

    confirm: async () => {
      const data = {
        staffId: servicesBooking[0].staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId,
        fromTime: `${dayBooking} ${timeBooking}`,
        status: "checkin",
        categories: [],
        services: servicesBooking,
        extras: extrasBooking,
        products: [],
      }

      console.log({ data });

      const body = await addAppointment(data);
      submitAddAppointment(body.params);
    }
  };
};

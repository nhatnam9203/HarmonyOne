import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment, editAppointment } from "@redux/slices";
import { addAppointment, useAxiosMutation, getAppointmentByDate, useAxiosQuery, updateAppointment, getAppointmentById } from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate, appointmentDetail },
    editAppointment: { appointmentEdit },
    auth: { staff }
  } = useSelector(state => state);

  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);

  const test = moment().format("MM-DD-YYYY hh:mm A");

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
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


  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        if (isQuickCheckout) {
          fetchAppointmentById();
        }
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


  const getDataUpdate = () => {
    const data = {
      staffId: servicesBooking[0].staffId,
      fromTime: !isQuickCheckout ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A"),
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
    isQuickCheckout,
    appointmentDetail,
    appointmentEdit,

    getTotalItem: (service, itemType) => {
      let total = 0;
      total += parseInt(service[itemType])
      for (let i = 0; i < appointmentEdit.extras.length; i++) {
        if ((appointmentEdit.extras[i].bookingServiceId == service.bookingServiceId)) {
          total += appointmentEdit.extras[i][itemType];
        }
      }
      return total;
    },

    getTotalPrice: (service) => {
      let total = 0;
      total += formatNumberFromCurrency(service.price);
      for (let i = 0; i < appointmentEdit.extras.length; i++) {
        if ((appointmentEdit.extras[i].bookingServiceId == service.bookingServiceId)) {
          total += formatNumberFromCurrency(appointmentEdit.extras[i].price);
        }
      }
      return formatMoney(total);
    },


    getAllTotal: () => {
      let price = 0;
      let duration = 0;

      for (let i = 0; i < appointmentEdit?.services?.length; i++) {
        price += formatNumberFromCurrency(appointmentEdit?.services[i].price);
        duration += appointmentEdit?.services[i].duration;
      }

      for (let i = 0; i < appointmentEdit?.extras.length; i++) {
        if (appointmentEdit?.extras[i]) {
          price += formatNumberFromCurrency(appointmentEdit?.extras[i].price);
          duration += formatNumberFromCurrency(appointmentEdit?.extras[i].duration);
        }
      }

      return {
        price: formatMoney(price),
        duration: convertMinsToHrsMins(duration),
      }
    },


    deleteService: (service) => {
      if (service?.bookingServiceId) {
        dispatch(editAppointment.removeServiceBooking(service?.bookingServiceId));
      } else {
        dispatch(editAppointment.removeServiceAdded(service?.serviceId));
      }
    },


    onPressBack: () => {
      NavigationService.back();
    },

    addMoreService: () => {
      NavigationService.navigate(screenNames.AddServicePage);
    },

    confirm: async () => {

      const data = {
        staffId: servicesBooking[0].staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId,
        fromTime: !isQuickCheckout ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A"),
        status: isQuickCheckout ? "checkin" : "confirm",
        categories: [],
        services: [],
        extras: [],
        products: [],
      }

    },

    onOK: () => {
      NavigationService.navigate(screenNames.AppointmentScreen);
      setTimeout(() => {
        dispatch(bookAppointment.resetBooking());
      }, 800);
    },

    changeDateTime: (date) => {
      const formatDate = `${moment(date).format("YYYY-MM-DD")}T${moment(date).format("HH:mm")}:00`
      dispatch(editAppointment.changeDateTime(formatDate));
    },

    changeServiceTime: (time, bookingServiceId) => {
      const formatDate = `${moment().format("YYYY-MM-DD")}T${moment(time, ["hh:mm A"]).format("HH:mm")}:00`
      dispatch(editAppointment.changeServiceTime({ time: formatDate, bookingServiceId }));
    },


  };
};

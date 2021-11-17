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
  getGroupAppointmentById,
  updateAppointment
} from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], productsBooking = [], giftCardsBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate },
    auth: { staff },

  } = useSelector(state => state);

  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "etchAppointmentByDate_reviewConfirm",
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


  const reduceServices = (services, extras = []) => {
    for (let i = 0; i < services.length; i++) {
      if (i === 0) {
        services[i].fromTime = (!isQuickCheckout && timeBooking) ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A");

      } else if (i > 0) {
        let tempService = services[i - 1];
        services[i].fromTime = moment(tempService.fromTime).add('minutes', tempService.duration);
        const ex = extras.find(ex => ex.bookingServiceId === tempService.bookingServiceId);
        if (ex) {
          const duration = tempService.duration + ex.duration;
          services[i].fromTime = moment(tempService.fromTime).add('minutes', duration);
        }
        services[i].fromTime = `${moment(services[i].fromTime).format("YYYY-MM-DD")}T${moment(services[i].fromTime).format("HH:mm")}:00`;
      }
    }
    return services;
  }


  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    queryId: "fetchAppointmentById_reviewConfirm",
    isStopLoading: true,
    isLoadingDefault: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {

      }
    }
  });

  const [, submitAddAppointment] = useAxiosMutation({
    ...addAppointment(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const appointmentId = response?.data;
        setAppointmentId(appointmentId);
        const tempData = {
          services: servicesBooking,
          extras: extrasBooking.map(ex => ({ extraId: ex.extraId })),
          products: [],
          giftCards: giftCardsBooking.map((giftCard) => ({ giftCardId: giftCard?.giftCardId, price: giftCard?.price })),
        };
        const body = await addItemIntoAppointment(appointmentId, tempData);
        submitAddItem(body.params);
      }
    }
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentIdUpdate),
    queryId: "fetchAppointmentById_reviewConfirm",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(response?.data));

        const data = {
          staffId: response?.data.staffId,
          fromTime: response?.data.fromTime,
          status: response?.data.status,
          categories: response?.data.categories,
          services: reduceServices(
            [...response?.data.services].map(obj => ({ ...obj, fromTime : obj?.fromTime })),
            response?.data?.extras
          ),
          extras: response?.data.extras,
          products: response?.data.products,
          giftCards: response?.data.giftCards
        };

        const body = await updateAppointment(appointmentIdUpdate, data);
        submitUpdateAppointment(body.params);
      }
    },
  });

  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentIdUpdate),
    queryId: "fetchGroupApointmentById_reviewConfirm",
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
        NavigationService.navigate(screenNames.CheckoutScreen);
      }
    }
  });



  const [, submitAddItem] = useAxiosMutation({
    ...addItemIntoAppointment(),
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentById();
        fetchAppointmentByDate();
        if (isQuickCheckout) {
          fetchGroupApointmentById();
        }
      }
    },
  });

  return {
    customerBooking,
    servicesBooking,
    extrasBooking,
    productsBooking,
    giftCardsBooking,
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
      for (let i = 0; i < productsBooking.length; i++) {
        price += parseFloat(formatNumberFromCurrency(productsBooking[i].price)) * productsBooking[i].quantity;
      }
      for (let i = 0; i < extrasBooking.length; i++) {
        if (extrasBooking[i].checked) {
          price += formatNumberFromCurrency(extrasBooking[i].price);
          duration += formatNumberFromCurrency(extrasBooking[i].duration);
        }
      }
      for (let i = 0; i < giftCardsBooking.length; i++) {
        price += formatNumberFromCurrency(giftCardsBooking[i].price);
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
      dispatch(bookAppointment.deleteService(service));
    },

    deleteProduct: (product) => {
      dispatch(bookAppointment.deleteProduct(product));
    },

    deleteGiftCard: (giftCard) => {
      dispatch(bookAppointment.deleteGiftCard(giftCard))
    },

    changeDateTime: () => {
      if (servicesBooking?.length > 0) {
        NavigationService.navigate(screenNames.SelectDateTime, { isRefetchDate: true, staffSelected: { staffId: servicesBooking[0].staffId } });
      } else {
        NavigationService.navigate(screenNames.SelectDateTime);
      }
    },

    addMore: () => {
      NavigationService.navigate(screenNames.SelectService, { isAddMore: true });
      dispatch(bookAppointment.updateStatusAddMore(true));
    },

    onPressBack: () => {
      if (isQuickCheckout) {
        NavigationService.back()
      } else {
        NavigationService.navigate(screenNames.SelectDateTime);
      }
    },

    confirm: async () => {

      const data = {
        staffId: servicesBooking[0]?.staffId || staff?.staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId || 0,
        fromTime: (!isQuickCheckout && timeBooking) ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A"),
        status: isQuickCheckout ? "checkin" : "confirm",
        categories: [],
        services: [],
        extras: [],
        products: productsBooking,
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

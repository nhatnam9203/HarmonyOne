import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment, app } from "@redux/slices";
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
import useConfirmBooking from "./useConfirmBooking";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();

  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], productsBooking = [], giftCardsBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate },
    auth: { staff },

  } = useSelector(state => state);

  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);
  const [isDisabledConfirm, setDisabledConfirm] = React.useState(false);

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const [fetchAppointmentById] = useConfirmBooking({
    isQuickCheckout,
    timeBooking,
    dayBooking,
    appointmentIdUpdate
  });

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "etchAppointmentByDate_reviewConfirm",
    isStopLoading: true,
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
      if (!isQuickCheckout) {
        dispatch(app.hideLoading());
        dialogBookingRef?.current?.show();
      }
    },
    onLoginError: () => {
      setDisabledConfirm(false);
    }
  });


  const [, submitAddAppointment] = useAxiosMutation({
    ...addAppointment(),
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const appointmentId = response?.data;
        setAppointmentId(appointmentId);
        const tempData = {
          services: servicesBooking,
          extras: extrasBooking.map(ex => ({ extraId: ex.extraId })),
          products: productsBooking,
          giftCards: giftCardsBooking.map((giftCard) => ({ giftCardId: giftCard?.giftCardId, price: giftCard?.price })),
        };
        const body = await addItemIntoAppointment(appointmentId, tempData);
        submitAddItem(body.params);
      }
    },
    onLoginError: () => {
      setDisabledConfirm(false);
    }
  });


  const [, submitAddItem] = useAxiosMutation({
    ...addItemIntoAppointment(),
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        if (!isQuickCheckout && servicesBooking.length < 2) {
          dispatch(app.startSignalR());
          fetchAppointmentByDate();
        } else {
          fetchAppointmentById();
          fetchAppointmentByDate();
        }
      }
    },
    onLoginError: () => {
      setDisabledConfirm(false);
    }
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
    isDisabledConfirm,


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
      if (roleName == "staff") {
        NavigationService.navigate(
          screenNames.CustomerNewRoleStaff,
          { isBookAppointment: true, isReviewConfirm: true }
        );
      } else {
        NavigationService.navigate(
          screenNames.CustomersScreen,
          { isBookAppointment: true, isReviewConfirm: true }
        );
      }
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
        staffId: !isNaN(servicesBooking[0]?.staffId) ? servicesBooking[0]?.staffId : staff?.staffId,
        merchantId: staff?.merchantId,
        userId: 0,
        customerId: customerBooking?.customerId || 0,
        fromTime: (!isQuickCheckout && timeBooking) ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A"),
        status: (!isQuickCheckout || servicesBooking[0]?.staffId == 0) ? "confirm" : "checkin",
        categories: [],
        services: [],
        extras: [],
        giftCards: [],
        products: [],
      }

      dispatch(app.showLoading());
      dispatch(app.stopSignalR());
      setDisabledConfirm(true);
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

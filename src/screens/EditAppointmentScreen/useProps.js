import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment, editAppointment } from "@redux/slices";
import {
  addAppointment,
  useAxiosMutation,
  getAppointmentByDate,
  useAxiosQuery,
  updateAppointment,
  getAppointmentById,
  removeItemAppointment,
  addItemIntoAppointment,
} from "@src/apis";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();
  const alertRef = React.useRef();


  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate, appointmentDetail },
    editAppointment: { appointmentEdit },
    auth: { staff }
  } = useSelector(state => state);


  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);
  const [servicesBookingRemove, setServicesBookingRemove] = React.useState([]);
  const [extrasBookingRemove, setExtrasBookingRemove] = React.useState([]);
  const [productsBookingRemove, setProductsBookingRemove] = React.useState([]);


  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: false,
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });

  const [, submitRemoveItemAppointment] = useAxiosMutation({
    ...removeItemAppointment(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {

        const tempData = {
          services: appointmentEdit.services.filter(obj => !obj?.bookingServiceId && obj.status == 1),
          extras: appointmentEdit.extras.filter(obj => !obj?.bookingServiceId && obj.status == 1),
          products: [],
          giftCards: [],
        }

        const body = await addItemIntoAppointment(appointmentEdit?.appointmentId, tempData);
        submitAddItem(body.params);
      }
    }
  });

  const [, submitAddItem] = useAxiosMutation({
    ...addItemIntoAppointment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        alertRef?.current?.alertWithType('info', 'Update appointment', response?.message);
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    }
  });

  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const tempData = {
          services: servicesBookingRemove.map(sv => ({ bookingServiceId: sv.bookingServiceId })),
          extras: extrasBookingRemove.map(ex => ({ bookingExtraId: ex.bookingExtraId })),
          products: productsBookingRemove.map(pro => ({ bookingProductId: pro.bookingProductId })),   
          giftCards: [],
        }

        const body = await removeItemAppointment(appointmentEdit?.appointmentId, tempData);
        submitRemoveItemAppointment(body.params);
      }
    }
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentEdit?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.AppointmentDetailScreen);
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
    appointmentDetail,
    appointmentEdit,
    alertRef,

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

      for (let i = 0; i < appointmentEdit?.products.length; i++) {
        if (appointmentEdit?.products[i]) {
          price += parseFloat(formatNumberFromCurrency(appointmentEdit?.products[i].price)) * appointmentEdit?.products[i]?.quantity;
        }
      }

      for (let i = 0; i < appointmentEdit?.giftCards.length; i++) {
        price += formatNumberFromCurrency(appointmentEdit?.giftCards[i].price);
      }

      return {
        price: formatMoney(price),
        duration: convertMinsToHrsMins(duration),
      }
    },

    deleteProduct: async(product) => {
       dispatch(editAppointment.removeProduct(product?.productId));
       let arrTempProductRemoved = await [...productsBookingRemove];
       await arrTempProductRemoved.push(product);
       await setProductsBookingRemove(arrTempProductRemoved);
    },


    deleteService: async (service) => {
      if (service?.bookingServiceId) {
        let arrTempServicesRemove = await [...servicesBookingRemove];
        let arrTempExtrasRemove = await [...extrasBookingRemove];

        const extraBooking = appointmentEdit?.extras;
        const extrasWillBeReomved = await extraBooking.filter(obj => obj.bookingServiceId == service?.bookingServiceId);
        arrTempExtrasRemove = await [...arrTempExtrasRemove, ...extrasWillBeReomved];

        await arrTempServicesRemove.push(service);
        await setServicesBookingRemove(arrTempServicesRemove);
        await setExtrasBookingRemove(arrTempExtrasRemove);
        await dispatch(editAppointment.removeServiceBooking(service?.bookingServiceId));

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
        staffId: appointmentEdit.staffId,
        fromTime: appointmentEdit.fromTime,
        status: appointmentEdit.status,
        categories: appointmentEdit.categories,
        services: appointmentEdit.services.filter(obj => obj.bookingServiceId),
        extras: appointmentEdit.extras.filter(obj => obj.bookingServiceId),
        products: appointmentEdit.products,
        giftCards: appointmentEdit.giftCards
      };

      const body = await updateAppointment(appointmentEdit.appointmentId, data);
      submitUpdateAppointment(body.params);
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

    editService: (item) => {
      NavigationService.navigate(
        screenNames.AddServiceDetailPage,
        {
          item,
          isEditItem: true,
          extrasEdit: appointmentEdit?.extras
            .filter(
              ex => ex?.bookingServiceId ? ex?.bookingServiceId == item?.bookingServiceId :
                ex?.serviceId == item?.serviceId
            )
            .map(ex => ({ ...ex, name: ex?.extraName ?? ex?.name }))
        });
    }


  };
};

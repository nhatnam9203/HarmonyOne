import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import { bookAppointment, appointment, editAppointment, service, app } from "@redux/slices";
import {
  addAppointment,
  useAxiosMutation,
  getAppointmentByDate,
  useAxiosQuery,
  updateAppointment,
  getAppointmentById,
  removeItemAppointment,
  addItemIntoAppointment,
  getServiceByStaff,
  getAppointmentWaitingList,
  getBlockTimeByDate,
} from "@src/apis";
import { dateToFormat, guid } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";
import _ from "lodash";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const dialogBookingRef = React.useRef();
  const alertRef = React.useRef();


  const {
    bookAppointment: { customerBooking = {}, servicesBooking = [], extrasBooking = [], dayBooking, timeBooking, isQuickCheckout },
    appointment: { appointmentDate, appointmentDetail, blockTimes, listBlockTimes },
    editAppointment: { appointmentEdit },
    auth: { staff },
    staff: { staffListByMerchant = [] },
  } = useSelector(state => state);


  const [appointmentIdUpdate, setAppointmentId] = React.useState(0);
  const [servicesBookingRemove, setServicesBookingRemove] = React.useState([]);
  const [extrasBookingRemove, setExtrasBookingRemove] = React.useState([]);
  const [productsBookingRemove, setProductsBookingRemove] = React.useState([]);
  const [giftCardsBookingRemove, setGiftCardsBookingRemove] = React.useState([]);
  const roleName = staff?.roleName?.toString()?.toLowerCase();

  // const [{ }, getBlockTimes] = useAxiosQuery({
  //   ...getBlockTimeByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
  //   enabled: true,
  //   isStopLoading: true,
  //   onSuccess: (data, response) => {
  //     dispatch(appointment.setBlockTimes(data));
  //   },
  // });

  const [, submitGetServiceByStaff] = useAxiosQuery({
    ...getServiceByStaff(staff?.staffId),
    queryId: "getServiceByStaff_editAppointmentScreen",
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(service.setServiceByStaff(data));
      NavigationService.navigate(screenNames.AddServicePage);
    }
  });


  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "fetchAppointmentByDate_editAppointment",
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
        const tempData_Add = {
          services: appointmentEdit.services.filter(obj => !obj?.bookingServiceId && obj.status == 1),
          extras: appointmentEdit.extras.filter(obj => !obj?.bookingServiceId && obj.status == 1),
          products: appointmentEdit.products.filter(obj => !obj?.bookingProductId),
          giftCards: appointmentEdit.giftCards.filter(obj => !obj?.bookingGiftCardId),
        }

        if ((
          tempData_Add.services.length +
          tempData_Add.extras.length +
          tempData_Add.products.length +
          tempData_Add.giftCards.length
        ) > 0) {
          const body = await addItemIntoAppointment(appointmentEdit?.appointmentId, tempData_Add);
          submitAddItem(body.params);
        } else {
          fetchAppointment();
        }
      }
    }
  });

  const [, submitAddItem] = useAxiosMutation({
    ...addItemIntoAppointment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        alertRef?.current?.alertWithType('info', 'Update appointment', response?.message);
        fetchAppointment();
      }
    }
  });

  /************************************** GET APPOINTMENT WAITING LIST ***************************************/
  const [, requestGetWaitingList] = useAxiosQuery({
    ...getAppointmentWaitingList(),
    queryId: "getAppointmentWaitingList_wditAppointmentScreen",
    enabled: false,
    isStopLoading: true,
    isLoadingDefault : false,
    onSuccess: (data, response) => {
      dispatch(appointment.setAppointmentWaitingList(data));
    },
  });

  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    queryId: "edit_update_appointment",
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        requestGetWaitingList();
        const tempData = {
          services: servicesBookingRemove.map(sv => ({ bookingServiceId: sv.bookingServiceId })),
          extras: extrasBookingRemove.map(ex => ({ bookingExtraId: ex.bookingExtraId })),
          products: productsBookingRemove.map(pro => ({ bookingProductId: pro.bookingProductId })),
          giftCards: giftCardsBookingRemove.map(gift => ({ bookingGiftCardId: gift.bookingGiftCardId })),
        }

        if ((
          tempData.services.length +
          tempData.extras.length +
          tempData.products.length +
          tempData.giftCards.length
        ) > 0) {
          const body = await removeItemAppointment(appointmentEdit?.appointmentId, tempData);
          submitRemoveItemAppointment(body.params);
        } else {
          const tempData_Add = {
            services: appointmentEdit.services.filter(obj => !obj?.bookingServiceId && obj.status == 1),
            extras: appointmentEdit.extras.filter(obj => !obj?.bookingServiceId && obj.status == 1),
            products: appointmentEdit.products.filter(obj => !obj?.bookingProductId),
            giftCards: appointmentEdit.giftCards.filter(obj => !obj?.bookingGiftCardId),
          }

          if ((
            tempData_Add.services.length +
            tempData_Add.extras.length +
            tempData_Add.products.length +
            tempData_Add.giftCards.length
          ) > 0) {
            const body = await addItemIntoAppointment(appointmentEdit?.appointmentId, tempData_Add);
            submitAddItem(body.params);
          } else {
            fetchAppointment();
          }
        }
      }
    }
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentEdit?.appointmentId),
    queryId: "fetchAppointmentDetail_editAppointment",
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.AppointmentDetailScreen);
      }
    },
  });


  const fetchAppointment = () => {
    fetchAppointmentById();
    fetchAppointmentByDate();
    dispatch(app.startSignalR());
  }

  const handleConfirm = async() => {
    const data = {
      staffId: appointmentEdit.staffId,
      fromTime: appointmentEdit.fromTime,
      status: appointmentEdit.status,
      categories: appointmentEdit.categories,
      services: appointmentEdit.services.filter(sv => sv?.bookingServiceId),
      extras: appointmentEdit.extras.filter(sv => sv?.bookingExtraId),
      products: appointmentEdit.products.filter(sv => sv?.bookingProductId),
      giftCards: appointmentEdit.giftCards.filter(sv => sv?.bookingGiftCardId),
    };

    const body = await updateAppointment(appointmentEdit.appointmentId, data);
    submitUpdateAppointment(body.params);
    dispatch(app.stopSignalR());
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
    alertRef,
    roleName,
    staffListByMerchant,

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

    editProduct: (product) => {
      NavigationService.navigate(
        screenNames.AddProductDetailPage,
        {
          item: product, isEditItem: guid() + guid() + guid(),
        });
    },

    deleteProduct: async (product) => {
      dispatch(editAppointment.removeProduct(product?.productId));
      let arrTempProductRemoved = await [...productsBookingRemove];
      await arrTempProductRemoved.push(product);
      await setProductsBookingRemove(arrTempProductRemoved);
    },

    deleteGiftCard: async (giftCard) => {
      dispatch(editAppointment.removeGiftCard(giftCard));
      let arrrTempGiftCardsRemove = await [...giftCardsBookingRemove];
      await arrrTempGiftCardsRemove.push(giftCard);
      await setGiftCardsBookingRemove(arrrTempGiftCardsRemove);
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
      if (roleName == "staff") {
        submitGetServiceByStaff();
      } else {
        NavigationService.navigate(screenNames.AddServicePage);
      }
    },

    confirm: async () => {
      //validate from time of service is passed time
      const services = appointmentEdit.services.filter(sv => sv?.bookingServiceId)
      let validate = true
      let errorMessage = ""
      services.forEach(item => {

        if (moment(item?.fromTime, "YYYY-MM-DDTHH:mm:ss") < moment()) {
          validate = false;
          errorMessage = "This appointment is set for a time that has already passed. Do you still want to set this appointment at this time?"
          return
        }

       
      });

      if (!validate) {
        Alert.alert(
          `Warning`,
          errorMessage,
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            { text: 'Ok', onPress: () => {
              handleConfirm();
            } 
            }
          ],
          { cancelable: false }
        );
      } else {
        handleConfirm();
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

    changeStaffService: (staffId, serviceId) => {
      dispatch(editAppointment.changeStaffService({ staffId, serviceId }));
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

import React from 'react';
import { colors } from '@shared/themes';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import {
  updateAppointmentStatusRequest,
  updateAppointment,
  getAppointmentByDate,
  useAxiosMutation,
  useAxiosQuery,
  getAppointmentById,
  getPromotionAppointment,
  getGroupAppointmentById,
  getAppointmentWaitingList,
  updatePaidAppointment,
} from "@src/apis";

import { APPOINTMENT_STATUS, 
        getColorForStatus, 
        dateToFormat,
        formatNumberFromCurrency,
        formatMoney,
      } from '@shared/utils';
import { appointment, editAppointment, invoice, app } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { axios } from '@shared/services/axiosClient';

export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const {
    appointment: { appointmentDetail, appointmentDate },
    invoice: { invoiceViewAppointmentDetail },
    auth: { staff },
    staff: { staffsByDate = [] },
    editAppointment: { appointmentEdit },
  } = useSelector(state => state);

  const item = appointmentEdit;

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(0);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const getInvoiceDetail = async (checkoutId) => {
    dispatch(app.showLoading());
    const params = {
      url: `checkout/${checkoutId}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(invoice.setInvoiceDetail(response?.data?.data));
        NavigationService.navigate(screenNames.InvoiceDetailScreen, { isAppointmentDetail: true, appointmentItem });
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  const [{ }, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });


  const [, submitUpdatePaidAppointment] = useAxiosMutation({
    ...updatePaidAppointment(),
    isLoadingDefault: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      console.log('response', response)
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    },
  });

  /************************************** GET APPOINTMENT WAITING LIST ***************************************/
  const [, requestGetWaitingList] = useAxiosQuery({
    ...getAppointmentWaitingList(),
    queryId: "getAppointmentWaitingList_appointmentDetailScreen",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setAppointmentWaitingList(data));
    },
  });

  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentDetail?.appointmentId),
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
        NavigationService.navigate(screenNames.CheckoutScreen);
      }
    }
  });


  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(item?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
      }
    },
  });

  React.useEffect(() => {
    if (item) {
      console.log('edit appointment', item)
      setAppointmentItem(item);

      const tempColor = getColorForStatus(item?.status);
      setHeaderColor({
        headerColor: tempColor,
        headerTintColor: colors.white,
      });
    }
  }, [item]);

  return {
    appointmentItem,
    headerColor,
    invoiceViewAppointmentDetail,
    item,
    roleName,
    staffsByDate,
    getInvoiceDetail,
    updateAppointment: async () => {
      const data = {
        staffId: appointmentItem.staffId,
        services: appointmentEdit.services.filter(sv => sv?.bookingServiceId),
        extras: appointmentEdit.extras.filter(sv => sv?.bookingExtraId),
        products: appointmentEdit.products.filter(sv => sv?.bookingProductId),
        giftCards: appointmentEdit.giftCards.filter(sv => sv?.bookingGiftCardId),
      };

      const body = await updatePaidAppointment(appointmentItem.appointmentId, data);
      submitUpdatePaidAppointment(body.params);
    },
    getBarStyle: () => {
      return "dark-content";
    }

  };
};

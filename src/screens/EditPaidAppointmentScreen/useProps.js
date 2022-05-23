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
  getAppointmentWaitingList
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
    updatePaidAppointment: async () => {
     
    },

    assignOtherStaff: async (staffId) => {

      let tempServices = [...appointmentItem.services];

      tempServices = tempServices.map(sv => ({
        ...sv,
        staffId: staffId
      }));

      const data = {
        staffId: appointmentItem.staffId,
        fromTime: appointmentItem.fromTime,
        status: "checkin",
        categories: appointmentItem.categories,
        services: tempServices,
        extras: appointmentItem.extras,
        products: appointmentItem.products,
        giftCards: appointmentItem.giftCards
      };

      const body = await updateAppointment(appointmentItem.appointmentId, data);
      submitUpdateAppointment(body.params);
    },

    getBarStyle: () => {
      return "dark-content";
    }

  };
};

const nextStatus = {
  unconfirm: 'confirm',
  confirm: 'checkin',
};
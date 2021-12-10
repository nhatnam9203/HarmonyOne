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
  getGroupAppointmentById
} from "@src/apis";

import { APPOINTMENT_STATUS, getColorForStatus, dateToFormat } from '@shared/utils';
import { appointment, editAppointment, invoice, app } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { axios } from '@shared/services/axiosClient';

const NoNeedEdit = [
  APPOINTMENT_STATUS.PAID,
  APPOINTMENT_STATUS.COMPLETE,
  APPOINTMENT_STATUS.CANCEL,
  APPOINTMENT_STATUS.VOID,
  APPOINTMENT_STATUS.REFUND,
  APPOINTMENT_STATUS.NOSHOW,
  APPOINTMENT_STATUS.WAITING
];

export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const {
    appointment: { appointmentDetail, appointmentDate },
    invoice: { invoiceViewAppointmentDetail },
    auth: { staff }
  } = useSelector(state => state);

  const item = appointmentDetail;

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });
  const [canEdit, setCanEdit] = React.useState(false);
  const [isShowButton , setShowButton] = React.useState(true);

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


  const [, submitUpdateAppointmentStatus] = useAxiosMutation({
    ...updateAppointmentStatusRequest(),
    isLoadingDefault: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    },
  });

  const [, submitUpdateAppointment] = useAxiosMutation({
    ...updateAppointment(),
    queryId: "updateAppointment_appointmentDetailScreen",
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    }
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
      if (item?.staffId == 0) {
        if(item?.status == "checkin"){
          setShowButton(false);
        }
      }
      setCanEdit(!NoNeedEdit.includes(item?.status));

      switch (`${item?.status}`.toLowerCase()) {
        case 'confirm':
        case 'unconfirm':
        case 'waiting':
        case 'no show':
          setHeaderColor({
            headerColor: tempColor,
            headerTintColor: colors.greyish_brown_40,
          });
          break;
        case "cancel":
          setHeaderColor({
            headerColor: "red",
            headerTintColor: colors.white,
          });
          break
        default:
          setHeaderColor({
            headerColor: tempColor,
            headerTintColor: colors.white,
          });
          break;
      }
    }
  }, [item]);

  const checkOut = () => {
    fetchGroupApointmentById();
  }

  return {
    appointmentItem,
    headerColor,
    canEdit,
    invoiceViewAppointmentDetail,
    item,
    roleName,
    isShowButton,
    getInvoiceDetail,

    getActionSheets: () => [
      {
        id: 'edit-appointment',
        label: t('Edit Appointment'),
        func: () => {
          dispatch(editAppointment.setAppointentEdit(appointmentDetail))
          NavigationService.navigate(screenNames.EditAppointmentScreen);
        },
      },
      {
        id: 'cancel-appointment',
        label: t('Cancel Appointment'),
        textColor: colors.red,
        func: async () => {
          const data = {
            status: 'cancel'
          }
          const body = await updateAppointmentStatusRequest(appointmentItem?.appointmentId, data);
          submitUpdateAppointmentStatus(body.params);
        },
      },
    ],

    updateNextStatus: async () => {
      if (appointmentItem.status == "checkin") {
        checkOut();
      } else {

        const data = {
          staffId: appointmentItem.staffId,
          fromTime: appointmentItem.fromTime,
          status: nextStatus[appointmentItem?.status],
          categories: appointmentItem.categories,
          services: appointmentItem.services,
          extras: appointmentItem.extras,
          products: appointmentItem.products,
          giftCards: appointmentItem.giftCards
        };

        const body = await updateAppointment(appointmentItem.appointmentId, data);
        submitUpdateAppointment(body.params);
      }
    },

    getBarStyle: () => {
      switch (item?.status) {
        case "cancel":
        case "checkin":
        case "paid":
        case "void":
        case "refund":
          return "light-content";

        default:
          return "dark-content";
      }
    }

  };
};

const nextStatus = {
  unconfirm: 'confirm',
  confirm: 'checkin',
};
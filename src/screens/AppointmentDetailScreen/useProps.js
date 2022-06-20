import React from 'react';
import { colors } from '@shared/themes';
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

import { APPOINTMENT_STATUS, getColorForStatus, dateToFormat } from '@shared/utils';
import { appointment, editAppointment, invoice, app } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { axios } from '@shared/services/axiosClient';
import {translate} from "@localize";

const NoNeedEdit = [
  // APPOINTMENT_STATUS.PAID,
  // APPOINTMENT_STATUS.COMPLETE,
  APPOINTMENT_STATUS.CANCEL,
  APPOINTMENT_STATUS.VOID,
  APPOINTMENT_STATUS.REFUND,
  APPOINTMENT_STATUS.NOSHOW,
];

export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();

  const {
    appointment: { appointmentDetail, appointmentDate },
    invoice: { invoiceViewAppointmentDetail },
    auth: { staff },
    staff: { staffsByDate = [] },
  } = useSelector(state => state);

  const item = appointmentDetail;

  const [isEditPaidAppointment, setIsEditPaidAppointment] = React.useState(false);
  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });
  const [canEdit, setCanEdit] = React.useState(false);
  const [isShowButton, setShowButton] = React.useState(true);

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

  /************************************** GET APPOINTMENT WAITING LIST ***************************************/
  const [, requestGetWaitingList] = useAxiosQuery({
    ...getAppointmentWaitingList(),
    queryId: "getAppointmentWaitingList_appointmentDetailScreen",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setAppointmentWaitingList(data));
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
        if (item?.status == "waiting") {
          requestGetWaitingList();
        }
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
      if (item?.staffId == 0 && item?.status == "checkin") {
        setShowButton(false);
      } else {
        setShowButton(true);
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
    isEditPaidAppointment,
    appointmentItem,
    headerColor,
    canEdit,
    invoiceViewAppointmentDetail,
    item,
    roleName,
    isShowButton,
    staffsByDate,
    getInvoiceDetail,
    getActionSheets: () => {
      return appointmentItem?.status != APPOINTMENT_STATUS.PAID 
            && appointmentItem?.status != APPOINTMENT_STATUS.COMPLETE ? [
        {
          id: 'edit-appointment',
          label: translate('txtEditAppointment'),
          func: () => {
            dispatch(editAppointment.setAppointentEdit(appointmentDetail))
            NavigationService.navigate(screenNames.EditAppointmentScreen);
          },
        },
        {
          id: 'cancel-appointment',
          label: translate('txtCancelAppointment'),
          textColor: colors.red,
          func: async () => {
            const data = {
              status: 'cancel'
            }
            const body = await updateAppointmentStatusRequest(appointmentItem?.appointmentId, data);
            submitUpdateAppointmentStatus(body.params);
          },
        },
      ] 
      : [
        {
          id: 'edit-appointment',
          label: translate('txtEditAppointment'),
          func: () => {
            setIsEditPaidAppointment(true)
            dispatch(editAppointment.setAppointentEdit(appointmentDetail))
            NavigationService.navigate(screenNames.EditPaidAppointmentScreen);
          },
        },
       ]
    },

    updateNextStatus: async () => {
      if (appointmentItem.status == "complete" 
        || appointmentItem.status == "paid") {
          setIsEditPaidAppointment(false);


      } else if (appointmentItem.status == "checkin") {
        if (appointmentItem?.staffId) {
          checkOut();
        } else return;
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

    checkInWaitigList: async (staffId) => {
      let tempServices = [...appointmentItem.services];

      tempServices = tempServices.map(sv => ({
        ...sv,
        staffId: staffId
      }));

      const data = {
        staffId: staffId,
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

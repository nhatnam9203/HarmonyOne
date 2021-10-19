import React from 'react';
import { colors } from '@shared/themes';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import {
  updateAppointmentStatusRequest,
  getAppointmentByDate,
  useAxiosMutation,
  useAxiosQuery,
  getAppointmentById,
  getPromotionAppointment,
} from "@src/apis";

import { APPOINTMENT_STATUS, getColorForStatus, dateToFormat } from '@shared/utils';
import { appointment, editAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

const NoNeedEdit = [
  APPOINTMENT_STATUS.PAID,
  APPOINTMENT_STATUS.COMPLETE,
  APPOINTMENT_STATUS.CANCEL,
  APPOINTMENT_STATUS.VOID,
  APPOINTMENT_STATUS.REFUND,
  APPOINTMENT_STATUS.NOSHOW,
];

export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const {
    appointment: { appointmentDetail, appointmentDate }
  } = useSelector(state => state);

  const item = appointmentDetail;

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });
  const [canEdit, setCanEdit] = React.useState(false);


  const [{ }, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });


  const [, submitUpdateAppointmentStatus] = useAxiosMutation({
    ...updateAppointmentStatusRequest(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    },
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
    NavigationService.navigate(screenNames.CheckoutScreen);
  }

  return {
    appointmentItem,
    headerColor,
    canEdit,
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
          status: nextStatus[appointmentItem?.status]
        }
        const body = await updateAppointmentStatusRequest(appointmentItem?.appointmentId, data);
        submitUpdateAppointmentStatus(body.params);
      }
    },

  };
};

const nextStatus = {
  unconfirm: 'confirm',
  confirm: 'checkin',
};
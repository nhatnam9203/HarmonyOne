import React from 'react';
import { colors } from '@shared/themes';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { updateAppointmentStatusRequest, useAxiosMutation } from "@src/apis";
import { APPOINTMENT_STATUS, getColorForStatus } from '@shared/utils';
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
  const [t] = useTranslation();

  const {
    appointment: { appointmentDetail }
  } = useSelector(state => state);

  const item = appointmentDetail;

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });
  const [canEdit, setCanEdit] = React.useState(false);


  const [, submitUpdateAppointmentStatus] = useAxiosMutation({
    ...updateAppointmentStatusRequest(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        route?.params?.refreshFromScreen();
        NavigationService.navigate(screenNames.AppointmentScreen);
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
          setHeaderColor({
            headerColor: tempColor,
            headerTintColor: colors.greyish_brown_40,
          });
          break;
        default:
          setHeaderColor({
            headerColor: tempColor,
            headerTintColor: colors.white,
          });
          break;
      }
    }
  }, [item]);


  return {
    appointmentItem,
    headerColor,
    canEdit,
    getActionSheets: () => [
      {
        id: 'edit-appointment',
        label: t('Edit Appointment'),
        func: () => { },
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
  };
};

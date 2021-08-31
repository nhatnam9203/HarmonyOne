import { colors } from '@shared/themes';
import { APPOINTMENT_STATUS, getColorForStatus } from '@shared/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NoNeedEdit = [
  APPOINTMENT_STATUS.PAID,
  APPOINTMENT_STATUS.COMPLETE,
  APPOINTMENT_STATUS.CANCEL,
];

export const useProps = ({
  route: {
    params: { item },
  },
}) => {
  const [t] = useTranslation();

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });
  const [canEdit, setCanEdit] = React.useState(false);

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
        func: () => {},
      },
      {
        id: 'cancel-appointment',
        label: t('Cancel Appointment'),
        textColor: colors.red,
        func: () => {},
      },
    ],
  };
};

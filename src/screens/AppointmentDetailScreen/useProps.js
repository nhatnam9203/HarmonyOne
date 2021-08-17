import { colors } from '@shared/themes';
import { getColorForStatus } from '@shared/utils';
import React from 'react';

export const useProps = ({
  route: {
    params: { item },
  },
}) => {
  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });

  React.useEffect(() => {
    if (item) {
      setAppointmentItem(item);

      const tempColor = getColorForStatus(item?.status);

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

  return { appointmentItem, headerColor };
};

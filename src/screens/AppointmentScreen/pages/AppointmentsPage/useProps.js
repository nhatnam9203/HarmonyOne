import { useAxiosQuery, appointmentStaffByDateRequest } from '@src/apis';
import { useSelector } from 'react-redux';
import React from 'react';
import { dateToFormat, DATE_TIME_REQUEST_FORMAT_STRING } from '@shared/utils';

export const useProps = ({ navigation }) => {
  const { staffId } = useSelector((state) => state.auth.staff);

  const [items, setItems] = React.useState(null);

  const [selectDate, setSelectedDate] = React.useState(
    dateToFormat(new Date(), DATE_TIME_REQUEST_FORMAT_STRING),
  );

  const [, getAppointmentStaffByDate] = useAxiosQuery({
    ...appointmentStaffByDateRequest(staffId, selectDate),
    onLoginSuccess: (data) => {
      setItems(data);
    },
  });

  React.useEffect(() => {
    if (selectDate) {
      getAppointmentStaffByDate();
    }
  }, [getAppointmentStaffByDate, selectDate]);

  return {
    items,
    onChangeWeekText: (text) => {
      navigation.setOptions({
        tabBarLabel: text,
      });
    },
    onDateSelected: (date) => {
      setSelectedDate(dateToFormat(date, DATE_TIME_REQUEST_FORMAT_STRING));
    },
  };
};

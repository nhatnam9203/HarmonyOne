import { useGetAppointmentStaffByDate } from '@src/apis';
import { useSelector } from 'react-redux';
import React from 'react';
import { dateToFormat, DATE_TIME_REQUEST_FORMAT_STRING } from '@shared/utils';

export const useProps = ({ navigation }) => {
  const { staffId } = useSelector((state) => state.auth.staff);
  const [selectDate, setSelectedDate] = React.useState(
    dateToFormat(new Date(), DATE_TIME_REQUEST_FORMAT_STRING),
  );

  const [, appointmentStaffByDate] = useGetAppointmentStaffByDate({
    staffId: staffId,
    date: selectDate,
    isUseAppLoading: true,
    onLoginSuccess: (data) => {},
  });

  React.useEffect(() => {
    if (selectDate) {
      console.log(selectDate);
      appointmentStaffByDate();
    }
  }, [selectDate]);

  return {
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

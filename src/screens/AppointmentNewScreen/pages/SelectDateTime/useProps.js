import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from "@navigation/NavigationService";
import { isEmpty } from "lodash";
import { bookAppointment } from "@redux/slices";

export const useProps = ({
  route
}) => {

  const dispatch = useDispatch();

  const staffSelected = route?.params?.staffSelected;
  const isRefetchDate = route?.params?.isRefetchDate;

  const calendarRef = React.useRef();
  const timePickerRef = React.useRef();

  const {
    bookAppointment: { staffsOfService = [], timesAvailable },
    merchant : { merchantDetail },
  } = useSelector(state => state);

  return {
    timesAvailable,
    staffSelected,
    calendarRef,
    timePickerRef,
    isRefetchDate,
    merchantDetail,

    goToReview: () => {
      const timePicker = timePickerRef.current?.getTimePicker();
      const daySelect = calendarRef?.current?.getDaySelect();
 
      if (isEmpty(timePicker)) {
        alert('Please select Date & Time');
        return;
      }

      dispatch(bookAppointment.setTimeBooking(timePicker));
      dispatch(bookAppointment.setDayBooking(daySelect));
      NavigationService.navigate(screenNames.ReviewConfirm);
    }
  };
};

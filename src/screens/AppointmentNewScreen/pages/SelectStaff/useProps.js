import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { staffGetAvaiableTime, useAxiosMutation } from "@src/apis";
import { bookAppointment } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";

export const useProps = (_params) => {

  const dispatch = useDispatch();

  const [,submitGetStaffAvailable] = useAxiosMutation({
    ...staffGetAvaiableTime(),
    onSuccess: (data, response) => {
      console.log({ response })
      if (response.codeNumber == 200) {
        dispatch(bookAppointment.setTimesAvailable(data));
        NavigationService.navigate(screenNames.SelectDateTime);
      }
    }
  })

  const {
    bookAppointment: { staffsOfService = [] },
    auth : { staff }
  } = useSelector(state => state);

  return {
    staffsOfService,
    goToDateTime: async() => {
      const staffId = "";
      const data = {
        date : moment().format("YYYY-MM-DD"),
        merchantId : staff?.merchantId,
        appointmentId: 0,
        timezone : new Date().getTimezoneOffset(),
      };
      const body = await staffGetAvaiableTime(staff?.staffId, data);
      submitGetStaffAvailable(body.params);
    }
  };
};

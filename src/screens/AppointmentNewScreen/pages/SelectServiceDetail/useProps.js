import React from "react";
import NavigationService from "@navigation/NavigationService";
import { getStaffOfService, useAxiosQuery } from "@src/apis";
import { bookAppointment } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";


export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();

  const item = route?.params?.item;

  const [, fetchStaffAvaiable] = useAxiosQuery({
    ...getStaffOfService(item?.serviceId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(bookAppointment.setStafsfOfService(data));
        NavigationService.navigate(screenNames.SelectStaff);
      }
    }
  })

  return {
    item,

    goToSelectStaff: () => {
      fetchStaffAvaiable();
    }

  };
};

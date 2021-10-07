import React from "react";
import {
  useAxiosQuery, getService, getCategoryByMerchant,
  getProduct, getExtra, getStaffByDate,
  appointmentStaffByDateRequest,
  getBlockTimeByDate,
} from '@src/apis';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { service, product, category, extra, staff, appointment } from '@redux/slices';
import { dateToFormat } from "@shared/utils";
import moment from "moment";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const staffInfo = useSelector(state => state.auth.staff);

  const [date, setDate] = React.useState(new Date);
  const [visibleDatePicker, setVisibleDatePicker] = React.useState(false);
  const [staffSelected, setStaffSelected] = React.useState("");
  const [blockTimesVisibile, setBlockTimesVisible] = React.useState([]);

  const {
    staff: { staffsByDate = [] },
    appointment: { appointmentsByDate = [], blockTimes = [] },
  } = useSelector(state => state);




  const [, getAppointmentStaffByDate] = useAxiosQuery({
    ...appointmentStaffByDateRequest(staffInfo?.staffId, moment().format("MM/DD/YYYY")),
    enabled: true,
    onSuccess: (data) => {
      dispatch(appointment.setAppointmentsByDate(data));
    },
  });

  const [, getServiceList] = useAxiosQuery({
    ...getService(),
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(service.setServiceList(data));
    },
  });

  const [, getProductList] = useAxiosQuery({
    ...getProduct(),
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(product.setProductList(data));
    },
  });

  const [, getExtraList] = useAxiosQuery({
    ...getExtra(),
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(extra.setExtraList(data));
    },
  });

  const [, getCategoryList] = useAxiosQuery({
    ...getCategoryByMerchant(staffInfo?.merchantId),
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(category.setCategoryList(data));
    },
  });

  const [,] = useAxiosQuery({
    ...getStaffByDate(staffInfo?.merchantId, dateToFormat(date, "MM/DD/YYYY")),
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(staff.setStaffByDate(data));
    },
  });

  const [,] = useAxiosQuery({
    ...getBlockTimeByDate(dateToFormat(date, "MM/DD/YYYY")),
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });



  React.useEffect(() => {
    if (staffSelected) {
      let temp = blockTimes.filter(blockTime => blockTime?.staffId == staffSelected);
      setBlockTimesVisible(temp);
    } else {
      setBlockTimesVisible(blockTimes);
    }
  }, [staffSelected, date, blockTimes]);

  React.useEffect(() => {
    getCategoryList();
    getServiceList();
    getProductList();
    getExtraList();
  }, []);


  return {
    staffsByDate,
    appointmentsByDate,
    blockTimesVisibile,
    date,
    setDate,
    visibleDatePicker,
    setVisibleDatePicker,
    staffSelected,

    selectStaff: (staffId) => {
      if (staffId == staffSelected) {
        setStaffSelected("");
      } else
        setStaffSelected(staffId)
    }
  };
};

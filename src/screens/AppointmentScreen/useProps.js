import React from "react";
import {
  useAxiosQuery,
  getService,
  getCategoryByMerchant,
  getProduct,
  getExtra,
  getStaffByDate,
  appointmentStaffByDateRequest,
  getBlockTimeByDate,
  getAppointmentById
} from '@src/apis';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { service, product, category, extra, staff, appointment } from '@redux/slices';
import { dateToFormat } from "@shared/utils";
import moment from "moment";
import NavigationService from '@navigation/NavigationService';


export const useProps = (_params) => {
  const dispatch = useDispatch();
  const staffInfo = useSelector(state => state.auth.staff);

  const [visibleDatePicker, setVisibleDatePicker] = React.useState(false);
  const [staffSelected, setStaffSelected] = React.useState("");
  const [blockTimesVisibile, setBlockTimesVisible] = React.useState([]);
  const [appointmentDetailId, setAppointmentDetailId] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);

  const setDate = (date) => {
    if (dateToFormat(date, "MM/DD/YYYY") == dateToFormat(appointmentDate, "MM/DD/YYYY")) {
      fetchBlockTimes();
    } else {
      dispatch(appointment.setAppointmentDate(date));
    }
  }

  const {
    staff: { staffsByDate = [] },
    appointment: { appointmentsByDate = [], blockTimes = [], appointmentDetail, appointmentDate },
  } = useSelector(state => state);


  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentDetailId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.AppointmentDetailScreen, { refreshFromScreen });
      }
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
    ...getStaffByDate(staffInfo?.merchantId, dateToFormat(appointmentDate, "MM/DD/YYYY")),
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(staff.setStaffByDate(data));
    },
  });

  const [, fetchBlockTimes] = useAxiosQuery({
    ...getBlockTimeByDate(dateToFormat(appointmentDate, "MM/DD/YYYY")),
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
      setRefresh(false);
    },
  });

  const refreshFromScreen = () => {
    fetchBlockTimes();
  }


  /************************************** GET LIST BLOCK TIMES  ***************************************/
  React.useEffect(() => {
    if (staffSelected) {
      let temp = blockTimes.filter(blockTime => blockTime?.staffId == staffSelected);
      setBlockTimesVisible(temp);
    } else {
      setBlockTimesVisible(blockTimes);
    }
  }, [staffSelected, appointmentDate, blockTimes]);


  /************************************** REFRESH BLOCK TIMES  ***************************************/
  React.useEffect(() => {
    if (isRefresh) {
      fetchBlockTimes();
    }
  }, [isRefresh]);


  /************************************** GET APPOINTMENT DETAIL  ***************************************/
  React.useEffect(() => {
    if (appointmentDetailId) {
      fetchAppointmentById();
    }
  }, [appointmentDetailId]);


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
    date: appointmentDate,
    setDate,
    visibleDatePicker,
    setVisibleDatePicker,
    staffSelected,
    isRefresh,

    onRefresh: () => {
      setRefresh(true);
    },

    selectStaff: (staffId) => {
      if (staffId == staffSelected) {
        setStaffSelected("");
      } else
        setStaffSelected(staffId)
    },

    onChangeAppointmentId: (appointmentId) => {
      if (appointmentId == appointmentDetailId) {
        fetchAppointmentById();
      } else {
        setAppointmentDetailId(appointmentId);
      }
    },
  };
};

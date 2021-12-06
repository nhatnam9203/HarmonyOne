import React from 'react';
import {
  useAxiosQuery,
  getService,
  getCategoryByMerchant,
  getProduct,
  getExtra,
  appointmentStaffByDateRequest,
  getAppointmentByDate,
  getAppointmentById,
  getMerchantById,
  getCountUnReadOfNotification,
  getStaffByMerchant,
  getStateCity,
  getNotifyRoleStaff,
  
} from '@src/apis';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  service,
  product,
  category,
  extra,
  staff,
  appointment,
  bookAppointment,
  merchant,
  notification,
  invoice,
  app,
  customer
} from '@redux/slices';
import { dateToFormat } from '@shared/utils';
import { axios } from '@shared/services/axiosClient';
import moment from 'moment';
import NavigationService from '@navigation/NavigationService';
import { isEmpty, set } from "lodash";
import { Alert } from 'react-native';

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const staffInfo = useSelector((state) => state.auth.staff);

  const [visibleDatePicker, setVisibleDatePicker] = React.useState(false);
  const [staffSelected, setStaffSelected] = React.useState('');
  const [firstLoading, setFirstLoading] = React.useState(true);
  const appointmentListRef = React.useRef();
  const staffListRef = React.useRef();

  const {
    staff: { staffsByDate = [] },
    appointment: {
      appointmentsByDate = [],
      appointmentDetail,
      appointmentDate,
    },
  } = useSelector((state) => state);

  const roleName = staffInfo?.roleName?.toString()?.toLowerCase();

  const [, fetchCountUnread] = useAxiosQuery({
    ...getCountUnReadOfNotification(),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      dispatch(notification.setCountUnread(data));
    },
  });


  const [, fetchStateCity] = useAxiosQuery({
    ...getStateCity(),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(customer.setStateCity(data))
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


  /************************************** fetchCountUnreadRoleStaff ***************************************/
  const [, fetchCountUnreadRoleStaff] = useAxiosQuery({
    ...getNotifyRoleStaff(staffInfo?.staffId, 1),
    queryId: "fetchCountUnreadRoleStaff_AppointmentScreen",
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(notification.setCountUnread_roleStaff({
        ...response,
      }));
    },
  });

  /************************************** GET MERCHANT INFO ***************************************/
  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staffInfo?.merchantId),
    queryId: "fetchMerchantById_appointmentScreen",
    isLoadingDefault: false,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(merchant.setMerchantDetail(data));
      setFirstLoading(false);
    },
  });

  /************************************** GET STAFFS OF MERCHANT ***************************************/
  const [, fetchStaffList] = useAxiosQuery({
    ...getStaffByMerchant(staffInfo?.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(staff.setStaffListByMerchant(data));
    },
  });

  React.useEffect(() => {
    if (isEmpty(staffSelected)) {
      setStaffSelected(staffInfo?.staffId);
      setTimeout(() => {
        appointmentListRef?.current?.setStaffSelected(staffInfo?.staffId);
      }, 500);
    }
  }, [staffInfo]);


  React.useEffect(() => {
    getCategoryList();
    getServiceList();
    getProductList();
    getExtraList();
    fetchMerchantById();
    if (roleName == "admin" || roleName == "manager") {
      fetchCountUnread();
    } else {
      fetchCountUnreadRoleStaff();
    }
    fetchStaffList();
    fetchStateCity();
  }, []);

  return {
    staffsByDate,
    date: appointmentDate,
    visibleDatePicker,
    setVisibleDatePicker,
    staffSelected,
    isLoading: firstLoading,
    appointmentListRef,
    staffListRef,
    staffInfo,


    selectStaff: (staffId) => {
      if (staffId == staffSelected) {
        setStaffSelected('');
        appointmentListRef?.current?.setStaffSelected('')
      } else {
        setStaffSelected(staffId);
        appointmentListRef?.current?.setStaffSelected(staffId)
      }
    },

    addAppointment: () => {
      if (roleName == "staff") {
        NavigationService.navigate(screenNames.CustomerNewRoleStaff, {
          isBookAppointment: true,
        });
      } else {
        NavigationService.navigate(screenNames.CustomersScreen, {
          isBookAppointment: true,
        });
      }
      dispatch(bookAppointment.resetBooking());
    },
  };
};


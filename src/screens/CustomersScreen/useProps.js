import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, getListCustomer } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from '@react-navigation/native';
import { customer, bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

  const dispatch = useDispatch();

  const isBookAppointment = props?.route?.params?.isBookAppointment;
  const isQuickCheckout = props?.route?.params?.isQuickCheckout;
  const isReviewConfirm = props?.route?.params?.isReviewConfirm;


  const [valueSearch, setValueSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isLoadingDefault, setLoadingDefault] = React.useState(true);
  const [isAddCustomer, setIsAddCustomer] = React.useState(false);

  const {
    customer: { customerList = [], pages },
    auth: { staff }
  } = useSelector(state => state);

  const navigation = useNavigation();

  const [isLoading, refetch] = useAxiosQuery({
    ...getListCustomer(valueSearch, currentPage),
    isLoadingDefault,
    enabled: true,
    onSuccess: (data, response) => {

      if (isAddCustomer) {
        dispatch(customer.setCustomerList({
          ...response,
          data: [
            { ...data[0] }
          ],
          currentPage
        }));
        setLoadingDefault(false);
        setIsAddCustomer(false);
      } else {
        if ((isQuickCheckout || isBookAppointment) && roleName == "staff") {
          if (valueSearch.length < 4) {
            dispatch(customer.setCustomerList({
              ...response,
              data: [],
              currentPage
            }));
            setLoadingDefault(false);
          } else {
            dispatch(customer.setCustomerList({
              ...response,
              currentPage
            }));
            setLoadingDefault(false);
          }
        } else {
          dispatch(customer.setCustomerList({
            ...response,
            currentPage
          }));
          setLoadingDefault(false);
        }
      }
    },
  });

  const refreshFromScreen = () => {
    setLoadingDefault(true);
    if ((isQuickCheckout || isBookAppointment) && roleName == "staff") {
      setIsAddCustomer(true);
    }
    setRefresh(true);
    setCurrentPage(1);
    setValueSearch("");
  }

  React.useEffect(() => {
    if (isRefresh) {
      refetch();
    }
    setRefresh(false);
  }, [isRefresh, currentPage]);

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  return {
    valueSearch,
    customerList,
    isRefresh,
    isLoading,
    currentPage,
    isBookAppointment,
    isReviewConfirm,
    isQuickCheckout,
    roleName,

    refreshFromScreen,

    addCustomer: () => {
      navigation.push(screenNames.CustomerNewScreen, {
        refreshFromScreen
      });
    },

    onChangeSearch: (value) => {
      setValueSearch(value);
      setCurrentPage(1);
    },

    newCustomer: () => {
      navigation.push(screenNames.CustomerNewScreen, {
        refreshFromScreen
      });
    },

    loadMoreCustomerList: () => {
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
      }
    },

    onRefreshCustomer: () => {
      setRefresh(true);
      setCurrentPage(1);
    },

    closeBookAppointment: () => {
      if (isReviewConfirm) {
        NavigationService.navigate(screenNames.AppointmentNewScreen, { screen: screenNames.ReviewConfirm });
      } else {
        NavigationService.back();
        dispatch(bookAppointment.resetBooking());
      }
    }
  }
};
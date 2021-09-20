import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, getListCustomer } from '@src/apis';
import { useDispatch } from "react-redux";
import { useScrollToTop } from '@react-navigation/native';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

  const dispatch = useDispatch();

  const [valueSearch, setValueSearch] = React.useState("");
  const [customerList, setCustomerList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isLoadingDefault, setLoadingDefault] = React.useState(true);

  const navigation = useNavigation();

  const [{ isLoading }, refetch] = useAxiosQuery({
    ...getListCustomer(valueSearch, currentPage),
    isLoadingDefault,
    enabled: true,
    onLoginSuccess: (data, response) => {
      if (currentPage === 1) {
        setCustomerList(data);
      } else {
        setCustomerList(customerList.concat(data));
      }
      setLoadingDefault(false);
      setTotalPage(response.pages);
    },
  });

  const refreshFromScreen = () => {
    setLoadingDefault(true);
    setRefresh(true);
    setCurrentPage(1);
    setValueSearch("");
  }

  React.useEffect(async () => {
    if (isRefresh) {
      await refetch();
    }
    setRefresh(false);
  }, [isRefresh, currentPage]);

  return {
    valueSearch,
    customerList,
    isRefresh,
    isLoading,
    currentPage,

    addCustomer: () => {
      navigation.push(screenNames.CustomerNewScreen, {
        refreshFromScreen
      });
    },

    onChangeSearch: (value) => {
      setValueSearch(value);
      setCurrentPage(1);
    },

    close: () => {
      NavigationService.back();
    },

    newCustomer: () => {
      navigation.push(screenNames.CustomerNewScreen, {
        refreshFromScreen
      });
    },

    loadMoreCustomerList: () => {
      if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
      }
    },

    onRefreshCustomer: () => {
      setRefresh(true);
      setCurrentPage(1);
    }
  }
};
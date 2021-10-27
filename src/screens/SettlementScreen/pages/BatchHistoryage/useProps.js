import React from "react";
import { useTranslation } from "react-i18next";
import {
  useAxiosQuery,
  useAxiosMutation,
  getListInvoicesByMerchant,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { review, invoice, app, settlement } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { getContentDate } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (props) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const startDate = props?.route?.params?.startDate;
  const endDate = props?.route?.params?.endDate;

  const {
    auth: { staff },
    invoice: { DataList = [], pages = 0, count = 0, },
    settlement : { batchHistory = [] }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [valueSearch, setValueSearch] = React.useState("");
  const [timeStart, setTimeStart] = React.useState("");
  const [timeEnd, setTimeEnd] = React.useState("");


  /********************************* GET INVOICE LIST  ********************************* */
  const getDataList = async (
    key = "", timeStart = "", timeEnd = "", quickFilter = "", page = 1,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `settlement/search?key=${key}&timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=${quickFilter}&page=${page}&row=10&api-version=1.1`,
      method: 'GET',
    }
    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(settlement.setBatchHistory({
          ...response?.data,
          currentPage: page
        }));
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
      setRefresh(false)
      dispatch(app.hideLoading());
    }
  }


  /********************************* GỌI INVOICE LIST LẦN ĐẦU  ********************************* */
  React.useEffect(() => {
    getDataList(
      "", "", "", "", 1
    );
  }, []);


  React.useEffect(() => {
    if (startDate && endDate) {
      setTimeStart(startDate);
      setTimeEnd(endDate);
      getDataList(
        valueSearch, startDate, endDate, "", 1
      );
    }
  }, [startDate, endDate]);

  return {
    currentPage,
    status,
    isRefresh,
    valueSearch,
    batchHistory,
    paymentMethod,

    selectPeriod: () => {
      NavigationService.navigate(screenNames.SelectPeriod, {
        screenName: screenNames.SettlementScreen,
        timeStart,
        timeEnd,
      });
    },

    onChangeSearch: (text) => {
      setValueSearch(text);
    },

    onSubmitSearch: () => {
      getDataList(
        valueSearch, timeStart, timeEnd, "", currentPage
      );
    },

    onLoadMore: () => {
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
        getDataList(
          valueSearch, timeStart, timeEnd, "", currentPage + 1
        );
      }
    },

    onChangeFilter: (filterStatus, filterType) => {
      setStatus(filterStatus);
      setPaymentMethod(filterType)
      setCurrentPage(1);
      getDataList(
        valueSearch, timeStart, timeEnd, "", 1
      );
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
      getDataList(
        "", "", "", "", 1
      );
    },

    getContentDate: () => {
      return getContentDate(timeStart, timeEnd);
    },


  };
};

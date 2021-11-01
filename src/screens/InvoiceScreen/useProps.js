import React from "react";
import { useTranslation } from "react-i18next";
import {
  useAxiosQuery,
  useAxiosMutation,
  getListInvoicesByMerchant,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { review, invoice, app } from "@redux/slices";
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
    invoice: { invoiceList = [], pages = 0, count = 0, }
  } = useSelector(state => state);

  const paymentMethodRef = React.useRef();
  const statusRef = React.useRef();

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [valueSearch, setValueSearch] = React.useState("");
  const [timeStart, setTimeStart] = React.useState("");
  const [timeEnd, setTimeEnd] = React.useState("");


  /********************************* GET INVOICE LIST  ********************************* */
  const getInvoiceList = async (
    key = "", method = "", status = "", timeStart = "", timeEnd = "", quickFilter = "", page = 1,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `checkout?page=${page}&method=${method}&status=${status}&timeStart=${timeStart}&timeEnd=${timeEnd}&key=${key}&quickFilter=${quickFilter}&row=10&api-version=1.1`,
      method: 'GET',
    }
    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(invoice.setInvoiceList({
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
    getInvoiceList(
      "", "", "", "", "", "", 1
    );
  }, []);


  React.useEffect(() => {
    if (startDate && endDate) {
      setTimeStart(startDate);
      setTimeEnd(endDate);
      getInvoiceList(
        valueSearch, paymentMethod, status, startDate, endDate, "", 1
      );
    }
  }, [startDate, endDate]);

  return {
    paymentMethodRef,
    statusRef,
    currentPage,
    status,
    isRefresh,
    valueSearch,
    invoiceList,
    paymentMethod,

    selectPeriod: () => {
      NavigationService.navigate(screenNames.SelectPeriod, {
        screenName: screenNames.InvoiceScreen,
        timeStart,
        timeEnd,
      });
    },

    onChangeSearch: (text) => {
      setValueSearch(text);
    },

    onSubmitSearch: () => {
      getInvoiceList(
        valueSearch, "", "", "", "", "", 1
      );
    },

    onLoadMore: () => {
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
        getInvoiceList(
          valueSearch, paymentMethod, status, timeStart, timeEnd, "", currentPage + 1
        );
      }
    },

    onChangeFilter: (filterStatus, filterType) => {
      setStatus(filterStatus);
      setPaymentMethod(filterType)
      setCurrentPage(1);
      getInvoiceList(
        valueSearch, filterType, filterStatus, timeStart, timeEnd, "", 1
      );
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
      getInvoiceList(
        "",paymentMethod, status, "", "", "", 1
      );
    },

    getContentDate: () => {
      return getContentDate(timeStart, timeEnd);
    },


  };
};

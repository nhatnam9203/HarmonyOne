import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { app, settlement, report } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { getContentDate, handleFileDownloaed } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    auth: { staff },
    report: {
      listPaymentMethod = [],
    }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [timeStart, setTimeStart] = React.useState(moment().startOf('week').format("MM/DD/YYYY"));
  const [timeEnd, setTimeEnd] = React.useState(moment().endOf('week').format("MM/DD/YYYY"));

  /********************************* GET DATA THEO PAGE  ********************************* */
  const getDataList = async (
    timeStart = "", timeEnd = "", quickFilter = "custom", page = 1,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url:  `overall/paymentMethod?timeStart=${timeStart}&timeEnd=${timeEnd}&method=all`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(
          report.setListPaymentMethod({
            ...response?.data,
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

  /********************************* EXPOTR  ********************************* */
  const exportFile = async (
    exportType,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url:  `overall/paymentMethod/export?timeStart=${timeStart}&timeEnd=${timeEnd}&method=all`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        await handleFileDownloaed(response?.data?.data, "csv", "report_sales_by_payment_method");
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  React.useEffect(() => {
    if (timeStart && timeEnd) {
      getDataList(
        timeStart, timeEnd, "", currentPage,
      );
    }
  }, [timeStart, timeEnd]);



  return {
    isRefresh,

    timeStart,
    timeEnd,
    setTimeStart,
    setTimeEnd,
    exportFile,

    listPaymentMethod,

    onSubmitSearch: () => {
      getDataList(
        "", "", "", 1
      );
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
      getDataList(
        moment().startOf('week').format("MM/DD/YYYY"), moment().endOf('week').format("MM/DD/YYYY"), "", 1
      );
    },

    getContentDate: () => {
      return getContentDate(timeStart, timeEnd);
    },

    actionSheetExports: () => [
      {
        id: 'export-excel',
        label: 'EXCEL',
        func: () => {
          // exportFile("excel");
          Alert.alert("Giftcard sales : Hiện export csv giống Pos, chưa có api export excel hay pdf")
        },
      },
      {
        id: 'export-csv',
        label: 'CSV',
        func: () => {
          exportFile("csv");
        },
      },
    ],

  };
};

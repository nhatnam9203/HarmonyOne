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
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from "react-native";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    auth: { staff },
    report: {
      staffSalary = [],
      staffSalary_pages = 0,
    }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [timeStart, setTimeStart] = React.useState(moment().startOf('isoWeeks').format("MM/DD/YYYY"));
  const [timeEnd, setTimeEnd] = React.useState(moment().endOf('isoWeeks').format("MM/DD/YYYY"));

  /********************************* GET DATA THEO PAGE  ********************************* */
  const getDataList = async (
    timeStart = "", timeEnd = "", quickFilter = "custom", page = 1,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `staff/salary?timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=${quickFilter}&page=${page}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(
          report.setListStaffSalary({
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

  /********************************* EXPOTR  ********************************* */
  const exportFile = async (
    exportType,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `staff/salary/export?timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=custom&type=${exportType}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        await handleFileDownloaed(response?.data?.data?.path, exportType,"report_staff_salary");
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
    currentPage,
    isRefresh,

    timeStart,
    timeEnd,
    setTimeStart,
    setTimeEnd,
    currentPage,

    staffSalary,
    staffSalary_pages,


    onSubmitSearch: () => {
      getDataList(
        "", "", "", 1
      );
    },

    onLoadMore: () => {
      if (currentPage < staffSalary_pages) {
        setCurrentPage(currentPage + 1);
        getDataList(
          timeStart, timeEnd, "", currentPage + 1
        );
      }
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
          exportFile("excel");
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

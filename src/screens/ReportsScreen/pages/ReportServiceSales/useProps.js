import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { app, settlement, report } from "@redux/slices";
import { axios } from '@shared/services/axiosClientReport';
import { getContentDate, handleFileDownloaed } from "@shared/utils";
import { useForm } from "react-hook-form";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

const filterList = [
  { label : "Top 5 services", value : "top5" },
  { label : "Top 10 services", value : "top10" },
  { label : "All services", value : "all" }
];


export const useProps = (props) => {
  const dispatch = useDispatch();
  const form = useForm();
  const listFilterRef = React.useRef();

  const {
    auth: { staff },
    report: {
      listServiceSales = [],
    }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [timeStart, setTimeStart] = React.useState(moment().startOf('isoWeeks').format("MM/DD/YYYY"));
  const [timeEnd, setTimeEnd] = React.useState(moment().endOf('isoWeeks').format("MM/DD/YYYY"));
  const [valueFilter, setValueFilter] = React.useState("all");

  /********************************* GET DATA THEO PAGE  ********************************* */
  const getDataList = async (
    timeStart = "", timeEnd = "", quickFilter = "custom", page = 1,filterType
  ) => {
    dispatch(app.showLoading());
    const params = {
      url:  `service/report/saleByService?quickFilter=${quickFilter}&timeStart=${timeStart}&timeEnd=${timeEnd}&service=${filterType}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
  
      if (response?.data?.codeNumber == 200) {
        dispatch(
          report.setListServiceSales({
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
      url:  `service/report/saleByService/export?quickFilter=&timeStart=${timeStart}&timeEnd=${timeEnd}&service=${valueFilter}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        await handleFileDownloaed(response?.data?.data, "csv", "report_service_sales");
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
        timeStart, timeEnd, "", currentPage, valueFilter
      );
    }
  }, [timeStart, timeEnd]);



  return {
    isRefresh,

    timeStart,
    timeEnd,
    setTimeStart,
    setTimeEnd,
    listFilterRef,
    form,
    listServiceSales,

    getContentList : () =>{
      return filterList;
    },


    onChangeFilter: (item) => {
      setValueFilter(item?.value);
      getDataList(
        timeStart, timeEnd, "", currentPage,item?.value
      );
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
      getDataList(
        timeStart, timeEnd, "", 1, valueFilter
      );
    },

    getContentDate: () => {
      return getContentDate(timeStart, timeEnd);
    },

    exportFile,

    actionSheetExports: () => [
      {
        id: 'export-excel',
        label: 'EXCEL',
        func: () => {
          exportFile("excel");
          // Alert.alert("Giftcard sales : Hiện export csv giống Pos, chưa có api export excel hay pdf")
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

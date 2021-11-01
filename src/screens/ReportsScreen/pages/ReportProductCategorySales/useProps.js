import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { app, settlement, report } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { useForm } from "react-hook-form";
import { getContentDate, handleFileDownloaed } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

const filterList = [
  { label : "Top 5 categories", value : "top5" },
  { label : "Top 10 categories", value : "top10" },
  { label : "All categories", value : "all" }
];

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    auth: { staff },
    report: {
      listProductCategorySales = [],
    }
  } = useSelector(state => state);
  const form = useForm();
  const listFilterRef = React.useRef();

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [timeStart, setTimeStart] = React.useState(moment().startOf('week').format("MM/DD/YYYY"));
  const [timeEnd, setTimeEnd] = React.useState(moment().endOf('week').format("MM/DD/YYYY"));
  const [valueFilter, setValueFilter] = React.useState("all");

  /********************************* GET DATA THEO PAGE  ********************************* */
  const getDataList = async (
    timeStart = "", timeEnd = "", quickFilter = "custom", page = 1, filterType = "all"
  ) => {
    dispatch(app.showLoading());
    const params = {
      url:  `product/report/saleByCategory?timeStart=${timeStart}&timeEnd=${timeEnd}&category=${filterType}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(
          report.setListProductCategorySales({
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
    filterType
  ) => {
    dispatch(app.showLoading());
    const params = {
      url:  `product/report/saleByCategory/export?timeStart=${timeStart}&timeEnd=${timeEnd}&category=${filterType}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        await handleFileDownloaed(response?.data?.data, "csv", `report_product_category_sales_${valueFilter}`);
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
    exportFile,

    listProductCategorySales,
    form,
    listFilterRef,

    onChangeFilter: (item) => {
      setValueFilter(item?.value);
      getDataList(
        timeStart, timeEnd, "", currentPage,item?.value
      );
    },

    getContentList : () =>{
      return filterList;
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

    actionSheetExports: () => [
      // {
      //   id: 'export-excel',
      //   label: 'EXCEL',
      //   func: () => {
      //     // exportFile("excel");
      //     Alert.alert("Giftcard sales : Hiện export csv giống Pos, chưa có api export excel hay pdf")
      //   },
      // },
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

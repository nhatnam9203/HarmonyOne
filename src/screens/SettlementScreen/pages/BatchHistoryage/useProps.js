import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { app, settlement } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { getContentDate } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    auth: { staff },
    settlement: { batchHistory = [], pages = 0, count = 0 }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState("");
  const [timeStart, setTimeStart] = React.useState("");
  const [timeEnd, setTimeEnd] = React.useState("");


  /********************************* GET DATA THEO PAGE  ********************************* */
  const getDataList = async (
    key = "", timeStart = "", timeEnd = "", quickFilter = "", page = 1, isfirstLoad
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
      setRefresh(false);
      if(!isfirstLoad){
        dispatch(app.hideLoading());
      }
    }
  }

  React.useEffect(() => {
    if (timeStart && timeEnd) {
      getDataList(
        valueSearch, timeStart, timeEnd, "", currentPage,
      );
    }
  }, [timeStart, timeEnd]);


  /********************************* GỌI INVOICE LIST LẦN ĐẦU  ********************************* */
  React.useEffect(() => {
    getDataList(
      "", "", "", "", 1, true
    );
  }, []);


  return {
    currentPage,
    isRefresh,
    valueSearch,
    batchHistory,
    timeStart,
    timeEnd,
    setTimeStart,
    setTimeEnd,
    pages,
    currentPage,


    onChangeSearch: (text) => {
      setValueSearch(text);
    },

    onSubmitSearch: () => {
      getDataList(
        valueSearch, "", "", "", 1
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

    removeSearch: () => {
      setValueSearch("");
      getDataList(
        "", "", "", "", 1
      );
    }

  };
};

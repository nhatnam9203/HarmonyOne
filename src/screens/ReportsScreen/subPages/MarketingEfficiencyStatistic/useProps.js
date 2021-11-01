import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { app, report } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { handleFileDownloaed } from "@shared/utils";
import { useForm } from "react-hook-form";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import { Alert } from "react-native";

export const useProps = (props) => {
  const dispatch = useDispatch();
  const { item, dataList, timeStart,timeEnd } = props?.route?.params;

  const {
    auth: { staff },
  } = useSelector(state => state);
  const listSelectedRef = React.useRef();
  const form = useForm();

  /********************************* STATE  ********************************* */

  const [statistic, setStatistic] = React.useState([]);
  const [itemSelected, setItemSelected] = React.useState(null);

  /********************************* EXPOTR  ********************************* */
  const exportFile = async (
    exportType,
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `overall/marketingEfficiency/export/${itemSelected?.value}?timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=custom`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        await handleFileDownloaed(response?.data?.data, "csv", `report_giftcard_sales/${itemSelected?.label}`);
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }

  React.useEffect(() => {
    if (item) {
      const selectedObj = dataList.find(obj => obj?.promotionId == item?.promotionId);
      if (selectedObj) {
        setItemSelected({
          label : selectedObj?.name,
          value : selectedObj?.promotionId,
        });
      }
    }
  }, []);



  return {

    listSelectedRef,
    itemSelected,
    form,
    dataList,
    exportFile,

    getContentList: () => {
      return dataList.map(obj => ({
        label: obj?.name,
        value: obj?.promotionId
      }))
    },

    onChangeSelected : (itemObj) =>{
      setItemSelected(itemObj);
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

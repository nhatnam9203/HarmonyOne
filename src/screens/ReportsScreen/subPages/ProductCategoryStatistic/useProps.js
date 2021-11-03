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
  const { item, timeStart, timeEnd } = props?.route?.params;

  /********************************* STATE  ********************************* */

  const [statistic, setStatistic] = React.useState([]);
  const [itemSelected, setItemSelected] = React.useState(null);

  /********************************* EXPOTR  ********************************* */
  const exportFile = async (
    exportType,
  ) => {
    if (item) {
        dispatch(app.showLoading());
        const params = {
          url: `product/report/saleByCategory/export?timeStart=${timeStart}&timeEnd=${timeEnd}`,
          method: 'GET',
        }

        try {
          const response = await axios(params);
          if (response?.data?.codeNumber == 200) {
            await handleFileDownloaed(response?.data?.data, "csv", `report_product_category`);
          } else {
            Alert.alert(response?.data?.message)
          }

        } catch (err) {

        } finally {
          dispatch(app.hideLoading());
        }
      }
    }
  


  return {
    item,
    exportFile,

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

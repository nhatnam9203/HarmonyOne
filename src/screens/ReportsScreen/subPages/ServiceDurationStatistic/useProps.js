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

  const { timeStart, timeEnd, staffId } = props?.route?.params;

  const listSelectedRef = React.useRef();
  const form = useForm();

  const {
    auth: { staff },
    report: {
      serviceDurationStaffDetail = [],
    },
    staff: { staffListByMerchant = [] }
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [isRefresh, setRefresh] = React.useState(false);

  const [staffSelected, setStaffSelected] = React.useState("");

  /********************************* GET SERVICE DURATION STAFF DETAIL ********************************* */
  const getServiceDurationStaffDetail = async (
    idStafff
  ) => {
    dispatch(app.showLoading());
    const params = {
      url: `staff/report/serviceduration/detail/${idStafff}?timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=custom`,
      method: 'GET',
    }

    try {
      const response = await axios(params);

      if (response?.data?.codeNumber == 200) {
        dispatch(
          report.setServiceDurationStaffDetail({
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
    if (staffSelected) {
      dispatch(app.showLoading());
      const params = {
        url: `staff/report/serviceduration/detail/${staffSelected?.value}/export?timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=custom`,
        method: 'GET',
      }

      try {
        const response = await axios(params);
        if (response?.data?.codeNumber == 200) {
          await handleFileDownloaed(response?.data?.data, "csv", `report_staff_statistic_${staffSelected?.label}`);
        } else {
          Alert.alert(response?.data?.message)
        }

      } catch (err) {

      } finally {
        dispatch(app.hideLoading());
      }
    }
  }

  React.useEffect(() => {
    if (staffId) {
      const staffObj = staffListByMerchant.find(obj => obj?.staffId == staffId);
      if (staffObj) {
        setStaffSelected({
          label: staffObj?.displayName,
          value: staffObj?.staffId
        })
      }
    }
  },[]);


  return {
    isRefresh,

    exportFile,
    listSelectedRef,
    form,
    setStaffSelected,
    staffSelected,
    serviceDurationStaffDetail,

    getContentList: () => {
      return staffListByMerchant.map(obj => ({
        label: obj?.displayName,
        value: obj?.staffId
      }))
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

    onChangeSelectec: (staff) => {
      setStaffSelected(staff);
      getServiceDurationStaffDetail(staff?.value);
    }

  };
};

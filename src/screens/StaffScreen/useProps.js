import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
  getStaffByMerchant,
  getStaffById
} from '@src/apis';

import { service, product, category, extra, staff as staffAction } from '@redux/slices';
import { useSelector, useDispatch } from "react-redux";
import { colors } from "@shared/themes";
import { useTranslation } from "react-i18next";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueSearch, setSearchValue] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);
  const [staffIdDetail, setStaffIdDetail] = React.useState("")

  const {
    auth: { staff },
    staff: { staffListByMerchant = [] }
  } = useSelector(state => state)

  const [t] = useTranslation();

  const [, fetchStaffList] = useAxiosQuery({
    ...getStaffByMerchant(staff?.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(staffAction.setStaffListByMerchant(data));
      setRefresh(false);
    },
  });

  const [, fetchStaffbyId] = useAxiosQuery({
    ...getStaffById(staffIdDetail,staff?.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      NavigationService.navigate(
        screenNames.StaffNewScreen,
        { isEdit: true, staffEdit: data, refreshList }
      );
    },
  });

  const refreshList = () => {
    fetchStaffList();
    setSearchValue("");
  }

  /************************************** REFRESH STAFF LIST  ***************************************/
  React.useEffect(() => {
    if (isRefresh) {
      fetchStaffList();
    }
  }, [isRefresh])

  /************************************** LOAD STAFF LIST AFTER COMPONENT MOUNTED  ***************************************/
  React.useEffect(() => {
    fetchStaffList();
  }, []);

  /************************************** FETCH STAFF BY ID  ***************************************/
  React.useEffect(() => {
    if (staffIdDetail) {
      fetchStaffbyId();
    }
  }, [staffIdDetail]);


  return {

    valueSearch,
    isRefresh,

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newStaff: () => {
      NavigationService.navigate(
        screenNames.StaffNewScreen, { refreshList }
      );
    },

    editStaff: (item) => {
      if(item?.staffId == staffIdDetail){
        fetchStaffbyId();
      }else{
        setStaffIdDetail(item?.staffId);
      }
    },

    onRefresh: () => {
      setRefresh(true) 
    },

    getData: () => {
      let staffList = staffListByMerchant;
      if (valueSearch) {
        staffList = staffList.filter((e) => {
          if (e !== null) {
            return (
              e.displayName
                .trim()
                .toLowerCase()
                .indexOf(valueSearch.toLowerCase()) !== -1
            );
          }
          return null;
        });
      }

      return staffList;
    }
  };
};

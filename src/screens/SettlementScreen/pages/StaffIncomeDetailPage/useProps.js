import React from "react";
import {

} from "@src/apis";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationService from "@navigation/NavigationService";


export const useProps = (props) => {

  const staffDetail = props?.route?.params?.staffDetail;
  const form = useForm();
  const stafListRef = React.useRef();
  const [staffList, setStaffList] = React.useState([]);
  const [staffSelected, setStaffSelected] = React.useState("");

  const {
    settlement: { listStaffSales = [] }
  } = useSelector(state => state);

  React.useEffect(() => {
    let tempStaffList = listStaffSales.map((s) => ({ label: s?.name, value: s?.staffId }));
    setStaffList(tempStaffList);
    setStaffSelected({ label: staffDetail?.name, value: staffDetail?.staffId });
  }, [listStaffSales]);

  return {
    form,
    stafListRef,
    staffList,
    staffSelected,
    listStaffSales,
    setStaffSelected,
  };
};

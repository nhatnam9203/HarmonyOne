import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { staffGetAvaiableTime, useAxiosMutation } from "@src/apis";
import { bookAppointment } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";

export const useProps = ({
  route
}) => {

  const dispatch = useDispatch();

  const serviceSelected = route?.params?.serviceSelected;

  const {
    bookAppointment: { staffsOfService = [], dayBooking = moment(), isAddMore, isQuickCheckout },
    auth: { staff },
    merchant: { merchantDetail },
  } = useSelector(state => state);


  const [staffList, setStaffList] = React.useState([]);

  const getStaffSelected = () => {
    for (let i = 0; i < staffList.length; i++) {
      if (staffList[i].checked) {
        return staffList[i];
      }
    }
    return null;
  }

  /****************************** SET STAFF LIST  ******************************/
  React.useEffect(() => {
    setStaffList(
      staffsOfService.map(s => ({
        ...s,
        checked: false,
      })));
  }, [staffsOfService]);

  /****************************** GET TIME AVAIABLE BY STAFF  ******************************/
  const [, submitGetStaffAvailable] = useAxiosMutation({
    ...staffGetAvaiableTime(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(bookAppointment.setTimesAvailable(data));
        NavigationService.navigate(screenNames.SelectDateTime, { staffSelected: getStaffSelected() });
      }
    }
  });

  return {
    staffList,

    goToDateTime: async () => {

      if (isAddMore) {
        dispatch(bookAppointment.updateStatusAddMore(false));
        NavigationService.navigate(screenNames.ReviewConfirm);
        return;
      }

      const staffSelected = getStaffSelected();

      /**************************** UPDATE STAFF CHO SERVICE *****************************/
      dispatch(bookAppointment.updateStaffService({ service: serviceSelected, staff: staffSelected }));
      /**************************** QUICK CHECKOUT KHONG CAN CHON DATE TIME *****************************/
      if (isQuickCheckout) {
        NavigationService.navigate(screenNames.ReviewConfirm);
        return;
      }

      /**************************** GET TIME AVAILABLE CHO STAFF DUOC CHON *****************************/
      const data = {
        date: moment(dayBooking).format("YYYY-MM-DD"),
        merchantId: staff?.merchantId,
        appointmentId: 0,
        timezone: new Date().getTimezoneOffset(),
      };
      const body = await staffGetAvaiableTime(staffSelected?.staffId, data);
      submitGetStaffAvailable(body.params);

    },


    /**************************** SELECT STAFF , CHUA BAM NUT NEXT *****************************/
    selectStaff: (s) => {
      let tempStaffList = [...staffList];
      const index = tempStaffList.findIndex(obj => obj.staffId == s.staffId);
      if (index !== -1) {
        for (let i = 0; i < tempStaffList.length; i++) {
          if (i == index) {
            tempStaffList[i].checked = true;
          } else if (tempStaffList[i].checked) {
            tempStaffList[i].checked = false;
          }
        }
      }
      setStaffList(tempStaffList);
    }
  };
};

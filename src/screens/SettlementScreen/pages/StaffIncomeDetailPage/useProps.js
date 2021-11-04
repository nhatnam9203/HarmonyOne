import React from "react";
import {

} from "@src/apis";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";
import SendSMS from "react-native-sms";


export const useProps = (props) => {

  const staffDetail = props?.route?.params?.staffDetail;
  const form = useForm();
  const stafListRef = React.useRef();
  const [staffList, setStaffList] = React.useState([]);
  const [staffSelected, setStaffSelected] = React.useState("");

  const {
    settlement: { listStaffSales = [] },
    staff: { staffListByMerchant = [] }
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

    sendTotalViaSMS: async () => {
      try {
        const staffInfo = listStaffSales.find(
          (staff) => staff?.staffId === staffSelected?.value
        );
        const staffInfoFromMerchant = staffListByMerchant.find(
          (staff) => staff?.staffId === staffSelected?.value
        );

        console.log({staffInfoFromMerchant})

        if (staffInfo) {
          const displayName = staffInfoFromMerchant.displayName ? staffInfoFromMerchant.displayName : "";
          const total = staffInfo.total ? staffInfo.total : 0.0;
          const phone = staffInfoFromMerchant.phone ? staffInfoFromMerchant.phone : "";
          const today = moment().format("MM/DD/YYYY");

          const data = {
            body: `Hello ${displayName}, your total today ${today} is $${total}. Thank you :)`,
            recipients: [`${phone}`],
            successTypes: ["sent", "queued"],
            allowAndroidSendWithoutReadPermission: true,
          };


          SendSMS.send(
            data,
            (completed, cancelled, error) => {
            }
          );
        }
      } catch (error) {
        // alert(error)
      }
    }
  };
};

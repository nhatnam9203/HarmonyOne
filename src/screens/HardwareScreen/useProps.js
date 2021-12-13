import React from "react";
import NavigationService from '@navigation/NavigationService';
import { useDispatch, useSelector } from "react-redux";
import { hardware, } from "@redux/slices";
import { 
  PaymentTerminalType,
 } from "@shared/utils";
 import _ from "lodash";
 import {
  useAxiosMutation,
  removeTerminalId,
} from "@src/apis";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  /************************************* SELECTOR *************************************/
  const {
    hardware: { dejavooMachineInfo, 
              cloverMachineInfo,
              paymentMachineType,
              printerList,
              printerSelect,
              paxMachineInfo,
              terminalId, },
  } = useSelector(state => state);

  const [isSetup, setIsSetup] = React.useState(false);
  const [tempTitle, settTempTitle] = React.useState("");

  const onPressBox = async (type) => {
    if (type === 'PaymentTerminal') {
      NavigationService.navigate(screenNames.AddDeviceHardware);
    } else {
      NavigationService.navigate(screenNames.PrinterList);
    }

  }

  const [, removeSelectedTerminalId] = useAxiosMutation({
    ...removeTerminalId(terminalId),
    isStopLoading: true,
    isLoadingDefault: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(hardware.saveTerminalId(""))
        dispatch(hardware.deleteHardware());
      }
    }
  });

  const deleteHardware = async () => {
    //request server to remove terminal id
    const body = await removeTerminalId(terminalId);
    removeSelectedTerminalId(body.params);

  }


  React.useEffect(() => {
    const isSetup = getIsSetup();
    setIsSetup(isSetup);

    const title = temptTitle();
    settTempTitle(title);
  }, [dejavooMachineInfo, 
    cloverMachineInfo, 
    paxMachineInfo,
    paymentMachineType,]);

  const getIsSetup = () => {
    let isSetup =  false
    if (paymentMachineType == PaymentTerminalType.Pax) {
      isSetup = _.get(paxMachineInfo, 'isSetup')
    } else if (paymentMachineType == PaymentTerminalType.Clover) {
        isSetup = _.get(cloverMachineInfo, 'isSetup')
    } else{
        isSetup = _.get(dejavooMachineInfo, 'isSetup')
    }
    return isSetup
  }

  const temptTitle = () => {
    let temptTitle = 'No Device'
    if (paymentMachineType == PaymentTerminalType.Pax) {
      temptTitle = !_.get(paxMachineInfo, 'isSetup') 
                    ? 'No Device' 
                    : paxMachineInfo.name;
    } else if (paymentMachineType == PaymentTerminalType.Clover) {
        temptTitle = !_.get(cloverMachineInfo, 'isSetup') 
                    ? 'No Device' 
                    : cloverMachineInfo.name;
    } else{
        temptTitle = !_.get(dejavooMachineInfo, 'isSetup') 
                    ? 'No Device' 
                    : dejavooMachineInfo.name;
    }
    return temptTitle
}

  return {
    onPressBox,
    deleteHardware,
    dejavooMachineInfo,
    paymentMachineType, 
    printerSelect,
    isSetup,
    tempTitle,
  };
};

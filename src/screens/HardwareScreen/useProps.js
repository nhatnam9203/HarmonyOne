import React from "react";
import NavigationService from '@navigation/NavigationService';
import { useDispatch, useSelector } from "react-redux";
import { hardware, } from "@redux/slices";
import { 
  PaymentTerminalType,
 } from "@shared/utils";
 import _ from "lodash";

export const useProps = (_params) => {

  /************************************* SELECTOR *************************************/
  const {
    hardware: { dejavooMachineInfo, 
              cloverMachineInfo,
              paymentMachineType,
              printerList,
              printerSelect, },
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

  const deleteHardware = () => {
      dispatch(hardware.deleteHardware());
  }


  React.useEffect(() => {
    const isSetup = getIsSetup();
    setIsSetup(isSetup);

    const title = temptTitle();
    settTempTitle(title);
  }, [dejavooMachineInfo, cloverMachineInfo, paymentMachineType]);

  const getIsSetup = () => {
    let isSetup =  false
    if (paymentMachineType == PaymentTerminalType.Clover){
        isSetup = _.get(cloverMachineInfo, 'isSetup')
    } else{
        isSetup = _.get(dejavooMachineInfo, 'isSetup')
    }
    return isSetup
  }

  const temptTitle = () => {
    let temptTitle = 'No Device'
    if (paymentMachineType == PaymentTerminalType.Clover){
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

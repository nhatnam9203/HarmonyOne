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
              paymentMachineType,
              printerList,
              printerSelect, },
  } = useSelector(state => state);

  const [isSetup, setIsSetup] = React.useState(false);


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
  }, []);

  const getIsSetup = () => {
    let isSetup =  false
    if (paymentMachineType == PaymentTerminalType.Clover){
        isSetup = _.get(cloverMachineInfo, 'isSetup')
    } else{
        isSetup = _.get(dejavooMachineInfo, 'isSetup')
    }
    console.log('isSetup', isSetup)
    return isSetup
  }


  return {
    onPressBox,
    deleteHardware,
    dejavooMachineInfo,
    paymentMachineType, 
    printerSelect,
    isSetup,
  };
};

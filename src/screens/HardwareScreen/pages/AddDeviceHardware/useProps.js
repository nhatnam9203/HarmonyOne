import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";
import { 
  PaymentTerminalType,
 } from "@shared/utils";
 import _ from "lodash";

export const useProps = (props) => {

  /************************************* SELECTOR *************************************/
  const {
    hardware: { dejavooMachineInfo, 
                paymentMachineType,
                cloverMachineInfo,
                paxMachineInfo,
              },
  } = useSelector(state => state);

  /********************************* STATE  ********************************* */
  const [name, setName] = React.useState("");
  const [isSetup, setIsSetup] = React.useState(false);

  React.useEffect(() => {
    const name = getName();
    setName(name);

    const isSetup = getIsSetup();
    setIsSetup(isSetup);
  }, [dejavooMachineInfo, cloverMachineInfo, paymentMachineType]);

  const getName = () => {
    let name = ''
    if (paymentMachineType == PaymentTerminalType.Pax) {
        name = _.get(paxMachineInfo, 'name')
    } else if (paymentMachineType == PaymentTerminalType.Clover) {
        name = _.get(cloverMachineInfo, 'name')
    }else {
      //Dejavoo
      name = _.get(dejavooMachineInfo, 'name')
    }
    return name
  }

  const getIsSetup = () => {
    let isSetup =  false
    if (paymentMachineType == PaymentTerminalType.Clover){
        isSetup = _.get(cloverMachineInfo, 'isSetup')
    } else{
        isSetup = _.get(dejavooMachineInfo, 'isSetup')
    }
    return isSetup
  }

  return {
    name,
    isSetup,
    cloverMachineInfo,
    dejavooMachineInfo,
    paymentMachineType,
    addDevice: () => {
      NavigationService.navigate(screenNames.SetupHardware);
    },
    backHomeHardware: () => {
      NavigationService.back();
    },
  };
};

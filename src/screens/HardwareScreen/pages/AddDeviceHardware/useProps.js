import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {

  /************************************* SELECTOR *************************************/
  const {
    hardware: { dejavooMachineInfo, 
                paymentMachineType,
                cloverMachineInfo,
              },
  } = useSelector(state => state);

  return {
    cloverMachineInfo,
    dejavooMachineInfo,
    paymentMachineType,
    addDevice: () => {

    },
    backHomeHardware: () => {
      NavigationService.back();
    },
  };
};

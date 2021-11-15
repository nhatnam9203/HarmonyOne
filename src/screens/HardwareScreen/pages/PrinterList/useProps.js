import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";
import { app, hardware } from '@src/redux/slices';
import {
  checkStatusPrint
} from '@shared/utils';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    hardware: { dejavooMachineInfo, 
              paymentMachineType,
              printerList,
              printerSelect,
              printerPortType, },
  } = useSelector(state => state);

  const selectPortType = async (type) => {
      try {
          dispatch(hardware.updatePrinterPortType(type));
          dispatch(app.showLoading());
          const printMachine = await checkStatusPrint(type);
          dispatch(hardware.updatePrinterList(printMachine));
          dispatch(app.hideLoading());
      } catch (error) {
          dispatch(app.hideLoading());
          setTimeout(() => {
              alert(error)
          }, 500)
      }

  }

  return {
    printerList,
    printerSelect,
    printerPortType,
    backHomeHardware: () => {
      NavigationService.back();
    },
    selectPrinter: (printer) => {
      dispatch(hardware.selectPrinter(printer));
    },
    selectPortType,
  };
};

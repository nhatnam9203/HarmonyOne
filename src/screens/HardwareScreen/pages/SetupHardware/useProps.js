import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
} from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";
import { app, hardware } from '@src/redux/slices';
import {
  checkStatusPrint,
  stringIsEmptyOrWhiteSpaces,
} from '@shared/utils';
import _ from "lodash";
import { 
  PaymentTerminalType,
 } from "@shared/utils";

export const useProps = (props) => {
  const dispatch = useDispatch();
  const {
    hardware: { dejavooMachineInfo, 
              cloverMachineInfo,
              paymentMachineType,
              printerList,
              printerSelect,
              printerPortType, },
  } = useSelector(state => state);

    const [name, setName] = React.useState("");
    const [ip, setIp] = React.useState("");
    const [port, setPort] = React.useState("");
    const [terminalName, setTerminalName] = React.useState("");
    const [serialNumber, setSerialNumber] = React.useState("");
    const [registerId, setRegisterId] = React.useState("");
    const [authKey, setAuthKey] = React.useState("");

    React.useEffect(() => {
      let nameTemp = ""
      let ipTemp = ""
      let portTemp = ""
      let registerIdTemp = ""
      let authKeyTemp = ""
      let serialNumberTemp = ""
      if(paymentMachineType == PaymentTerminalType.Clover){

        nameTemp = _.get(cloverMachineInfo, 'name')
        ipTemp = _.get(cloverMachineInfo, 'ip')
        portTemp = _.get(cloverMachineInfo, 'port')
        serialNumberTemp = _.get(cloverMachineInfo, 'serialNumber')

     } else if(paymentMachineType == PaymentTerminalType.Dejavoo){
        
        nameTemp = _.get(dejavooMachineInfo, 'name')
        registerIdTemp = _.get(dejavooMachineInfo, 'registerId')
        authKeyTemp = _.get(dejavooMachineInfo, 'authKey')

     }
      setTerminalName(paymentMachineType)
      setName(nameTemp)
      setIp(ipTemp)
      setPort(portTemp)
      setSerialNumber(serialNumberTemp)
      setRegisterId(registerIdTemp)
      setAuthKey(authKeyTemp)
    }, []);

    setupPaymentTerminal = () => {
     
     if (terminalName == PaymentTerminalType.Dejavoo){
          if (stringIsEmptyOrWhiteSpaces(registerId) 
              ||stringIsEmptyOrWhiteSpaces(authKey) 
              || stringIsEmptyOrWhiteSpaces(name)) {
              alert('Please enter full infomation!');
          } else {
              dispatch(hardware.setupDejavooMachine({
                  paymentMachineInfo: { registerId, authKey, isSetup: true, name },
                  paymentMachineType: PaymentTerminalType.Dejavoo,
              }));
              NavigationService.back();
          };
      } else{
        //Clover
        if (ip == '' || port == '' || serialNumber == '') {
            alert('Please enter full infomation!');
        } else {
            dispatch(hardware.setupCloverMachine({
                paymentMachineInfo: { ip, port, isSetup: true, serialNumber },
                paymentMachineType: PaymentTerminalType.Clover,
            }));
            NavigationService.back();
        };
    }
      
  }

  cancelSetupPax = async () => {
      let name = ""
      let ip = ""
      let port = ""
      let registerId = ""
      let authKey = ""
      if(paymentMachineType == PaymentTerminalType.Clover){
          name = _.get(cloverMachineInfo, 'name')
          ip = _.get(cloverMachineInfo, 'ip')
          port = _.get(cloverMachineInfo, 'port')

      } else if(paymentMachineType == PaymentTerminalType.Dejavoo){
      
          name = _.get(dejavooMachineInfo, 'name')
          registerId = _.get(dejavooMachineInfo, 'registerId')
          authKey = _.get(dejavooMachineInfo, 'authKey')
      }

      setTerminalName(terminalName);
      setName(name);
      setIp(ip);
      setPort(port);
      setSerialNumber(_.get(cloverMachineInfo, 'serialNumber', ''));
      setRegisterId(registerId);
      setAuthKey(authKey);

      NavigationService.back();
  }

  setTerminal = (terminalNameTemp) => () => {
    if(terminalNameTemp != terminalName) {
        let tempName = name 
        let tempIp = ip
        let tempPort = port
        let tempRegisterId = registerId
        let tempAuthKey = authKey
        if (terminalNameTemp == PaymentTerminalType.Dejavoo) {
            tempName = _.get(dejavooMachineInfo, 'name')
            tempRegisterId = _.get(dejavooMachineInfo, 'registerId')
            tempAuthKey = _.get(dejavooMachineInfo, 'authKey')
        } else {
            //Clover
            tempName = _.get(cloverMachineInfo, 'name')
            tempIp = _.get(cloverMachineInfo, 'ip')
            tempPort = _.get(cloverMachineInfo, 'port')
        }
        setTerminalName(terminalNameTemp);
        setName(tempName);
        setIp(tempIp);
        setPort(tempPort);
        setSerialNumber(_.get(cloverMachineInfo, 'serialNumber', ''));
        setRegisterId(tempRegisterId);
        setAuthKey(tempAuthKey);
    }
  }

  return {
    name,
    ip,
    port,
    serialNumber,
    registerId,
    authKey,
    terminalName,
    setupPaymentTerminal,
    cancelSetupPax,
    setTerminal,
    changeName: (name) => {
      setName(name);
    },
    changeSerialNumber: (serialNumber) => {
      setSerialNumber(serialNumber);
    },
    changeRegisterId: (registerId) => {
      setRegisterId(registerId);
    },
    changeAuthKey: (authKey) => {
      setAuthKey(authKey);
    },
    changeIp: (ip) => {
      setIp(ip);
    },
    changePort: (port) => {
      setPort(port);
    }
  };
};

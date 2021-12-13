import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
  updateTerminalId,
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
 import { BleManager } from 'react-native-ble-plx';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const terminalListRef = React.useRef();
  const terminalIdList = [
    { label: 'SUPPORT ONLY' }, { label: 'Terminal 1 (MAIN)' }, { label: 'Terminal 2' }, { label: 'Terminal 3' }, { label: 'Terminal 4' },
    { label: 'Terminal 5' }, { label: 'Terminal 6' }, { label: 'Terminal 7' }, { label: 'Terminal 8' },
    { label: 'Terminal 9' }, { label: 'Terminal 10' }, { label: 'Terminal 11' }, { label: 'Terminal 12' }, { label: 'Terminal 13' },
    { label: 'Terminal 14' }, { label: 'Terminal 15' },
    { label: 'Terminal 16' }, { label: 'Terminal 17' }, { label: 'Terminal 18' },
    { label: 'Terminal 19' }, { label: 'Terminal 20' }, { label: 'Terminal 21' }, { label: 'Terminal 22' },
    { label: 'Terminal 23' }, { label: 'Terminal 24' }, { label: 'Terminal 25' }, { label: 'Terminal 26' }, { label: 'Terminal 27' },
    { label: 'Terminal 28' }, { label: 'Terminal 29' }, { label: 'Terminal 30' }
];

  const {
    hardware: { dejavooMachineInfo, 
              cloverMachineInfo,
              paxMachineInfo,
              paymentMachineType,
              printerList,
              printerSelect,
              printerPortType, },
  } = useSelector(state => state);
  const manager = new BleManager();

    const [name, setName] = React.useState("");
    const [ip, setIp] = React.useState("");
    const [port, setPort] = React.useState("");
    const [terminalName, setTerminalName] = React.useState("");
    const [serialNumber, setSerialNumber] = React.useState("");
    const [registerId, setRegisterId] = React.useState("");
    const [authKey, setAuthKey] = React.useState("");
    const [terminalIdSelected, setTerminalIdSelected] = React.useState("");
    const [commType, setCommType] = React.useState("");
    const [bluetoothAddr, setBluetoothAddr] = React.useState("");
    const [peripherals, setPeripherals] = React.useState("");
    const [scanLoading, setScanLoading] = React.useState("");

    React.useEffect(() => {
      let nameTemp = ""
      let ipTemp = ""
      let portTemp = ""
      let registerIdTemp = ""
      let authKeyTemp = ""
      let serialNumberTemp = ""
      let commType = ""
      let bluetoothAddr = ""
      if(paymentMachineType == PaymentTerminalType.Pax){
        
        nameTemp = _.get(paxMachineInfo, 'name')
        ipTemp = _.get(paxMachineInfo, 'ip')
        portTemp = _.get(paxMachineInfo, 'port')
        commType = _.get(paxMachineInfo, 'commType')
        bluetoothAddr = _.get(paxMachineInfo, 'bluetoothAddr')

     } else if(paymentMachineType == PaymentTerminalType.Clover){

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
      setCommType(commType)
      setBluetoothAddr(bluetoothAddr)
      setTerminalIdSelected(terminalId)

    }, []);

    const [, submitSelectTerminalId] = useAxiosMutation({
      ...updateTerminalId(terminalIdSelected),
      isStopLoading: true,
      isLoadingDefault: false,
      onSuccess: async (data, response) => {
        if (response?.codeNumber == 200) {
        
        }
      }
    });

  const setupPaymentTerminal = async () => {
    //save terminal id
    const body = await updateTerminalId(terminalIdSelected);
    submitSelectTerminalId(body.params);

     if (terminalName == PaymentTerminalType.Pax) {
       //Pax
       if (commType === "BLUETOOTH") {
          if (stringIsEmptyOrWhiteSpaces(name) 
              || stringIsEmptyOrWhiteSpaces(bluetoothAddr)) {
              alert('Please enter full infomation!');
          } else {
            dispatch(hardware.setupPaxMachine({
              paymentMachineInfo: { ip, port, isSetup: true, name, commType, bluetoothAddr },
              paymentMachineType: PaymentTerminalType.Pax,
            }));
            NavigationService.back();
          }
        } else {
            if (stringIsEmptyOrWhiteSpaces(name) 
                || stringIsEmptyOrWhiteSpaces(ip) 
                || stringIsEmptyOrWhiteSpaces(port)) {

                alert('Please enter full infomation!');
            } else {
              dispatch(hardware.setupPaxMachine({
                paymentMachineInfo: { ip, port, isSetup: true, name, commType, bluetoothAddr },
                paymentMachineType: PaymentTerminalType.Pax,
              }));
              NavigationService.back();
            };
        }
        
     } else if (terminalName == PaymentTerminalType.Dejavoo){
       //Dejavoo
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
        if (stringIsEmptyOrWhiteSpaces(ip) 
          || stringIsEmptyOrWhiteSpaces(port) 
          || stringIsEmptyOrWhiteSpaces(serialNumber)) {
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

  const cancelSetupPax = async () => {
      NavigationService.back();
  }

  const setTerminal = (terminalNameTemp) => () => {
    if(terminalNameTemp != terminalName) {
        let tempName = name 
        let tempIp = ip
        let tempPort = port
        let tempRegisterId = registerId
        let tempAuthKey = authKey
        let commType = commType
        let bluetoothAddr = bluetoothAddr
        if (terminalNameTemp == PaymentTerminalType.Pax) {
          tempName = _.get(paxMachineInfo, 'name')
          tempIp = _.get(paxMachineInfo, 'ip')
          tempPort = _.get(paxMachineInfo, 'port')
          commType = _.get(paxMachineInfo, 'commType')
          bluetoothAddr = _.get(paxMachineInfo, 'bluetoothAddr')
        } else if (terminalNameTemp == PaymentTerminalType.Dejavoo) {
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
        setCommType(commType);
        setBluetoothAddr(bluetoothAddr);
    }
  }

  const saveCommType = (commType) => {
    setCommType(commType);

    if (commType === "BLUETOOTH") {
      scanDevices();
    }
  }

  const scanDevices = async () => {
    setPeripherals([]);
    setScanLoading(true);
    
    manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            return
        }

        if (device?.localName) {
            const tempPeripherals = [...peripherals];
            tempPeripherals.push({
                id: device?.id || "",
                name: device?.name || "",
                localName: device?.localName || ""
            });

            setPeripherals(tempPeripherals);
        }
    });

    setTimeout(() => {
      setScanLoading(false);
    }, 20000);
  }

  const handleSelectPeripheral = (peripheral) => () => {
    dispatch(hardware.saveBluetoothPaxInfo(peripheral));

    const name = peripheral?.name || ""
    const bluetoothAddr = peripheral?.id || ""
    setName(name);
    setBluetoothAddr(bluetoothAddr);
}


  return {
    terminalListRef,
    terminalIdList,
    peripherals,
    name,
    ip,
    port,
    serialNumber,
    registerId,
    authKey,
    terminalName,
    commType,
    bluetoothAddr,
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
    },
    setTerminalIdSelected: (terminalId) => {
      setTerminalIdSelected(terminalId)
    },
    saveCommType,
    scanDevices,
    handleSelectPeripheral,
    scanLoading,
  };
};

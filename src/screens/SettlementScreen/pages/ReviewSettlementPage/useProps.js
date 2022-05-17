
import React from "react";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { app } from "@redux/slices";
import { Platform, Alert, NativeModules, NativeEventEmitter } from "react-native";
import { axios } from '@shared/services/axiosClient';
import useRefetchSettlementWaiting from "./useRefetchSettlementWaiting";
import NavigationService from '@navigation/NavigationService';
import {
  PaymentTerminalType,
  REMOTE_APP_ID,
  APP_NAME,
  POS_SERIAL,
} from "@shared/utils";
import { requestSettlementDejavoo } from "@utils";
import _ from "lodash";
import { parseString } from 'react-native-xml2js';
import configureStore from '@src/redux/store';
import { useTranslation } from "react-i18next";
import {
  useAxiosQuery,
  getSettlementWating,
} from "@src/apis";
const { clover } = NativeModules;

const PosLink = NativeModules.batch;
const { persistor, store } = configureStore();

export const useProps = (props) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  //ADD LISTENER FROM CLOVER MODULE
  let eventEmitter = new NativeEventEmitter(clover);
  let subscriptions = [];
  const {
    settlement: {
      settlementWaiting = {},
    },
    hardware: {
      cloverMachineInfo,
      dejavooMachineInfo,
      paxMachineInfo,
      paymentMachineType
    },
  } = useSelector(state => state);

  const dialogProgressRef = React.useRef();
  const refDialogConfirm = React.useRef();

  const [terminalIdPax, setTerminalIdPax] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [terminalId, setTerminalId] = React.useState(null);
  const [countFetchhing, setCountFetching] = React.useState(0);
  const [settlementWaitingWithoutTerminal, setSettlementWaitingWithoutTerminal] = React.useState(null);

  const [refetchSettlementWaiting] = useRefetchSettlementWaiting();

  const [, fetchSettlementWatingWithOutTerminal] = useAxiosQuery({
    ...getSettlementWating(null, paymentMachineType.toLowerCase()),
    queryId: "fetchSettlementWating_WithOutTerminal",
    enabled: false,
    isLoadingDefault: true,
    timeout: 90000,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        if (response?.data?.total != 0) {

          setTimeout(() => dialogProgressRef?.current?.show(), 200);
          setTimeout(() => {
            const body = {
              terminalId: null,
              paymentByHarmony: response?.data?.paymentByHarmony,
              paymentByCreditCard: 0.00,
              paymentByCash: response?.data?.paymentByCash,
              otherPayment: response?.data?.otherPayment,
              total: response?.data?.total,
              note: response?.data?.note,
              checkout: response?.data?.checkout,
              discount: response?.data?.discount,
              paymentByCashStatistic: response?.data?.paymentByCashStatistic,
              otherPaymentStatistic: response?.data?.otherPaymentStatistic,
              isConnectPax: false,
              paymentTerminal: response?.data?.paymentTerminal
            }
            submitCloseSettlement(body);
          });
        } else {
          setProgress(100);
          refetchSettlementWaiting();
          NavigationService.back();
        }

      }

    }
  });



  React.useEffect(() => {
    if (Platform.OS === "ios") {
      registerEvents()

      return function cleanup() {
        unregisterEvents();
      };
    }

    if (paymentMachineType == PaymentTerminalType.Pax) {
      setTerminalIdPax(_.get(props, "terminalIdPax"));
    }
  }, []);

  /****************** Integrate Clover **************************/

  const registerEvents = () => {
    clover.changeListenerStatus(true)
    subscriptions = [
      eventEmitter.addListener('closeoutSuccess', data => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if (isProcessCloseBatchClover) {
          dispatch(settlement.setIsProcessCloseBatchClover(false))
          // dialogProgressRef?.current?.hide();
          proccessingSettlement();
        }

      }),
      eventEmitter.addListener('closeoutFail', data => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if (isProcessCloseBatchClover) {

          setTimeout(() => {
            confirmCloseoutWithoutPaymentTerminal();
          }, 200)
        }
      }),
      eventEmitter.addListener('pairingCode', data => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if (data) {
          if (isProcessCloseBatchClover) {
            dialogProgressRef?.current?.hide();
          }
        }
      }),
      eventEmitter.addListener('pairingSuccess', data => {

        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if (isProcessCloseBatchClover) {
          setTimeout(() => {
            dialogProgressRef?.current?.show();
          }, 200)
        }

      }),

      eventEmitter.addListener('deviceDisconnected', () => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if (isProcessCloseBatchClover) {
          dialogProgressRef?.current?.hide();
          dispatch(settlement.setIsProcessCloseBatchClover(false))
          setTimeout(() => {
            alert(t("No connected device"))
          }, 200)
          clover.cancelTransaction();
          setTimeout(() => {
            confirmCloseoutWithoutPaymentTerminal();
          }, 200)
        }
      }),
    ]
  }

  const unregisterEvents = () => {
    subscriptions.forEach(e => e.remove())
    subscriptions = []
  }


  const proccessingSettlement = () => {

    setTimeout(() => {
      const body = {
        terminalId: terminalId,
        paymentByHarmony: settlementWaiting.paymentByHarmony,
        paymentByCreditCard: settlementWaiting.paymentByCreditCard,
        paymentByCash: settlementWaiting.paymentByCash,
        otherPayment: settlementWaiting.otherPayment,
        total: settlementWaiting.total,
        note: settlementWaiting.note,
        checkout: settlementWaiting.checkout,
        discount: settlementWaiting.discount,
        paymentByCashStatistic: settlementWaiting.paymentByCashStatistic,
        otherPaymentStatistic: settlementWaiting.otherPaymentStatistic,
        isConnectPax: settlementWaiting.isConnectPax,
        paymentTerminal: settlementWaiting.paymentTerminal
      }
      submitCloseSettlement(body);
    }, 400);
  }

  const closeSettlement = async () => {
    dialogProgressRef?.current?.show();
    setProgress(50);

    if (paymentMachineType == PaymentTerminalType.Dejavoo
      && _.get(dejavooMachineInfo, "isSetup")) {
      const parameter = {
        dejavooMachineInfo,
      };
      const responses = await requestSettlementDejavoo(parameter);
      parseString(responses, (err, result) => {
        if (err || _.get(result, 'xmp.response.0.ResultCode.0') != 0) {
          const resultTxt = `${_.get(result, 'xmp.response.0.Message.0')}`
            || "Error";
          // dialogProgressRef?.current?.hide();
            confirmCloseoutWithoutPaymentTerminal();

        } else {
          proccessingSettlement();
        }
      })

    } else if (paymentMachineType == PaymentTerminalType.Clover
      && _.get(cloverMachineInfo, "isSetup")) {
      if (Platform.OS === 'ios') {

        const port = _.get(cloverMachineInfo, 'port')
          ? _.get(cloverMachineInfo, 'port') : 80
        const url = `wss://${_.get(cloverMachineInfo, 'ip')}:${port}/remote_pay`
        dispatch(settlement.setIsProcessCloseBatchClover(true));
        clover.closeout({
          url,
          remoteAppId: REMOTE_APP_ID,
          appName: APP_NAME,
          posSerial: POS_SERIAL,
          token: _.get(cloverMachineInfo, 'token') ? _.get(cloverMachineInfo, 'token', '') : "",
        })
      }
    } else if (paymentMachineType == PaymentTerminalType.Pax
      && _.get(paxMachineInfo, "isSetup")) {
      const { ip, port, commType, bluetoothAddr, isSetup } = paxMachineInfo;
      const tempIpPax = commType == "TCP" ? ip : "";
      const tempPortPax = commType == "TCP" ? port : "";
      const idBluetooth = commType === "TCP" ? "" : bluetoothAddr;
      PosLink.batchTransaction({
        transType: "BATCHCLOSE",
        edcType: "ALL",
        commType: commType,
        destIp: tempIpPax,
        portDevice: tempPortPax,
        timeoutConnect: "90000",
        bluetoothAddr: idBluetooth
      },
        message => handleResponseBatchTransactionsPax(message, []));
    } else {
      confirmCloseoutWithoutPaymentTerminal();
    }
  }

  /****************** Integrate Pax **************************/

  const handleResponseBatchTransactionsPax = (message) => {

    try {
      const result = JSON.parse(message);
      if (result.status == 0) {
        //Error
        setTimeout(() => {
          confirmCloseoutWithoutPaymentTerminal();
        }, 200)
      } else {
        proccessingSettlement();
      }
    } catch (error) {
    }
  }

  /****************** Functions **************************/
  const confirmCloseoutWithoutPaymentTerminal = () => {
        dialogProgressRef?.current?.hide();

        setTimeout(()=>{
          refDialogConfirm?.current?.show(); 
        }, 700)
  }

  const onConfirmCloseoutWithoutPaymentTerminal = async() => {
    if (paymentMachineType != PaymentTerminalType.Pax) {
      const body = await getSettlementWating(null, paymentMachineType.toLowerCase())
      fetchSettlementWatingWithOutTerminal(body.params);
    } else {
      proccessingSettlement()
    }
  }

  const submitCloseSettlement = async (data) => {
    dispatch(app.showLoading());
    const params = {
      url: `settlement`,
      method: 'POST',
      data,
      onDownloadProgress: progressEvent => {
        if (Platform.OS == "ios") {
          const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
          const current = progressEvent.currentTarget.response.length

          let percentCompleted = Math.floor(current / total * 100);
          setProgress(percentCompleted);
        }
      }
    }
    try {

      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        setProgress(100);
        refetchSettlementWaiting(terminalIdPax);
        // NavigationService.back();
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
    }
  }


  return {
    settlementWaiting,
    dialogProgressRef,
    progress,
    refDialogConfirm,
    onConfirmCloseoutWithoutPaymentTerminal,

    viewCreditTransactions: () => {
      NavigationService.navigate(screenNames.CreditCardTransactionPage);
    },

    closeSettlement,

    viewBatch: () => {
      dialogProgressRef?.current?.hide();
      NavigationService.navigate(screenNames.SettlementScreen, { screen: screenNames.BatchHistoryPage });
    },

    finish: () => {
      dialogProgressRef?.current?.hide();
      NavigationService.navigate(screenNames.SettlementWaitingPage);
    }

  };
};

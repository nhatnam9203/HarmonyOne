
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
const { clover } = NativeModules;
const { persistor, store } = configureStore();

export const useProps = (props) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  //ADD LISTENER FROM CLOVER MODULE
  let eventEmitter = new NativeEventEmitter(clover);
  let subscriptions = [];

  const dialogProgressRef = React.useRef();

  const [progress, setProgress] = React.useState(0);
  const [terminalId, setTerminalId] = React.useState(null);
  const [countFetchhing, setCountFetching] = React.useState(0);

  const [refetchSettlementWaiting] = useRefetchSettlementWaiting();

  const {
    settlement: {
      settlementWaiting = {},
    },
    hardware: {
      cloverMachineInfo,
      dejavooMachineInfo,
      paymentMachineType
    },
  } = useSelector(state => state);

  React.useEffect(() => {
    if (Platform.OS === "ios") {
      registerEvents()

      return function cleanup() {
        unregisterEvents();
      };
    }
  }, []);

  /****************** Integrate Clover **************************/

  const registerEvents = () => {
    clover.changeListenerStatus(true)
    subscriptions = [
      eventEmitter.addListener('closeoutSuccess', data => {
        dispatch(settlement.setIsProcessCloseBatchClover(false))
        dialogProgressRef?.current?.hide();
        proccessingSettlement(false);
       }),
      eventEmitter.addListener('closeoutFail', data => {
        dialogProgressRef?.current?.hide();
        dispatch(settlement.setIsProcessCloseBatchClover(false))

        setTimeout(() => {
          confirmCloseoutWithoutPaymentTerminal();
        }, 200)
      }),
      eventEmitter.addListener('pairingCode', data => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if(data){
          if(isProcessCloseBatchClover) {
            dialogProgressRef?.current?.hide();
          }
        }
      }),
      eventEmitter.addListener('pairingSuccess', data => {
    
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if(isProcessCloseBatchClover) {
          setTimeout(() => {
            dialogProgressRef?.current?.show();
          }, 200)
        }
       
      }),

      eventEmitter.addListener('deviceDisconnected', () => {
        const { settlement: { isProcessCloseBatchClover } } = store.getState();
        if(isProcessCloseBatchClover) {
          dialogProgressRef?.current?.hide();
          dispatch(settlement.setIsProcessCloseBatchClover(false))
          setTimeout(() => {
            alert(t("No connected device"))
          }, 200)
          clover.cancelTransaction();
        }
      }),
    ]
  }

  const unregisterEvents = () => {
    subscriptions.forEach(e => e.remove())
    subscriptions = []
  }


  const proccessingSettlement = (isPaymentWithoutPaymentTerminal = false) => {
    const amountPaymentCreditCard = isPaymentWithoutPaymentTerminal ? 
                                    settlementWaiting.paymentByCreditCard
                                    : 0.0
    const totalSettle = isPaymentWithoutPaymentTerminal ? 
                        settlementWaiting.total - settlementWaiting.paymentByCreditCard
                        : settlementWaiting.total
    setTimeout(() => {
      const body = {
        terminalId: terminalId,
        paymentByHarmony: settlementWaiting.paymentByHarmony,
        paymentByCreditCard: settlementWaiting.paymentByCreditCard,
        paymentByCash: settlementWaiting.paymentByCash,
        otherPayment: settlementWaiting.otherPayment,
        total: totalSettle,
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
          dialogProgressRef?.current?.hide();

          setTimeout(() => {
            confirmCloseoutWithoutPaymentTerminal();
          }, 200)

        } else {
          proccessingSettlement(false);
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
    } else {
      confirmCloseoutWithoutPaymentTerminal();
    }
  }

  const confirmCloseoutWithoutPaymentTerminal = () => {
    Alert.alert(
      'Unable to connect to payment terminal or not found any transaction on your payment terminal, Do you want to continue without payment terminal?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => { dialogProgressRef?.current?.hide(); },
          style: 'cancel'
        },
        { text: 'OK', onPress: () => proccessingSettlement(true) }
      ],
      { cancelable: false }
    );
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
        refetchSettlementWaiting();
        NavigationService.back();
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

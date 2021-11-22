
import React from "react";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { app } from "@redux/slices";
import { Platform, Alert } from "react-native";
import { axios } from '@shared/services/axiosClient';
import useRefetchSettlementWaiting from "./useRefetchSettlementWaiting";
import NavigationService from '@navigation/NavigationService';
import { PaymentTerminalType } from "@shared/utils";
import { requestSettlementDejavoo } from "@utils";
import _ from "lodash";
import { parseString } from 'react-native-xml2js';

export const useProps = (props) => {
  const dispatch = useDispatch();

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

  const proccessingSettlement = () => {
    setTimeout(() => {
      const body = {
        TerminalId: null,
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
            alert(resultTxt)
          }, 200)

        } else {
          proccessingSettlement();
        }
      })

    } else {
      Alert.alert(
        'Unable to connect to payment terminal or not found any transaction on your payment terminal, Do you want to continue without payment terminal?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => { dialogProgressRef?.current?.hide(); },
            style: 'cancel'
          },
          { text: 'OK', onPress: () => proccessingSettlement() }
        ],
        { cancelable: false }
      );
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
        refetchSettlementWaiting();
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

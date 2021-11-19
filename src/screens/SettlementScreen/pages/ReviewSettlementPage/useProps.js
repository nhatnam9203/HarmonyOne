
import React from "react";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { app } from "@redux/slices";
import { Platform } from "react-native";
import { axios } from '@shared/services/axiosClient';
import useRefetchSettlementWaiting from "./useRefetchSettlementWaiting";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogProgressRef = React.useRef();

  const [progress, setProgress] = React.useState(0);
  const [countFetchhing, setCountFetching] = React.useState(0);

  const [refetchSettlementWaiting] = useRefetchSettlementWaiting();

  const {
    settlement: {
      settlementWaiting = {},

    }
  } = useSelector(state => state);


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


    closeSettlement: () => {
      dialogProgressRef?.current?.show()
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
    },

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

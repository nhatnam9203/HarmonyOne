
import React from "react";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { useAxiosQuery, getListStaffsSales, getListGiftCardSales, getSettlementWating, getBatchHistory, getTransactions } from "@src/apis";
import { app } from "@redux/slices";
import { Platform } from "react-native";
import { axios } from '@shared/services/axiosClient';
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
      console.log('proccessingSettlement', body)
      submitCloseSettlement(body);
    }, 400);
  }

  const closeSettlement = async() => {
    console.log('closeSettlement')
    dialogProgressRef?.current?.show();

    if(paymentMachineType == PaymentTerminalType.Dejavoo 
      && _.get(dejavooMachineInfo, "isSetup")) { 
        const parameter = {
          dejavooMachineInfo,
        };
      const responses = await requestSettlementDejavoo(parameter);
      console.log('requestSettlementDejavoo', responses)
      parseString(responses, (err, result) => {
          if (err || _.get(result, 'xmp.response.0.ResultCode.0') != 0) {
            const resultTxt = `${_.get(result, 'xmp.response.0.Message.0')}`
                              || "Error";
            dialogProgressRef?.current?.hide();  

            setTimeout(()=>{
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
                  onPress: () => { },
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
        if(Platform.OS == "ios"){
          const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
          const current = progressEvent.currentTarget.response.length
  
          let percentCompleted = Math.floor(current / total * 100);
          setProgress(percentCompleted);
        }
      }
    }
    console.log('close settlement', params)
    try {
     
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        setProgress(100);
        refetchSettlement();
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
      // dispatch(app.hideLoading());
    }
  }


  const [, fetchBatchHistory] = useAxiosQuery({
    ...getBatchHistory("", "", "", "", 1),
    queryId: "fetchBatchHistory_reviewSettlement",
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setBatchHistory({
          ...response,
          currentPage: 1
        }));
      }
    },
  });

  const [, fetchListStaffsSales] = useAxiosQuery({
    ...getListStaffsSales("", "", "", "", 1),
    queryId: "fetchListStaffsSales_reviewSettlement",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListStaffsSales(data))
      }
    },
  });


  const [, fetchListGiftCardSales] = useAxiosQuery({
    ...getListGiftCardSales("", "", "", "", 1),
    queryId: "fetchListGiftCardSales_reviewSettlement",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    },
  });

  const [, fetchSettlementWating] = useAxiosQuery({
    ...getSettlementWating("", "", "", "", 1),
    queryId: "fetchSettlementWating_reviewSettlement",
    enabled: false,
    isStopLoading: true,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setSettlementWaiting(data));
        fetchBatchHistory();
      }
    },
  });

  const [, fetchTransactions] = useAxiosQuery({
    ...getTransactions(),
    queryId: "fetchTransactions_reviewSettlement",
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(
          settlement.setTransactions({
            ...response,
            currentPage: 1
          }));
      }
    },
  });

  const refetchSettlement = () => {
    console.log('refetchSettlement')
    const body = getListStaffsSales(terminalId);
    console.log('body', body.params)
    fetchListStaffsSales(body.params);

    const bodyGiftCard = getListGiftCardSales(terminalId)
    console.log('body', bodyGiftCard.params)
    fetchListGiftCardSales(bodyGiftCard.params);

    const terminalType = paymentMachineType ? paymentMachineType.toLowerCase() : ""
    const bodySettleWaiting = getSettlementWating(terminalId, terminalType)
    console.log('body', bodySettleWaiting.params)
    fetchSettlementWating(bodySettleWaiting.params);
    
    fetchTransactions();
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

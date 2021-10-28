
import React from "react";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { useAxiosQuery, getListStaffsSales, getListGiftCardSales, getSettlementWating, getBatchHistory, getTransactions } from "@src/apis";
import { app } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogProgressRef = React.useRef();

  const [progress, setProgress] = React.useState(0);

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
        const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
        const current = progressEvent.currentTarget.response.length

        let percentCompleted = Math.floor(current / total * 100);
        setProgress(percentCompleted);
      }
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        refetchSettlement();
      } else {
        Alert.alert(response?.data?.message)
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  const [, fetchBatchHistory] = useAxiosQuery({
    ...getBatchHistory("", "", "", "", 1),
    queryId: "fetchBatchHistory_reviewSettlement",
    enabled: false,
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
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setSettlementWaiting(data));
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
    fetchBatchHistory();
    fetchListStaffsSales();
    fetchListGiftCardSales();
    fetchSettlementWating();
    fetchTransactions();
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
      NavigationService.navigate(screenNames.BatchHistoryPage);
    },

    finish: () => {
      NavigationService.navigate(screenNames.CloseSettlementPage);
    }

  };
};

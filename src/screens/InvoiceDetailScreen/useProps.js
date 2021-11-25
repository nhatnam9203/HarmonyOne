import React from "react";
import { 
  Alert, 
  Platform, 
  NativeEventEmitter,
  NativeModules,
 } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useAxiosMutation,
  useAxiosQuery,
  changeStatustransaction,
  getAppointmentByDate,
  getInvoiceDetail,
} from '@src/apis';
import { dateToFormat, 
  PaymentTerminalType, 
  stringIsEmptyOrWhiteSpaces,
  REMOTE_APP_ID,
  APP_NAME,
  POS_SERIAL,
 } from "@shared/utils";

import { appointment, invoice } from "@redux/slices";
import NavigationService from '@navigation/NavigationService'
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import {
  requestTransactionDejavoo,
} from "@utils";
import { parseString } from 'react-native-xml2js';
import configureStore from '@src/redux/store';
const { clover } = NativeModules;
const { persistor, store } = configureStore();

export const useProps = (props) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

   //ADD LISTENER FROM CLOVER MODULE
   let eventEmitter = new NativeEventEmitter(clover);
   let subscriptions = [];

  const viewShotRef = React.useRef();
  const popupProcessingRef = React.useRef();
  const invoiceRef = React.useRef(null);
  const popupConfirmPrintRef = React.useRef();

  const {
    invoice: { invoiceDetail, isProcessVoidPaymentClover },
    appointment: { appointmentDate },
    hardware: { 
      paymentMachineType,
      dejavooMachineInfo,
      cloverMachineInfo,
     },
  } = useSelector(state => state);

  const [, submitChangeStatusTransaction] = useAxiosMutation({
    ...changeStatustransaction(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(invoice.updateStatusInvoiceSuccess(invoiceDetail));
        // NavigationService.back();
        popupConfirmPrintRef?.current?.show();
        fetchInvoiceDetail();
        // fetchAppointmentByDate();
      }
    },
  });

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "fetchAppointmentByDate_invoiceDetail",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });

  const [, fetchInvoiceDetail] = useAxiosQuery({
    ...getInvoiceDetail(invoiceDetail?.checkoutId),
    queryId: "getInvoiceDetail_refetch",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(invoice.setInvoiceDetail(data));
    },
  });

  /************************************* useEffect *************************************/

  React.useEffect(() => {
    registerEvents()

    return function cleanup() {
      unregisterEvents();
    };
  }, []);

  /****************** Integrate Clover **************************/

  const registerEvents = () => {
    clover.changeListenerStatus(true)
    subscriptions = [
      eventEmitter.addListener("voidPaymentSuccess", (data) => {
        const { hardware: { cloverMachineInfo } } = store.getState();
        dispatch(invoice.setIsProcessVoidPaymentClover(false));
        let messageUpdate = {
          ...data,
          sn: _.get(cloverMachineInfo, "serialNumber"),
        };
        handleResultVoidTransactionCloverSuccess(messageUpdate);
      }),
      eventEmitter.addListener("voidPaymentFail", (data) => {
        dispatch(invoice.setIsProcessVoidPaymentClover(false))
        handleResultVoidTransactionCloverFailed(
          _.get(data, "errorMessage")
        );
      }),
      eventEmitter.addListener("refundPaymentSuccess", (data) => {
        const { hardware: { cloverMachineInfo } } = store.getState();
        dispatch(invoice.setIsProcessVoidPaymentClover(false))
        let messageUpdate = {
          ...data,
          sn: _.get(cloverMachineInfo, "serialNumber"),
        };
        handleResultVoidTransactionCloverSuccess(messageUpdate);
      }),
      eventEmitter.addListener("refundPaymentFail", (data) => {
        dispatch(invoice.setIsProcessVoidPaymentClover(false))
        handleResultVoidTransactionCloverFailed(
          _.get(data, "errorMessage")
        );
      }),
      eventEmitter.addListener('pairingCode', data => {
        const { invoice: { isProcessVoidPaymentClover } } = store.getState();
        if(data){
          if(isProcessVoidPaymentClover) {
            popupProcessingRef?.current?.hide();
          }
        }
      }),
      eventEmitter.addListener('pairingSuccess', data => {
    
        const { invoice: { isProcessVoidPaymentClover } } = store.getState();
        if(isProcessVoidPaymentClover) {
          setTimeout(() => {
            popupProcessingRef?.current?.show();
          }, 200)
        }
       
      }),

      eventEmitter.addListener('deviceDisconnected', () => {
        const { invoice: { isProcessVoidPaymentClover } } = store.getState();
        if(isProcessVoidPaymentClover) {
          dispatch(invoice.setIsProcessVoidPaymentClover(false))
          handleResultVoidTransactionCloverFailed(
            t("No connected device")
          );
        }
      }),
    ]
  }

  const unregisterEvents = () => {
    subscriptions.forEach(e => e.remove())
    subscriptions = []
  }

  const handleResultVoidTransactionCloverSuccess = async (result) => {
    const { 
      hardware: { cloverMachineInfo },
      invoice: { invoiceDetail },
     } = store.getState();

    popupProcessingRef?.current?.hide();

    const data = {
      responseData: result,
      paymentTerminal: "clover",
    };
    const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
    submitChangeStatusTransaction(body.params);
  };

  const handleResultVoidTransactionCloverFailed = async (message) => {
    popupProcessingRef?.current?.hide();
    setTimeout(() => {
      alert(message);
    }, 300);
  };

  /****************** Function **************************/

  const handleResultRefundTransactionDejavoo = async (responses) => {
    popupProcessingRef?.current?.hide();

    parseString(responses, (err, result) => {
      if (err || _.get(result, "xmp.response.0.ResultCode.0") != 0) {
        let detailMessage = _.get(result, "xmp.response.0.RespMSG.0", "")
          .replace(/%20/g, " ");
        detailMessage = !stringIsEmptyOrWhiteSpaces(detailMessage)
          ? `: ${detailMessage}`
          : detailMessage;

        const resultTxt =
          `${_.get(result, "xmp.response.0.Message.0")}${detailMessage}` ||
          "Error";
        setTimeout(() => {
          alert(resultTxt);
        }, 300);
          
      } else {
        const data = {
          responseData: responses,
          paymentTerminal: "dejavoo",
        };
        const body = changeStatustransaction(invoiceDetail?.checkoutId, data);
        submitChangeStatusTransaction(body.params);
      }
    });
  };

  const handleVoidRefundCreditCard = () => {
      const paymentInformation =
        invoiceDetail?.paymentInformation[0]?.responseData || {};
      const method = _.get(
        invoiceDetail,
        "paymentInformation.0.paymentData.method"
      );

      if (!_.isEmpty(paymentInformation)) {
        popupProcessingRef?.current?.show();
        
        if (invoiceDetail?.status === "paid") {
          if (paymentMachineType == PaymentTerminalType.Dejavoo) {
            if (method != "Dejavoo") {
              popupProcessingRef?.current?.hide();
              alert(t("Your transaction is invalid"));
              return;
            }
            const amount = _.get(
              invoiceDetail,
              "paymentInformation.0.amount"
            );

            parseString(paymentInformation, (err, result) => {
              if (err) {
                setTimeout(() => {
                  alert("Error");
                }, 300);
              } else {
                const transactionId = _.get(result, "xmp.response.0.RefId.0");
                const invNum = _.get(result, "xmp.response.0.InvNum.0");
                const params = {
                  tenderType: "Credit",
                  transType: "Return",
                  amount: parseFloat(amount).toFixed(2),
                  RefId: transactionId,
                  invNum: `${invNum}`,
                  dejavooMachineInfo,
                };
                requestTransactionDejavoo(params).then((responses) => {
                  handleResultRefundTransactionDejavoo(responses);
                });
              }
            });
          } else if (paymentMachineType == PaymentTerminalType.Clover) {
            if (Platform.OS === 'ios') {
              if (method != "Clover") {
                popupProcessingRef?.current?.hide();
                alert(t("Your transaction is invalid"));
                return;
              }
              const portClover = _.get(cloverMachineInfo, "port")
                ? _.get(cloverMachineInfo, "port")
                : 80;
              const ipClover = _.get(cloverMachineInfo, "ip");
              const url = `wss://${ipClover}:${portClover}/remote_pay`;
  
              dispatch(invoice.setIsProcessVoidPaymentClover(true))
  
              const paymentInfo = {
                url,
                remoteAppId: REMOTE_APP_ID,
                appName: APP_NAME,
                posSerial: POS_SERIAL,
                token: _.get(cloverMachineInfo, "token")
                  ? _.get(cloverMachineInfo, "token", "")
                  : "",
                orderId: paymentInformation?.orderId || "",
                paymentId: paymentInformation?.id || "",
              };
              clover.refundPayment(paymentInfo);
            }
          }
            
        } else if (invoiceDetail?.status === "complete") {
          if (paymentMachineType == PaymentTerminalType.Dejavoo) {
            if (method != "Dejavoo") {
              popupProcessingRef?.current?.hide();
              alert(t("Your transaction is invalid"));
              return;
            }
            const amount = _.get(
              invoiceDetail,
              "paymentInformation.0.amount"
            );
            parseString(paymentInformation, (err, result) => {
              if (err) {
                setTimeout(() => {
                  alert("Error");
                }, 300);
              } else {
                const transactionId = _.get(result, "xmp.response.0.RefId.0");
                const invNum = _.get(result, "xmp.response.0.InvNum.0");
                const params = {
                  tenderType: "Credit",
                  transType: "Void",
                  amount: parseFloat(amount).toFixed(2),
                  RefId: transactionId,
                  invNum: `${invNum}`,
                  dejavooMachineInfo,
                };
                requestTransactionDejavoo(params).then((responses) => {
                  handleResultRefundTransactionDejavoo(responses);
                });
              }
            });
          } else if (paymentMachineType == PaymentTerminalType.Clover) {
            if (Platform.OS === 'ios') {
              if (method != "Clover") {
                popupProcessingRef?.current?.hide();
                alert(t("Your transaction is invalid"));
                return;
              }
              const portClover = _.get(cloverMachineInfo, "port") 
                                ? _.get(cloverMachineInfo, "port") 
                                : 80;
              const ipClover = _.get(cloverMachineInfo, "ip");

              const url = `wss://${ipClover}:${portClover}/remote_pay`;
              dispatch(invoice.setIsProcessVoidPaymentClover(true))
              const paymentInfo = {
                url,
                remoteAppId: REMOTE_APP_ID,
                appName: APP_NAME,
                posSerial: POS_SERIAL,
                token: _.get(cloverMachineInfo, "token")
                  ? _.get(cloverMachineInfo, "token", "")
                  : "",
                orderId: paymentInformation?.orderId || "",
                paymentId: paymentInformation?.id || "",
              };
              clover.voidPayment(paymentInfo);
            }
          }
        }
      }
  }

  let isDebitPayment = false;
  const paymentMethod = invoiceDetail?.paymentMethod || "";

  try {
    if (paymentMethod && paymentMethod === "credit_card") {
      const paymentInformation =
        invoiceDetail?.paymentInformation?.length > 0
          ? invoiceDetail.paymentInformation
          : null;
      isDebitPayment =
        paymentInformation &&
          paymentInformation[0]?.paymentData &&
          `${paymentInformation[0]?.paymentData.transaction_type}`.toUpper() ==
          "CREDIT"
          ? false
          : true;
    }
  } catch (error) {
    isDebitPayment = false;
  }

  return {
    invoiceDetail,
    isDebitPayment,
    viewShotRef,
    popupProcessingRef,
    popupConfirmPrintRef,
    invoiceRef,
    voidRefundInvoice: async () => {
      if (invoiceDetail?.paymentMethod !== "credit_card") {
        const data = {
          responseData: {},
          paymentTerminal: null,
          sn: null,
        };
        const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
        submitChangeStatusTransaction(body.params);
      } else {
        handleVoidRefundCreditCard();
      }
    },

    shareInvoice: async () => {
      try {
        if (Platform.OS === "ios") {
          viewShotRef?.current?.capture().then(uri => {
            RNFetchBlob.ios.previewDocument(uri);
          })
      
        } else {
          viewShotRef?.current?.capture().then(async uri => {
            const shareResponse = await Share.open({
              url: `file://${uri}`,
            });
          })
        }
      } catch (error) {
        // alert(error)
      }
    },

    printInvoice : async() =>{
      setTimeout(() => {
        console.log('invoiceDetail', invoiceDetail)
        invoiceRef.current?.showAppointmentReceipt({
          appointmentId: invoiceDetail?.appointmentId,
          checkoutId: invoiceDetail?.checkoutId,
          isPrintTempt: false,
          machineType: paymentMachineType,
        });
      }, 300);
    },
    cancelInvoicePrint: () => {
    },
    onCancelTransactionCredit: () => {
      setTimeout(() => {
        alert("Please wait!")
      }, 300);
    },
  }
};

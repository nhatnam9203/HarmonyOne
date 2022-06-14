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
  getAppointmentById,
  voidRefundPaymentTransaction,
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
import _ from 'lodash';
import { useTranslation } from "react-i18next";
import {
  requestTransactionDejavoo,
} from "@utils";
import { parseString } from 'react-native-xml2js';
import configureStore from '@src/redux/store';
const { clover } = NativeModules;
const PosLink = NativeModules.payment;
const { persistor, store } = configureStore();

export const useProps = (props) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

   //ADD LISTENER FROM CLOVER MODULE
   let eventEmitter = new NativeEventEmitter(clover);
   let subscriptions = [];

   const [inputTransactionId, setInputTransactionId] = React.useState(null);

   const [isDisabledButtonRefund, setIsDisabledButtonRefund ] = React.useState(false);

  const viewShotRef = React.useRef();
  const popupProcessingRef = React.useRef();
  const invoiceRef = React.useRef(null);
  const popupConfirmPrintRef = React.useRef();

  const isAppointmentDetail = props?.route?.params?.isAppointmentDetail || null;
  const appointmentItem = props?.route?.params?.appointmentItem || null;

  const {
    invoice: { invoiceDetail, isProcessVoidPaymentClover },
    appointment: { appointmentDate },
    hardware: { 
      paymentMachineType,
      dejavooMachineInfo,
      cloverMachineInfo,
      paxMachineInfo,
     },
  } = useSelector(state => state);

  const language = useSelector(state => state.dataLocal.language);

  const [, submitVoidRefundPaymentTransaction] = useAxiosMutation({
    ...voidRefundPaymentTransaction(),
    onSuccess: (data, response) => {
      
    },
  });

  const [, submitChangeStatusTransaction] = useAxiosMutation({
    ...changeStatustransaction(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(invoice.updateStatusInvoiceSuccess(invoiceDetail));
        // NavigationService.back();
        setTimeout(()=> {
          popupConfirmPrintRef?.current?.show();
        }, 300)
        
        setIsDisabledButtonRefund(true);
        fetchInvoiceDetail();
        if(isAppointmentDetail){
          fetchAppointmentById();
        }
        // fetchAppointmentByDate();
      }
    },
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentItem?.appointmentId),
    queryId : "getAppointmentById_InvoiceDetail",
    enabled: false,
    onSuccess: (data, response) => {
        if (response?.codeNumber == 200) {
            dispatch(appointment.setAppointmentDetail(data));
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
          invoiceRef.current?.hide();
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
          clover.cancelTransaction();
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
  const handleResultVoidRefundTransactionPax = async (result) => {
    const data = JSON.parse(result);

    popupProcessingRef?.current?.hide();
    setInputTransactionId(
      null
    );

    if (data.ResultCode === "000000") {
      const data = {
        responseData: result,
        paymentTerminal: "pax",
      };
      const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
      submitChangeStatusTransaction(body.params);
    } else {
      PosLink.cancelTransaction();
      setTimeout(() => {
        alert(data.message);
      }, 300);
    }
  };

  const handleResultRefundTransactionDejavoo = async (responses) => {
    popupProcessingRef?.current?.hide();

    parseString(responses, async(err, result) => {
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
        const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
        submitChangeStatusTransaction(body.params);
      }
    });
  };

  const handleVoidRefundClover = async () => {
    const paymentInformation =
    invoiceDetail?.paymentInformation[0]?.responseData || {};
    const method = _.get(
      invoiceDetail,
      "paymentInformation.0.paymentData.method"
    );
    if (paymentMachineType == PaymentTerminalType.Clover) {
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
        if (invoiceDetail?.status === "paid") {
          clover.refundPayment(paymentInfo);
        } else {
          clover.voidPayment(paymentInfo);
        }
      }
    }
  }

  const handleVoidRefundTerminal = async (paymentData, index) => {
    const method = _.get(paymentData, "paymentData.method");
    const paymentInformation = paymentData?.responseData;

      if (paymentMachineType == PaymentTerminalType.Clover) {
        //TODO: will change later
        return false;
      } else if (paymentMachineType == PaymentTerminalType.Dejavoo) {
        if (method != "Dejavoo") {
          popupProcessingRef?.current?.hide();
          alert(t("Your transaction is invalid"));
          return false;
        }
        const amount = _.get(paymentData, "amount");
        if (index > 0) {
          //payment terminal need more time for the previous transaction completed
          await performTimeConsumingTask(10000);
        }
        const transType = invoiceDetail?.status === "paid" ? "Return" : "Void"

        return new Promise((resolve) => {
          parseString(paymentInformation, (err, result) => {
            if (err) {
              resolve(false);
            } else {
              const transactionId = _.get(result, "xmp.response.0.RefId.0");
              const invNum = _.get(result, "xmp.response.0.InvNum.0");
              const params = {
                tenderType: "Credit",
                transType,
                amount: parseFloat(amount).toFixed(2),
                RefId: transactionId,
                invNum: `${invNum}`,
                dejavooMachineInfo,
              };

              let status = true;

              requestTransactionDejavoo(params).then((responses) => {
                parseString(responses, (err, result) => {
                  if (
                    err ||
                    _.get(result, "xmp.response.0.ResultCode.0") != 0
                  ) {
                    status = false;
                  } else {
                    status = true;
                  }
                });

                const body = voidRefundPaymentTransaction(paymentData?.paymentTransactionId,
                  status,
                  responses,
                  "dejavoo");
                submitVoidRefundPaymentTransaction(body.params);
                resolve(status);
              });
            }
          });
        });
      } else {
        //Pax
        if (method != "Pax") {
          popupProcessingRef?.current?.hide();
          alert(t("Your transaction is invalid"));
          return false;
        }

        const { 
          ip, 
          port, 
          commType,
          bluetoothAddr, 
          isSetup 
        } = paxMachineInfo;
        const amount = paymentInformation?.ApprovedAmount || 0;
        const transactionId = paymentInformation?.RefNum || 0;
        const extData = paymentInformation?.ExtData || "";
        const invNum = paymentInformation?.InvNum || "";
        const tempIpPax = commType == "TCP" ? ip : "";
        const tempPortPax = commType == "TCP" ? port : "";
        const idBluetooth = commType === "TCP" ? "" : bluetoothAddr;

        if (index > 0) {
          await performTimeConsumingTask(5000);
        }

        const transType = invoiceDetail?.status === "paid" ? "RETURN" : "VOID"

        if(invoiceDetail?.status === "complete") {
          setInputTransactionId(
            transactionId
          );
        }
       
        return new Promise((resolve) => {
          let status = true;
          PosLink.sendTransaction(
            {
              tenderType: "CREDIT",
              transType,
              amount: invoiceDetail?.status === "complete" ? "" : `${parseFloat(amount)}`,
              transactionId: transactionId,
              extData: extData,
              commType: commType,
              destIp: tempIpPax,
              portDevice: tempPortPax,
              timeoutConnect: "90000",
              bluetoothAddr: idBluetooth,
              invNum: `${invNum}`,
            },
            (data) => {
              setInputTransactionId(null);
              const dataJSon = JSON.parse(data);
              if (dataJSon?.ResultCode === "000000") {
                status = true;
              } else {
                status = false;
              }
              const body = voidRefundPaymentTransaction(paymentData?.paymentTransactionId,
                status,
                data,
                "pax");
              submitVoidRefundPaymentTransaction(body.params);
              
              resolve(status);
            }
          );
        });
      }
  }

  const performTimeConsumingTask = async (timeOut) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, timeOut)
    );
  };

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
    inputTransactionId,
    invoiceDetail,
    isDebitPayment,
    viewShotRef,
    popupProcessingRef,
    popupConfirmPrintRef,
    invoiceRef,
    isDisabledButtonRefund,
    language,
    
    voidRefundInvoice: async () => {
      if (invoiceDetail?.paymentMethod == "credit_card" 
        || invoiceDetail?.paymentMethod == "multiple") {
        if (paymentMachineType == "Clover") {
          if (invoiceDetail?.paymentMethod === "credit_card") {
            handleVoidRefundClover();
          } else {
            //To do later
            setTimeout(() => {
              alert("Can not void/refund for multiple payment on Clover");
            }, 300);
          } 
        } else {
          popupProcessingRef?.current?.show();
          for (let i = 0; i < invoiceDetail?.paymentInformation.length; i++) {
            const paymentInformation = invoiceDetail?.paymentInformation[i];
            if (paymentInformation?.checkoutPaymentStatus == "paid") {
              let status = true;
    
              status = await handleVoidRefundTerminal(paymentInformation, i);
              if (!status) {
                popupProcessingRef?.current?.hide();
                setTimeout(() => {
                  alert("Error");
                }, 300);
                return;
              }
            }
          }
  
          const data = {
            responseData: {},
            paymentTerminal: paymentMachineType.toLowerCase(),
            sn: null,
          };
  
          popupProcessingRef?.current?.hide();
          const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
          submitChangeStatusTransaction(body.params);
        }
      }else {
        const data = {
          responseData: {},
          paymentTerminal: null,
          sn: null,
        };
        const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
        submitChangeStatusTransaction(body.params);
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
        invoiceRef.current?.showAppointmentReceipt({
          appointmentId: invoiceDetail?.appointmentId,
          checkoutId: invoiceDetail?.checkoutId,
          isPrintTempt: false,
          machineType: paymentMachineType,
        });
      }, 500);
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


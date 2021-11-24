import React from 'react';
import {
  useAxiosQuery,
  getListCustomer,
  selectPaymentMethod,
  checkoutSubmit,
  useAxiosMutation,
  checkoutAppointment,
  getAppointmentByDate,
  cancelHarmonyPayment,
  getGroupAppointmentById,
  submitPaymentWithCreditCard,
  sendGoogleReviewLink,
} from '@src/apis';
import { 
  useDispatch, 
  useSelector,
 } from "react-redux";
import {
  dateToFormat,
  guid,
  stringIsEmptyOrWhiteSpaces,
  getInfoFromModelNameOfPrinter,
  PaymentTerminalType,
  REMOTE_APP_ID,
  APP_NAME,
  POS_SERIAL,
  formatNumberFromCurrency,
} from "@shared/utils";
import PrintManager from "@lib/PrintManager";
import {
  requestTransactionDejavoo,
} from "@utils";
import {
  bookAppointment,
  appointment,
  app,
  hardware,
} from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { 
  Alert, 
  NativeEventEmitter, 
  NativeModules,
} from 'react-native';
import { isEmpty, method } from "lodash";
import { parseString } from 'react-native-xml2js';
import _ from 'lodash';
import Configs from '@src/config';
import configureStore from '@src/redux/store';
const signalR = require("@microsoft/signalr");
const { clover } = NativeModules;
const { persistor, store } = configureStore();


export const useProps = (props) => {
  const dispatch = useDispatch();
   //ADD LISTENER FROM CLOVER MODULE
   let eventEmitter = new NativeEventEmitter(clover);
   let subscriptions = []

  /************************************* REF *************************************/
  const dialogSuccessRef = React.useRef();
  const dialogActiveGiftCard = React.useRef();
  const popupPaymentDetailRef = React.useRef();
  const popupChangeRef = React.useRef();
  const popupErrorMessageRef = React.useRef();
  const popupPayProcessingRef = React.useRef();
  const invoiceRef = React.useRef();
  const popupConfirmDuplicateRef = React.useRef();

  /************************************* SELECTOR *************************************/
  const {
    appointment: { appointmentDetail,
      groupAppointments = [],
      appointmentDate,
      startProcessingPax,
     },
    auth: { staff },
    hardware: { dejavooMachineInfo,
      cloverMachineInfo,
      paymentMachineType,
      printerList,
      printerSelect, },
    merchant: { merchantDetail },
  } = useSelector(state => state);

  /************************************* STATE *************************************/
  const [methodPay, setMethodPay] = React.useState(null);
  const [payAppointmentId, setPayAppointmentId] = React.useState(null);
  const [isCancelHarmony, changeStatusCancelHarmony] = React.useState(false);
  const [connectionSignalR, setConnectionSignalR] = React.useState(null);
  const [paymentDetail, setPaymentDetail] = React.useState(null);
  const [errorMessageFromPax, setErrorMessageFromPax] = React.useState("");
  const [isSubmitCheckoutCreditCard, setIsSubmitCheckoutCreditCard] = React.useState(false);

  /************************************* useEffect *************************************/
  React.useEffect(() => {
    registerEvents()

    return function cleanup() {
      unregisterEvents();
    };
  }, []);

  React.useEffect(() => {
    if (payAppointmentId && methodPay.method === "credit_card") {
      handlePaymentByCredit();
    }
  }, [payAppointmentId]);

  /************************************* Integrate Clover *************************************/
  const registerEvents = () => {
    clover.changeListenerStatus(true)
    subscriptions = [
        eventEmitter.addListener('paymentSuccess', data => {
        store.dispatch(appointment.setIsProcessPaymentClover(false))
        handleResponseCreditCardForCloverSuccess(data)
      }),
      eventEmitter.addListener('paymentFail', data => {
        store.dispatch(appointment.setIsProcessPaymentClover(false))
        handleResponseCreditCardForCloverFailed(_.get(data, 'errorMessage'))
       }),
      eventEmitter.addListener('pairingCode', data => {
        const { appointment: { isProcessPaymentClover } } = store.getState();
        if(data){

          if(isProcessPaymentClover) {
            popupPayProcessingRef?.current?.hide();
          }
        }
      }),
      eventEmitter.addListener('pairingSuccess', data => {
        dispatch(hardware.setCloverToken(
          _.get(data, 'token')
        ));
    
        const { appointment } = store.getState();
        const { isProcessPaymentClover } = appointment;
        if(isProcessPaymentClover) {
          setTimeout(() => {
            popupPayProcessingRef?.current?.show();
          }, 200)
        }
       
      }),

      eventEmitter.addListener('confirmPayment', () => {
        popupPayProcessingRef?.current?.hide();
        setTimeout(() => {
          popupConfirmDuplicateRef?.current?.show();
        }, 200)
      }),

      eventEmitter.addListener('deviceDisconnected', () => {
        const { appointment: { isProcessPaymentClover } } = store.getState();
        if(isProcessPaymentClover) {
          store.dispatch(appointment.setIsProcessPaymentClover(false))
          handleResponseCreditCardForCloverFailed("No connected device")
        }
      }),
    ]
  }

  const unregisterEvents = () => {
    subscriptions.forEach(e => e.remove())
    subscriptions = []
  }

  const handleResponseCreditCardForCloverSuccess = async (message) => {
    popupPayProcessingRef?.current?.hide();
    const { hardware, auth, appointment } = store.getState();
    const { cloverMachineInfo } = hardware;
    const { staff } = auth;
    const { payAppointmentId } = appointment;
    let messageUpdate = {...message,
                sn: _.get(cloverMachineInfo, 'serialNumber')}
      const body = submitPaymentWithCreditCard(
        staff?.merchantId || 0,
        messageUpdate,
        payAppointmentId,
        groupAppointments?.dueAmount,
        "clover")
      submitPaymentCreditCard(body.params);
  }

  const handleResponseCreditCardForCloverFailed = async (errorMessage) => {
    const { appointment } = store.getState();
    const { payAppointmentId } = appointment;

    popupPayProcessingRef?.current?.hide();
    if (payAppointmentId) {
      setErrorMessageFromPax(errorMessage);
      const data = {
        status: "transaction fail",
        note: errorMessage,
      }
      const body = cancelHarmonyPayment(payAppointmentId, data)
      submitCancelHarmonyPayment(body.params);
    }
  }

  /************************************* GỌI API SELECT METHOD PAY *************************************/
  const [, submitSelectPaymentMethod] = useAxiosMutation({
    ...selectPaymentMethod(),
    isStopLoading: true,
    isLoadingDefault: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        if (methodPay.method == "harmony"
          || methodPay.method == "credit_card") {
          setPayAppointmentId(data);
          dispatch(appointment.setPayAppointmentId(data))
        }

        if (methodPay.method !== "harmony"
          && methodPay.method !== "credit_card") {
          const body = await checkoutSubmit(response.data);
          applyCheckoutSubmit(body.params);
        }
      }
    }
  });

  /************************************* GỌI API CHECKOUT SUBMIT *************************************/
  const [, applyCheckoutSubmit] = useAxiosMutation({
    ...checkoutSubmit(),
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        const dueAmount = parseFloat(
          response?.data?.checkoutPaymentResponse?.dueAmount || 0
        );

        popupPayProcessingRef?.current?.hide();

        if (dueAmount == 0) {
          setTimeout(() => {
            dialogSuccessRef?.current?.show();
          }, 200)

          return;
        }
        if (dueAmount < 0) {
          setPaymentDetail(response?.data);
          popupChangeRef?.current?.show();
          return;
        }
        if (dueAmount > 0) {
          fetchGroupApointmentById();
          setPaymentDetail(response?.data);
          popupPaymentDetailRef?.current?.show();
          setMethodPay(null);
        }
      }
    }
  });

  /************************************* GỌI API GET GROUP APPOINTMENT BY ID *************************************/
  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentDetail?.appointmentId),
    queryId: "refetchGroupAppointment",
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
        if (isSubmitCheckoutCreditCard) {
          setIsSubmitCheckoutCreditCard(false);
          const body = checkoutSubmit(payAppointmentId);
          applyCheckoutSubmit(body.params);

        }
      }
    }
  });


  /************************************* FETCH APPOINTMENT BY DATE *************************************/

  const [{ }, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, 'YYYY-MM-DD')),
    queryId: "fetchByDate_checkoutPage",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
      NavigationService.navigate(screenNames.AppointmentScreen);
      dispatch(bookAppointment.resetBooking());
    },
  });


  /************************************* CALL API CANCEL HARMONY PAYMENT *************************************/
  const [, submitCancelHarmonyPayment] = useAxiosMutation({
    ...cancelHarmonyPayment(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        if (methodPay.method === "credit_card") {
          setTimeout(() => {
            popupErrorMessageRef?.current?.show();
          }, 300);
        }
        setMethodPay(null);
        setPayAppointmentId(null);
        dispatch(appointment.setPayAppointmentId(null))
        changeStatusCancelHarmony(false);
        if (connectionSignalR) {
          connectionSignalR?.stop();
        }
        setTimeout(() => {
          setConnectionSignalR(null);
        }, 300);
      }
    }
  });

  /************************************* CALL API PAYMENT CREDIT CARD SUCCESS *************************************/
  const [, submitPaymentCreditCard] = useAxiosMutation({
    ...submitPaymentWithCreditCard(),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: async (data, response) => {
      setIsSubmitCheckoutCreditCard(true);
      fetchGroupApointmentById();

    }
  });

  /************************************* SEND GOOGLE REVIEW LINK *************************************/

  const [{ }, sendLinkGoogle] = useAxiosQuery({
    ...sendGoogleReviewLink(appointmentDetail?.customerId, staff?.merchantId),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {

    },
  });

  /************************************* HANDLE HARMONY PAYMENT SUCCESS *************************************/
  const handleHarmonyPayment = (checkoutPayment) => {
    setMethodPay(null);
    setPayAppointmentId(null);
    dispatch(appointment.setPayAppointmentId(null))
    changeStatusCancelHarmony(false);
    dialogSuccessRef?.current?.show();
  }

  /************************************* SETUP SIGNALR CHO METHOD HARMONY *************************************/
  const setupSignalR = () => {
    try {
      dispatch(app.showLoading());
      const urlconnect = `${Configs.SOCKET_URL}notification/?merchantId=${staff?.merchantId}&Title=Merchant&kind=app&deviceId=gfghdfgdfd&token=${staff?.token}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(
          `${Configs.SOCKET_URL}notification/?merchantId=${staff?.merchantId}&Title=Merchant&kind=app&deviceId=${guid()}&token=${staff?.token}`,
          {
            transport:
              signalR.HttpTransportType.LongPolling |
              signalR.HttpTransportType.WebSockets,
          }
        )
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on("ListWaNotification", (data) => {
        const temptData = JSON.parse(data);
        if (
          temptData.data &&
          !isEmpty(temptData.data) &&
          temptData.data.isPaymentHarmony &&
          temptData.data.checkoutGroupId == groupAppointments?.checkoutGroupId
        ) {
          handleHarmonyPayment(temptData.data.checkoutPayment);
          connection.stop();
        }
      });

      connection.onclose(async (error) => {
        // this.props.actions.appointment.resetConnectSignalR();
      });

      connection
        .start()
        .then(async () => {
          setConnectionSignalR(connection)
          const data = {
            method: "harmony",
            amount: appointmentDetail?.total,
            giftCardId: 0,
          }
          const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
          submitSelectPaymentMethod(body.params);
          changeStatusCancelHarmony(true)
        })
        .catch((error) => {
          dispatch(app.hideLoading());
          setTimeout(() => {
            alert(error);
          }, 1000);
        });
    } catch (error) {
      dispatch(app.hideLoading());
      setTimeout(() => {
        alert(error);
      }, 1000);
    }
  }

  const handlePayment = async (amount) => {
    const data = {
      method: methodPay.method,
      amount,
      giftCardId: 0,
    }
    
    const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
    submitSelectPaymentMethod(body.params);
  }

  const backToHome = () => {
    setMethodPay(null);
    setPayAppointmentId(null);
    dispatch(appointment.setPayAppointmentId(null))
    fetchAppointmentByDate();

    const statusSendLink = dialogSuccessRef?.current?.getStatusSendLink();
    if (statusSendLink) {
      sendLinkGoogle();
    }
  }

  /**
   * Handle payment by credit card
   * Dejavoo
   */
  const handlePaymentByCredit = async () => {
    setTimeout(() => {
      popupPayProcessingRef?.current?.show();
    }, 100);

    if (paymentMachineType == PaymentTerminalType.Clover){
      //Payment by Clover
      const moneyCreditCard = Number(
        formatNumberFromCurrency(Number(groupAppointments?.dueAmount)) * 100
      ).toFixed(2);
      const port = _.get(cloverMachineInfo, 'port') ? _.get(cloverMachineInfo, 'port') : 80
      const url = `wss://${_.get(cloverMachineInfo, 'ip')}:${port}/remote_pay`
      store.dispatch(appointment.setIsProcessPaymentClover(true))

      clover.sendTransaction({
        url,
        remoteAppId: REMOTE_APP_ID,
        appName: APP_NAME,
        posSerial: POS_SERIAL,
        token: _.get(cloverMachineInfo, 'token') ? _.get(cloverMachineInfo, 'token', '') : "",
        // tipMode: isTipOnPaxMachine ? 'ON_SCREEN_BEFORE_PAYMENT' : 'NO_TIP',
        tipMode: 'ON_SCREEN_BEFORE_PAYMENT',
        amount: `${parseFloat(moneyCreditCard)}`,
        externalId: `${payAppointmentId}`
      })

    } else {
      //Payment by Dejavoo
      const parameter = {
        tenderType: "Credit",
        transType: "Sale",
        amount: Number(groupAppointments?.dueAmount).toFixed(2),
        RefId: payAppointmentId,
        invNum: `${groupAppointments?.checkoutGroupId || 0}`,
        dejavooMachineInfo,
      };
      const responses = await requestTransactionDejavoo(parameter)
      handleResponseCreditCardDejavoo(
        responses,
        true,
        groupAppointments?.dueAmount,
        parameter
      );
    }
    
  }

  const handleResponseCreditCardDejavoo = async (
    message,
    online,
    moneyUserGiveForStaff,
    parameter
  ) => {
    popupPayProcessingRef?.current?.hide();

    try {
      parseString(message, (err, result) => {
        if (err || _.get(result, 'xmp.response.0.ResultCode.0') != 0) {
          let detailMessage = _.get(result, 'xmp.response.0.RespMSG.0', "").replace(/%20/g, " ")
          detailMessage = !stringIsEmptyOrWhiteSpaces(detailMessage) ? `: ${detailMessage}` : detailMessage

          const resultTxt = `${_.get(result, 'xmp.response.0.Message.0')}${detailMessage}`
            || "Transaction failed";
          if (payAppointmentId) {
            const data = {
              status: "transaction fail",
              note: resultTxt,
            }
            setErrorMessageFromPax(resultTxt);
            const body = cancelHarmonyPayment(payAppointmentId, data)
            submitCancelHarmonyPayment(body.params);
          }
        } else {
          const SN = _.get(result, 'xmp.response.0.SN.0');
          if (!stringIsEmptyOrWhiteSpaces(SN)) {
            dispatch(hardware.setDejavooMachineSN(SN));
          }
          const messageTemp = message.replace(/\n/g, "")
          const body = submitPaymentWithCreditCard(staff?.merchantId || 0,
            messageTemp,
            payAppointmentId,
            moneyUserGiveForStaff,
            "dejavoo",
            parameter)
          submitPaymentCreditCard(body.params);
        }
      });
    } catch (error) {
    }
  }

  const donotPrintBill = async () => {
    if (connectionSignalR) {
      connectionSignalR?.stop();
    }
    setTimeout(() => {
      setConnectionSignalR(null);
    }, 300);

    dialogSuccessRef?.current?.hide()

    if (methodPay.method === "cash" || methodPay.method === "other") {
      const { portName } = getInfoFromModelNameOfPrinter(
        printerList,
        printerSelect
      );

      if (portName) {
        openCashDrawer(portName);
      } else {
        setTimeout(() => {
          alert("Please connect to your cash drawer.");
        }, 700);
      }
    }

    backToHome();

  };

  const openCashDrawer = async () => {
    const { portName } = getInfoFromModelNameOfPrinter(
      printerList,
      printerSelect
    );

    if (portName) {
      await PrintManager.getInstance().openCashDrawer(portName);
    } else {
      setTimeout(() => {
        alert("Please connect to your cash drawer.");
      }, 700);
    }
  };

  const showInvoicePrint = async (isTemptPrint = true) => {
    // -------- Pass data to Invoice --------
    dialogSuccessRef?.current?.hide();

    setTimeout(() => {
      invoiceRef.current?.showAppopintmentReceipt({
        appointmentId: groupAppointments?.mainAppointmentId,
        checkoutId: paymentDetail?.checkoutId,
        isPrintTempt: isTemptPrint,
        machineType: paymentMachineType,
      });
    }, 300);

  };

  const printBill = async () => {
    const { portName } = getInfoFromModelNameOfPrinter(
      printerList,
      printerSelect
    );

    if (connectionSignalR) {
      connectionSignalR?.stop();
    }
    setTimeout(() => {
      setConnectionSignalR(null);
    }, 300);

    if (paymentMachineType !== PaymentTerminalType.Clover && !portName) {
      backToHome();

      setTimeout(() => {
        alert("Please connect to your cash drawer .");
      }, 700);
    } else {
      if (methodPay.method == "cash"
        || methodPay.method == "other") {
        //Will open when integrate clover
        // if (paymentMachineType === "Clover") {
        //   openCashDrawerClover();
        // } else {
        openCashDrawer(portName);
      }
      showInvoicePrint(false);
    }

  };

  return {
    appointmentDetail,
    methodPay,
    dialogSuccessRef,
    popupPaymentDetailRef,
    popupErrorMessageRef,
    invoiceRef,
    popupConfirmDuplicateRef,
    errorMessageFromPax,
    dialogActiveGiftCard,
    popupChangeRef,
    isCancelHarmony,
    paymentDetail,
    popupPayProcessingRef,

    onChangeMethodPay: (item) => {
      setMethodPay(item);
      if (item?.method == "giftcard") {
        dialogActiveGiftCard?.current?.show();
      }
    },

    back: () => {
      // NavigationService.back();
    },

    cancelHarmonyPay: async () => {
      const data = {
        status: null,
        note: null,
      }
      const body = await cancelHarmonyPayment(payAppointmentId, data);
      submitCancelHarmonyPayment(body.params);
    },

    onSubmitPayment: async () => {
      if (methodPay.method == "credit_card") {
        handlePayment()
      } else if (methodPay.method == "harmony") {
        setupSignalR();
      } else {
        NavigationService.navigate(screenNames.EnterAmountPage, { handlePayment });
      }
    },

    onPayGiftCard: async (amount, giftCardId) => {
      const data = {
        method: "giftcard",
        amount,
        giftCardId,
      }
      const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);
      submitSelectPaymentMethod(body.params);
      setTimeout(() => {
        dialogActiveGiftCard?.current?.hide();
      }, 200);
    },
    printBill,
    donotPrintBill,
    merchant: merchantDetail,
    groupAppointments,
    cancelInvoicePrint: () => {
      fetchAppointmentByDate();
    },

    onOK: () => {
      fetchAppointmentByDate();
    },
    confirmPaymentClover: () => {
      clover.confirmPayment();
      popupConfirmDuplicateRef?.current?.hide();
      setTimeout(() => {
        popupPayProcessingRef?.current?.show();
      }, 200);

    },
    rejectPaymentClover: () => {
      clover.rejectPayment()
      popupConfirmDuplicateRef?.current?.hide();
    },

  }
};
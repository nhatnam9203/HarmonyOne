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
} from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { 
  dateToFormat, 
  guid,
 } from "@shared/utils";
import {
  requestTransactionDejavoo,
  stringIsEmptyOrWhiteSpaces,
} from "@utils";
import { bookAppointment, 
  appointment, 
  app, 
  hardware,
 } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { Alert } from 'react-native';
import { isEmpty, method } from "lodash";
import { parseString } from 'react-native-xml2js';
import _ from 'lodash';
import Configs from '@src/config';
const signalR = require("@microsoft/signalr");


export const useProps = (props) => {
  const dispatch = useDispatch();


  /************************************* REF *************************************/
  const dialogSuccessRef = React.useRef();
  const dialogActiveGiftCard = React.useRef();
  const popupPaymentDetailRef = React.useRef();
  const popupChangeRef = React.useRef();
  const popupProcessingRef = React.useRef();
  const popupErrorMessageRef = React.useRef();
  const popupPayCompletedRef = React.useRef();

  /************************************* SELECTOR *************************************/
  const {
    appointment: { appointmentDetail, 
                  groupAppointments = [], 
                  appointmentDate, 
                  startProcessingPax },
    auth: { staff },
    hardware: { dejavooMachineInfo },
  } = useSelector(state => state);

  /************************************* STATE *************************************/
  const [methodPay, setMethodPay] = React.useState(null);
  const [payAppointmentId, setPayAppointmentId] = React.useState(null);
  const [isCancelHarmony, changeStatusCancelHarmony] = React.useState(false);
  const [connectionSignalR, setConnectionSignalR] = React.useState(null);
  const [paymentDetail, setPaymentDetail] = React.useState(null);
  const [errorMessageFromPax, setErrorMessageFromPax] = React.useState("");


 /************************************* useEffect *************************************/
 React.useEffect(() => {
    if (payAppointmentId && methodPay.method === "credit_card") {
        handlePaymentByCredit();
    }
  }, [payAppointmentId]);

  /************************************* GỌI API SELECT METHOD PAY *************************************/
  const [, submitSelectPaymentMethod] = useAxiosMutation({
    ...selectPaymentMethod(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        if (methodPay.method == "harmony" 
          || methodPay.method == "credit_card") {
          setPayAppointmentId(data);
        }
 
        if (methodPay.method !== "harmony") {
          const body = await checkoutSubmit(response.data);
          applyCheckoutSubmit(body.params);
        }
      }
    }
  });

  /************************************* GỌI API CHECKOUT SUBMIT *************************************/
  const [, applyCheckoutSubmit] = useAxiosMutation({
    ...checkoutSubmit(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        const dueAmount = parseFloat(
          response?.data?.checkoutPaymentResponse?.dueAmount || 0
        );
        if (dueAmount == 0) {
          dialogSuccessRef?.current?.show();
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
    queryId : "refetchGroupAppointment",
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setGroupAppointment(data));
      }
    }
  });


  /************************************* FETCH APPOINTMENT BY DATE *************************************/
 
  const [{  }, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, 'YYYY-MM-DD')),
    queryId : "fetchByDate_checkoutPage",
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
        setMethodPay(null);
        setPayAppointmentId(null);
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
    onSuccess: async (data, response) => {
      setMethodPay(null);
      setPayAppointmentId(null);
      changeStatusCancelHarmony(false);
      console.log('dialogSuccessRef', dialogSuccessRef)
      dialogSuccessRef?.current?.show();
    }
  });

  /************************************* HANDLE HARMONY PAYMENT SUCCESS *************************************/
  const handleHarmonyPayment = (checkoutPayment) => {
    setMethodPay(null);
    setPayAppointmentId(null);
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

  /**
   * Handle payment by credit card
   * Dejavoo
   */
  const handlePaymentByCredit = async() => {
    popupProcessingRef?.current?.show();
       
    //Payment by Dejavoo
    const parameter = {
      tenderType: "Credit",
      transType: "Sale",
      amount: Number(groupAppointments?.dueAmount).toFixed(2),
      RefId: payAppointmentId,
      invNum: `${groupAppointments?.checkoutGroupId || 0}`,
      dejavooMachineInfo,
    };
    console.log(parameter)
    const responses = await requestTransactionDejavoo(parameter)
    console.log(responses)
    handleResponseCreditCardDejavoo(
      responses,
      true,
      groupAppointments?.dueAmount,
      parameter
    );
  }

  const handleResponseCreditCardDejavoo = async (
    message,
    online,
    moneyUserGiveForStaff,
    parameter
  ) =>  {
    popupProcessingRef?.current?.hide();
    console.log('start handleResponseCreditCardDejavoo')
    try {
      parseString(message, (err, result) => {
        console.log('handleResponseCreditCardDejavoo', err, result)
        if (err || _.get(result, 'xmp.response.0.ResultCode.0') != 0) {
          let detailMessage = _.get(result, 'xmp.response.0.RespMSG.0', "").replace(/%20/g, " ")
          detailMessage = !stringIsEmptyOrWhiteSpaces(detailMessage) ? `: ${detailMessage}` : detailMessage
          
          const resultTxt = `${_.get(result, 'xmp.response.0.Message.0')}${detailMessage}`
                            || "Transaction failed";
          console.log('handleResponseCreditCardDejavoo fale', payAppointmentId)
          if (payAppointmentId) {
            const data = {
              status: "transaction fail",
              note: resultTxt,
            }
            const body = cancelHarmonyPayment(payAppointmentId, data)
            console.log('cancel', body)
            submitCancelHarmonyPayment(body.params);
          }
          setTimeout(() => {
            setErrorMessageFromPax(resultTxt);
            popupErrorMessageRef?.current?.show();
          }, 300);
        } else {
          console.log('handleResponseCreditCardDejavoo success', payAppointmentId)
          const SN = _.get(result, 'xmp.response.0.SN.0');
          if(!stringIsEmptyOrWhiteSpaces(SN)){
            dispatch(hardware.setDejavooMachineSN(SN));
          }
          const messageTemp = message.replace(/\n/g, "")
          const body = submitPaymentWithCreditCard(staff?.merchantId || 0,
                                                    messageTemp,
                                                    payAppointmentId,
                                                    moneyUserGiveForStaff,
                                                    "dejavoo",
                                                    parameter)
          console.log('submitPaymentWithCreditCard', body.params)
          submitPaymentCreditCard(body.params);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  
  return {
    appointmentDetail,
    methodPay,
    dialogSuccessRef,
    popupPaymentDetailRef,
    popupProcessingRef,
    popupErrorMessageRef,
    popupPayCompletedRef,
    errorMessageFromPax,
    dialogActiveGiftCard,
    popupChangeRef,
    isCancelHarmony,
    paymentDetail,

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
        //hard code
        // handlePayment()
        popupPayCompletedRef?.current?.show();
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

    onOK: () => {
      fetchAppointmentByDate();
    },
    onCancelTransactionCredit: () => {
      alert("Please wait!")
    },
  }
};
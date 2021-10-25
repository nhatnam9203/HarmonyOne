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
  getGroupAppointmentById
} from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { dateToFormat, guid } from "@shared/utils";
import { bookAppointment, appointment, app } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { Alert } from 'react-native';
import { isEmpty, method } from "lodash";
import Configs from '@src/config';
const signalR = require("@microsoft/signalr");


export const useProps = (props) => {
  const dispatch = useDispatch();


  /************************************* REF *************************************/
  const dialogSuccessRef = React.useRef();
  const dialogActiveGiftCard = React.useRef();
  const popupPaymentDetailRef = React.useRef();
  const popupChangeRef = React.useRef();


  /************************************* SELECTOR *************************************/
  const {
    appointment: { appointmentDetail, groupAppointments = [], appointmentDate },
    auth: { staff }
  } = useSelector(state => state);


  /************************************* STATE *************************************/
  const [methodPay, setMethodPay] = React.useState(null);
  const [payAppointmentId, setPayAppointmentId] = React.useState(null);
  const [isCancelHarmony, changeStatusCancelHarmony] = React.useState(false);
  const [connectionSignalR, setConnectionSignalR] = React.useState(null);
  const [paymentDetail, setPaymentDetail] = React.useState(null);


  /************************************* GỌI API SELECT METHOD PAY *************************************/
  const [, submitSelectPaymentMethod] = useAxiosMutation({
    ...selectPaymentMethod(),
    isStopLoading: true,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        if (methodPay.method == "harmony") {
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
  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId : "fetchAppointmentByDate_checkOut",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
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
  
  return {
    appointmentDetail,
    methodPay,
    dialogSuccessRef,
    popupPaymentDetailRef,
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
        Alert.alert("pay bằng credit card")
      } else if (methodPay.method == "harmony") {
        setupSignalR();
        return;
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
      NavigationService.navigate(screenNames.AppointmentScreen);
      dispatch(bookAppointment.resetBooking());
    }
  }
};
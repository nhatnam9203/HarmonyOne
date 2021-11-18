import React from "react";
import { Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useAxiosMutation,
  useAxiosQuery,
  changeStatustransaction,
  getAppointmentByDate,
  getInvoiceDetail,
} from '@src/apis';
import { dateToFormat } from "@shared/utils";

import { appointment, invoice } from "@redux/slices";
import NavigationService from '@navigation/NavigationService'
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";


export const useProps = (props) => {
  const dispatch = useDispatch();

  const viewShotRef = React.useRef();

  const {
    invoice: { invoiceDetail },
    appointment: { appointmentDate }
  } = useSelector(state => state);

  const [, submitChangeStatusTransaction] = useAxiosMutation({
    ...changeStatustransaction(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(invoice.updateStatusInvoiceSuccess(invoiceDetail));
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

  const handleVoidRefundCreditCard = () => {

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

    voidRefundInvoice: async () => {
      // if (invoiceDetail?.paymentMethod !== "credit_card") {
      //   const data = {
      //     responseData: {},
      //     paymentTerminal: null,
      //     sn: null,
      //   };
      //   const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
      //   submitChangeStatusTransaction(body.params);
      // } else {
      //   handleVoidRefundCreditCard();
      // }

      const data = {
        responseData: {},
        paymentTerminal: null,
        sn: null,
      };
      const body = await changeStatustransaction(invoiceDetail?.checkoutId, data);
      submitChangeStatusTransaction(body.params);
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
      Alert.alert('tich máy Dejavoo');
    }
  }
};

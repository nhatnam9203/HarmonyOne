import React from 'react';
import { colors } from '@shared/themes';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import {
  updateAppointmentStatusRequest,
  updateAppointment,
  getAppointmentByDate,
  useAxiosMutation,
  useAxiosQuery,
  getAppointmentById,
  getPromotionAppointment,
  updatePaidAppointment,
} from "@src/apis";

import { APPOINTMENT_STATUS, 
        getColorForStatus, 
        dateToFormat,
        formatNumberFromCurrency,
        formatMoney,
      } from '@shared/utils';
import { appointment, editAppointment, invoice, app } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { axios } from '@shared/services/axiosClient';
import _ from "lodash";
import { parseString } from 'react-native-xml2js';
import {
  requestEditTipDejavoo,
  handleResponseDejavoo,
} from "@utils";
import { translate } from '@localize';

export const useProps = ({
  route
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const {
    appointment: { appointmentDetail, appointmentDate },
    invoice: { invoiceViewAppointmentDetail },
    auth: { staff },
    staff: { staffsByDate = [] },
    editAppointment: { appointmentEdit },
    hardware: { dejavooMachineInfo },
  } = useSelector(state => state);

  const item = appointmentEdit;

  const [appointmentItem, setAppointmentItem] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(0);
  const [headerColor, setHeaderColor] = React.useState({
    headerColor: colors.white,
    headTintColor: colors.black,
  });

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const getInvoiceDetail = async (checkoutId) => {
    dispatch(app.showLoading());
    const params = {
      url: `checkout/${checkoutId}`,
      method: 'GET',
    }

    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(invoice.setInvoiceDetail(response?.data?.data));
        NavigationService.navigate(screenNames.InvoiceDetailScreen, { isAppointmentDetail: true, appointmentItem });
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  const [{ }, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    enabled: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });


  const [, submitUpdatePaidAppointment] = useAxiosMutation({
    ...updatePaidAppointment(),
    isLoadingDefault: true,
    isStopLoading: true,
    onSuccess: (data, response) => {
      console.log('response', response)
      if (response?.codeNumber == 200) {
        fetchAppointmentByDate();
        fetchAppointmentById();
      }
    },
  });

  /************************************** GET APPOINTMENT WAITING LIST ***************************************/



  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(item?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
      }
    },
  });

  React.useEffect(() => {
    if (item) {
      setAppointmentItem(item);

      const tempColor = getColorForStatus(item?.status);
      setHeaderColor({
        headerColor: tempColor,
        headerTintColor: colors.white,
      });
    }
  }, [item]);

  const handleUpdatePaidAppointment = async (responses) => {
    const data = {
      staffId: appointmentItem.staffId,
      services: appointmentEdit.services.filter(sv => sv?.bookingServiceId),
      extras: appointmentEdit.extras.filter(sv => sv?.bookingExtraId),
      products: appointmentEdit.products.filter(sv => sv?.bookingProductId),
      giftCards: appointmentEdit.giftCards.filter(sv => sv?.bookingGiftCardId),
      responses,
    };
    
    const body = await updatePaidAppointment(appointmentItem.appointmentId, data);
    submitUpdatePaidAppointment(body.params);
  }

  return {
    appointmentItem,
    headerColor,
    invoiceViewAppointmentDetail,
    item,
    roleName,
    staffsByDate,
    getInvoiceDetail,
    updateAppointment: () => {
      if (invoiceViewAppointmentDetail?.paymentMethod == 'credit_card') {
        const paymentInformation = _.get(invoiceViewAppointmentDetail, 'paymentInformation.0');
        const paymentData = paymentInformation?.paymentData;
        parseString(paymentInformation?.responseData, (err, result) => {
          if (err) {
            setTimeout(() => {
              alert(err)
            }, 300)
          } else {
            const refId = _.get(result, "xmp.response.0.RefId.0");
            const invNum = _.get(result, "xmp.response.0.InvNum.0");
            const last4 = _.get(paymentData, 'card_number');
            const extraData = _.get(result, "xmp.response.0.ExtData.0").split(",");
            let amount = 0;
            let tipOnDejavoo = 0;
            if (extraData) {
              const findIndex = _.findIndex(extraData, item => {
                return item.includes("Amount")
              })
              amount = findIndex > -1 ? extraData[findIndex].replace("Amount=", "") : 0;

              const findIndexTip = _.findIndex(extraData, item => {
                return item.includes("Tip")
              })
              tipOnDejavoo = findIndexTip > -1 ? extraData[findIndexTip].replace("Tip=", "") : 0;
            }
            let tipSum = 0;
            if (appointmentEdit?.services) {
              tipSum = _.sumBy(appointmentEdit?.services, item =>{
                return parseFloat(item?.tipAmount)
              });
              tipSum = tipSum;
            }
            if (tipSum.toFixed(2) != invoiceViewAppointmentDetail?.tipAmount) {
              if (tipOnDejavoo != invoiceViewAppointmentDetail?.tipAmount
                 && invoiceViewAppointmentDetail?.responses.length == 0) {
                  dispatch(
                    app.setError({
                      isError: true,
                      messageError: translate('Can not change tip'),
                      errorType: "error",
                      titleError: translate('Alert'),
                    }));
                // alert("Can not change tip for appointment that have added tip on POS app before.")
              } else {
                const params = {
                  amount,
                  refId,
                  invNum,
                  tip: tipSum.toFixed(2),
                  last4,
                  dejavooMachineInfo,
                }
                requestEditTipDejavoo(params).then(async (responses) => {
                  handleResponseDejavoo(responses).then(result => {
                    handleUpdatePaidAppointment(responses);
                  },
                  error => {
                      dispatch(
                      app.setError({
                        isError: true,
                        messageError: translate('Have Error'),
                        errorType: "error",
                        titleError: "Alert",
                      }));
                  })
                });
              }
            } else {
              handleUpdatePaidAppointment(null)
            }
          }
        });
       
      } else {
        handleUpdatePaidAppointment(null);
      }
    },
    getBarStyle: () => {
      return "dark-content";
    }

  };
};

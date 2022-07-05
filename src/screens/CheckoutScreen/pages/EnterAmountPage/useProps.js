import React from 'react';
import { useAxiosQuery, useAxiosMutation, getAppointmentById } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, bookAppointment, appointment } from "@redux/slices";
import { useForm, useWatch } from "react-hook-form";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";
import * as yup from "yup";

export const enterAmountSchema = yup.object().shape({
  amount: yup.string().required("required").test('len', translate('Please enter amount'), val => formatNumberFromCurrency(val) > 0),
});

const amountList = ["10", "20", "50", "100", "500"];

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2).toString();
}

export const useProps = (props) => {
  const dispatch = useDispatch();

  const form = useForm({ resolver: yupResolver(enterAmountSchema) });
  const { errors } = form.formState;

  const {
    appointment: { appointmentDetail, groupAppointments }
  } = useSelector(state => state);

  const [amount, setAmountSelected] = React.useState("");
  const [isTurnOff, setTurnOffButton] = React.useState(false);

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentDetail?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.CheckoutScreen);
      }
    },
  });

  const moneyGiveForStaff = useWatch({
    control: form.control,
    name: 'amount'
  });

  React.useEffect(() => {
    let tempNumber = formatNumberFromCurrency(moneyGiveForStaff);
    if (parseInt(tempNumber).toString().includes(amountList)) {

    } else {
      setAmountSelected(parseInt(tempNumber));
    }
  }, [moneyGiveForStaff]);

  React.useEffect(() => {
    setAmountSelected(appointmentDetail?.total);
  }, []);



  return {
    form,
    errors,
    amount,
    formatNumberFromCurrency,
    appointmentDetail,
    groupAppointments,
    moneyGiveForStaff,
    isTurnOff,
    back: () => {
      NavigationService.back();
    },

    onSubmit: async (values) => {
      if (values.amount) {
        setTurnOffButton(true);
        props?.route?.params?.handlePayment(values?.amount);
        NavigationService.navigate(screenNames.PaymentPage);
        setTimeout(() => {
          setTurnOffButton(false);
        }, 1000);
      }
    },

    setAmount: (percent) => {
      setAmountSelected(percent);
      form.setValue("amount", parseFloat(percent).toFixed(2))
    },

    exact: () => {
      form.setValue("amount", groupAppointments?.dueAmount);
      setAmountSelected("");
    },

    onPressAmount: (amountPressed) => {
      setAmountSelected(amountPressed);
      const amountGiveForStaff = moneyGiveForStaff ? moneyGiveForStaff : 0;
      const total = formatNumberFromCurrency(amountPressed) + formatNumberFromCurrency(amountGiveForStaff);
      form.setValue("amount", formatMoney(total));
    }
  }
};
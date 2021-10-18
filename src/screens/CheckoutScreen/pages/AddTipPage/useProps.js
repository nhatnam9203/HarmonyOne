import React from 'react';
import { useAxiosQuery, getListCustomer } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, bookAppointment } from "@redux/slices";
import { useForm, useWatch } from "react-hook-form";
import { formatNumberFromCurrency } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2).toString();
}

export const useProps = (props) => {

  const form = useForm();

  const {
    appointment: { appointmentDetail }
  } = useSelector(state => state);

  const [percentSelected, setPercentSelected] = React.useState("");


  const valueTip = useWatch({
    control: form.control,
    name: 'tip'
  });

  React.useEffect(() => {
    if (
      valueTip !== percentage(15, formatNumberFromCurrency(appointmentDetail?.subTotal)) &&
      valueTip !== percentage(18, formatNumberFromCurrency(appointmentDetail?.subTotal)) &&
      valueTip !== percentage(20, formatNumberFromCurrency(appointmentDetail?.subTotal)) &&
      valueTip !== percentage(25, formatNumberFromCurrency(appointmentDetail?.subTotal)) &&
      valueTip !== percentage(50, formatNumberFromCurrency(appointmentDetail?.subTotal))
    ) {
      setPercentSelected("")
    }
  }, [valueTip]);

  return {

    form,
    percentSelected,

    back: () => {
      NavigationService.back();
    },

    onSubmit: () => {

    },

    selectPercent: (percent) => {
      setPercentSelected(percent);
      form.setValue("tip", percentage(parseInt(percent), formatNumberFromCurrency(appointmentDetail?.subTotal)))
    }
  }
};
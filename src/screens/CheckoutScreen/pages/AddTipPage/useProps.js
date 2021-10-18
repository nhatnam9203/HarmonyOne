import React from 'react';
import { useAxiosQuery, getListCustomer, changeStylist, useAxiosMutation, getAppointmentById } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, bookAppointment, appointment } from "@redux/slices";
import { useForm, useWatch } from "react-hook-form";
import { formatNumberFromCurrency } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2).toString();
}

export const useProps = (props) => {
  const dispatch = useDispatch();

  const form = useForm();

  const {
    appointment: { appointmentDetail }
  } = useSelector(state => state);

  const [percentSelected, setPercentSelected] = React.useState("");
  const [isMouted, setMouted] = React.useState(false)

  const [, submitChangeStylist] = useAxiosMutation({
    ...changeStylist(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentById();
      }
    }
  });

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
      if (isMouted) {
        setPercentSelected("")
      }
    }
  }, [valueTip]);

  React.useEffect(() => {
    setPercentSelected(parseInt(appointmentDetail?.tipPercent));
    form.setValue("tip", appointmentDetail?.tipAmount || "00");
    setTimeout(() => {
      setMouted(true);
    }, 300);
  }, []);



  return {

    form,
    percentSelected,

    back: () => {
      NavigationService.back();
    },

    onSubmit: async (values) => {
      const { tip } = values;
      const data = {
        staffId: 0,
        bookingServiceId: 0,
        tipAmount: tip,
        price: 0,
        tipPercent: percentSelected ? percentSelected : 0,
        note: "",
        extras: null,
      }
      const body = await changeStylist(appointmentDetail?.appointmentId, data);
      submitChangeStylist(body.params);
    },

    selectPercent: (percent) => {
      setPercentSelected(percent);
      form.setValue("tip", percentage(parseInt(percent), formatNumberFromCurrency(appointmentDetail?.subTotal)))
    }
  }
};
import React from 'react';
import { useAxiosQuery, useAxiosMutation, getAppointmentById } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, bookAppointment, appointment } from "@redux/slices";
import { useForm, useWatch } from "react-hook-form";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationService from '@navigation/NavigationService';
import * as yup from "yup";

export const enterAmountSchema = yup.object().shape({
  amount: yup.string().required("required").test('len', 'Please enter amount', val => formatNumberFromCurrency(val) > 0),
});

const amountList = ["10", "20", "50", "100", "500"];

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2).toString();
}

export const useProps = (props) => {
  const giftCardInfo = props?.route?.params?.giftCardInfo;
  const dispatch = useDispatch();

  const form = useForm({ resolver: yupResolver(enterAmountSchema) });
  const { errors } = form.formState;

  const {
    bookAppointment: { giftCards = [] }
  } = useSelector(state => state);

  const [amount, setAmountSelected] = React.useState("");
  const [rawAmount, setRawAmount] = React.useState("0.00");

  const moneyGiveForStaff = useWatch({
    control: form.control,
    name: 'amount'
  });

  React.useEffect(() => {
    if(giftCardInfo?.isActive == 0){
      form.setValue("amount", giftCardInfo?.amount);
    }
  }, [giftCardInfo]);

  return {

    form,
    errors,
    amount,
    rawAmount,
    formatNumberFromCurrency,
    giftCardInfo,

    back: () => {
      NavigationService.back();
    },

    onSubmit: async (values) => {
      if (values.amount) {
        let tempGiftCards = [...giftCards];
        const index = tempGiftCards.findIndex(obj => obj?.giftCardId == giftCardInfo?.giftCardId);
        if (index !== -1) {
          tempGiftCards[index].price = values.amount;
        } else {
          const giftCardAdded = {
            ...giftCardInfo,
            price: values.amount,
          };
          tempGiftCards.push(giftCardAdded);
        }
        dispatch(bookAppointment.setGiftCardsBooking(tempGiftCards));
        NavigationService.navigate(screenNames.ReviewConfirm);
      }
    },

    setAmount: (percent) => {
      setAmountSelected(percent);
      form.setValue("amount", parseFloat(percent).toFixed(2))
    },

    onPressAmount: (amountPressed) => {
      setAmountSelected(amountPressed);
      const amountGiveForStaff = moneyGiveForStaff ? moneyGiveForStaff : 0;
      const total = formatNumberFromCurrency(amountPressed) + formatNumberFromCurrency(amountGiveForStaff);
      form.setValue("amount", formatMoney(total));
    },

    exact: () => {
      form.setValue("amount", giftCardInfo?.amount);
      setAmountSelected("");
    },

  }
};
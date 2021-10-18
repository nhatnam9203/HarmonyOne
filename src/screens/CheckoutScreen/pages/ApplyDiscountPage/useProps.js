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

  const discountTypeRef = React.useRef();


  const [moneyDiscountCustom, setMoneyDiscountCustom] = React.useState(0);
  const [moneyDiscountFixedAmout, setMoneyDiscountFixedAmout] = React.useState(0);
  const [promotionNotes, setPromotionNotes] = React.useState("");
  const [discountByOwner, setDiscountByOwner] = React.useState(100);


  React.useEffect(() => {
    if (appointmentDetail?.discountByOwner) {
      setDiscountByOwner(parseFloat(appointmentDetail?.discountByOwner));
    }
  }, []);


  return {
    discountTypeRef,
    form,
    appointmentDetail,
    promotionNotes,
    discountByOwner,
    moneyDiscountCustom,
    moneyDiscountFixedAmout,


    onChangeTextCustomDiscount: (moneyDiscountByPercent, moneyDiscountFixed) => {
      setMoneyDiscountCustom(moneyDiscountByPercent);
      setMoneyDiscountFixedAmout(moneyDiscountFixed);
    },

    onApply : () =>{

    },

    back : () =>{
      NavigationService.back();
    },

  }
};
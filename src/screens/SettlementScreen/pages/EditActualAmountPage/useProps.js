import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { settlmentEditAmountSchema } from "@shared/helpers/schema";
import { useSelector, useDispatch } from "react-redux";
import {
  useAxiosMutation,
  uploadAvatarStaff,
  addProduct,
  editProduct,
  checkSkuNumber
} from '@src/apis';

import { settlement } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const form = useForm({ resolver: yupResolver(settlmentEditAmountSchema) });
  const { setValue } = form;
  const { errors } = form.formState;

  const {
    settlement: {
      settlementWaiting = {},
    }
  } = useSelector(state => state);

  React.useEffect(() => {
    form.setValue("paymentByHarmony", settlementWaiting?.paymentByHarmony || "0.00");
    form.setValue("paymentByCreditCard", settlementWaiting?.paymentByCreditCard || "0.00");
    form.setValue("paymentByCash", settlementWaiting?.paymentByCash || "0.00");
    form.setValue("paymentByGiftcard", settlementWaiting?.paymentByGiftcard || "0.00");
    form.setValue("otherPayment", settlementWaiting?.otherPayment || "0.00");
    form.setValue("discount", settlementWaiting?.discount || "0.00");
  }, []);


  return {
    form,
    errors,
    onSubmit: async (values) => {
      const { otherPayment, paymentByCash } = values;
      dispatch(settlement.editAmountSettlementWaiting({
        otherPayment, paymentByCash
      }));
      NavigationService.back();
    }
  };
};

import React from "react";
import { auth, app } from "@redux/slices";
import { useAxiosMutation, useAxiosQuery, getAdvanceSetting, editAdvanceSetting } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {
  const form = useForm({

  });

  const [loyaltyProgram, setLoyaltyProgram] = React.useState(null);
  const [IsLoyaltyProgram, setIsLoyaltyProgram] = React.useState(null);


  const dispatch = useDispatch();
  const [, requestGetAdvanceSetting] = useAxiosQuery({
    ...getAdvanceSetting(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setLoyaltyProgram(data);
        const {
          CashStarRate,
          CreditCardStarRate,
          HarmonyPayStarRate,
          IsLoyaltyProgram,
          OtherStarRate,
        } = data;

        form.setValue("CashStarRate", CashStarRate);
        form.setValue("CreditCardStarRate", CreditCardStarRate);
        form.setValue("HarmonyPayStarRate", HarmonyPayStarRate);
        form.setValue("OtherStarRate", OtherStarRate);
        setIsLoyaltyProgram(IsLoyaltyProgram);
      }
    },
  });


  const [, submitEditAdvanceSetting] = useAxiosMutation({
    ...editAdvanceSetting(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        NavigationService.back();
      }
    }
  });


  React.useEffect(() => {
    requestGetAdvanceSetting();
  }, []);


  return {

    resetValue: () => {
      const {
        CashStarRate,
        CreditCardStarRate,
        HarmonyPayStarRate,
        IsLoyaltyProgram,
        OtherStarRate,
      } = loyaltyProgram;

      form.setValue("CashStarRate", CashStarRate);
      form.setValue("CreditCardStarRate", CreditCardStarRate);
      form.setValue("HarmonyPayStarRate", HarmonyPayStarRate);
      form.setValue("OtherStarRate", OtherStarRate);
    },

    onSubmit: async (values) => {
      const {
        CashStarRate,
        CreditCardStarRate,
        HarmonyPayStarRate,
        OtherStarRate,
      } = values;

      const data = {
        CashStarRate,
        CreditCardStarRate,
        HarmonyPayStarRate,
        OtherStarRate,
        IsLoyaltyProgram
      };

      const body = await editAdvanceSetting(data);
      submitEditAdvanceSetting(body.params);
    },

    form,
    IsLoyaltyProgram,
    setIsLoyaltyProgram
  };
};

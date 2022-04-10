import React from "react";
import { auth, app } from "@redux/slices";
import { useAxiosMutation, 
  useAxiosQuery, 
  getAdvanceSetting, 
  editAdvanceSetting,
  merchantSetting,
  getMerchantById 
} from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {
  const form = useForm({

  });
  const {
    merchant: { merchantDetail = {} },
  } = useSelector(state => state);
  const [settingData, setSettingData] = React.useState(null);
  const [IsLoyaltyProgram, setIsLoyaltyProgram] = React.useState(null);

  const [IsCashDiscount, setIsCashDiscount] = React.useState(null);
  const [receiptFooter, setReceiptFooter] = React.useState("");

  const dispatch = useDispatch();
  const [, requestGetAdvanceSetting] = useAxiosQuery({
    ...getAdvanceSetting(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setSettingData(data);
        const {
          CashStarRate,
          CreditCardStarRate,
          HarmonyPayStarRate,
          IsLoyaltyProgram,
          OtherStarRate,
          IsCashDiscount,
        } = data;

        form.setValue("CashStarRate", CashStarRate);
        form.setValue("CreditCardStarRate", CreditCardStarRate);
        form.setValue("HarmonyPayStarRate", HarmonyPayStarRate);
        form.setValue("OtherStarRate", OtherStarRate);
        setIsLoyaltyProgram(IsLoyaltyProgram);
        setIsCashDiscount(IsCashDiscount);
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

  const [, submitEditMerchant] = useAxiosMutation({
    ...merchantSetting(),
    queryId: "merchantSetting_general",
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchMerchantById();
      }
    }
  });

  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staff?.merchantId),
    queryId: "fetchMerchantById_general",
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(merchant.setMerchantDetail(data));
      }
    },
  });


  React.useEffect(() => {
    requestGetAdvanceSetting();
    setReceiptFooter(merchantDetail?.receiptFooter)
  }, []);


  return {

    resetValue: () => {
      const {
        CashStarRate,
        CreditCardStarRate,
        HarmonyPayStarRate,
        IsLoyaltyProgram,
        OtherStarRate,
        IsCashDiscount,
      } = settingData;

      form.setValue("CashStarRate", CashStarRate);
      form.setValue("CreditCardStarRate", CreditCardStarRate);
      form.setValue("HarmonyPayStarRate", HarmonyPayStarRate);
      form.setValue("OtherStarRate", OtherStarRate);
      form.setValue("IsCashDiscount", IsCashDiscount);
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
        IsLoyaltyProgram,
        IsCashDiscount,
      };

      const body = await editAdvanceSetting(data);
      submitEditAdvanceSetting(body.params);

      const dataMerchant = {
        ...merchantDetail,
        receiptFooter,
      }

      const bodyMerchant = await merchantSetting(dataMerchant);
      submitMerchantSetting(bodyMerchant.params);
    },

    form,
    IsLoyaltyProgram,
    setIsLoyaltyProgram,
    setIsCashDiscount,
    IsCashDiscount,
    setReceiptFooter,
    receiptFooter,
  };
};

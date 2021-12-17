import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAxiosMutation, useAxiosQuery, merchantSetting, getMerchantById } from '@src/apis';
import { useForm } from "react-hook-form";
import { formatNumberFromCurrency } from "@shared/utils";
import { merchant, app } from "@redux/slices"
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    merchant: { merchantDetail },
    auth: { staff },
  } = useSelector(state => state);

  const form = useForm();

  const [isChange, setIsChange] = React.useState(false);

  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staff?.merchantId),
    queryId: "fetchMerchantById_setupTax",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(merchant.setMerchantDetail(data));
      NavigationService.back();
    },
  });

  const [, submitEditMerchant] = useAxiosMutation({
    ...merchantSetting(),
    isStopLoading: true,
    queryId: "merchantSetting_setupTax",
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(
          app.setError({
            isError: true,
            messageError: response?.message,
            errorType: "info",
            titleError: "Tax Settings",
          }));
        fetchMerchantById();
      }
    }
  });


  React.useEffect(() => {
    if (merchantDetail) {
      form.setValue("taxService", merchantDetail?.taxService || "0.00");
      form.setValue("taxProduct", merchantDetail?.taxProduct || "0.00");
    }
  }, []);


  return {

    form,
    merchantDetail,
    isChange,
    setIsChange,

    onSubmit: async (values) => {
      const { taxService, taxProduct } = values;

      const data = {
        taxService: formatNumberFromCurrency(taxService),
        taxProduct: formatNumberFromCurrency(taxProduct),
        webLink: merchantDetail?.webLink ? merchantDetail?.webLink : "",
        latitude: merchantDetail?.latitude ? merchantDetail?.latitude : "",
        longitude: merchantDetail?.longitude ? merchantDetail?.longitude : "",
        timezone: merchantDetail?.timezone ? merchantDetail?.timezone : "",
        autoCloseAt: merchantDetail?.autoCloseAt ? merchantDetail?.autoCloseAt : ""
      };

      const body = await merchantSetting(data);
      submitEditMerchant(body.params);
    }
  };
};

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  merchantSetting,
  useAxiosMutation,
  useAxiosQuery,
  getMerchantById
} from "@src/apis";
import { merchant } from "@redux/slices";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { basicEditSchema } from "@shared/helpers/schema";
import NavigationService from '@navigation/NavigationService';
import { Alert } from "react-native";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const form = useForm({ resolver: yupResolver(basicEditSchema) });
  const { errors } = form.formState;

  const {
    merchant: { merchantDetail = {} },
    auth: { staff }
  } = useSelector(state => state);

  const inputPhoneHeadRef = React.useRef();

  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staff?.merchantId),
    queryId: "fetchMerchantById_basicEdit",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(merchant.setMerchantDetail(data));
      NavigationService.back();
    },
  });

  const [, submitEditMerchant] = useAxiosMutation({
    ...merchantSetting(),
    queryId: "merchantSetting_basicEdit",
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchMerchantById();
      }
    }
  });


  React.useEffect(() => {
    form.setValue('businessName', merchantDetail?.businessName);
    form.setValue('email', merchantDetail?.email);
    form.setValue('webLink', merchantDetail?.webLink);
    let merchantPhone = merchantDetail?.cellPhone;
    let phone = '';
    if (merchantPhone?.toString().includes('+84')) {
      phone = merchantPhone?.toString().slice(3);
      form.setValue('phone', phone);
      inputPhoneHeadRef?.current?.changeValue({ label: '+84', value: '+84' });
    } else {
      phone = merchantPhone?.toString().slice(2);
      form.setValue('phone', phone);
      inputPhoneHeadRef?.current?.changeValue({ label: '+1', value: '+1' });
    }
  }, []);



  return {
    merchantDetail,
    inputPhoneHeadRef,
    form,
    errors,


    onSubmit: async (values) => {
      Alert.alert('đang test lại');
      return;
      const phoneHeader = inputPhoneHeadRef?.current?.getValue().value;

      const data = {
        businessHour: merchantDetail?.businessHour,
        latitude: merchantDetail?.latitude,
        longitude: merchantDetail?.longitude,
        taxService: merchantDetail?.taxService,
        taxProduct: merchantDetail?.taxProduct,
        timezone: merchantDetail?.timezone,
        autoLockscreen: merchantDetail?.autoLockscreen,
        autoCloseAt: merchantDetail?.autoCloseAt,
        autoClose: merchantDetail?.autoClose,
        turnAmount: merchantDetail?.turnAmount,
        staffColumn: merchantDetail?.staffColumn,
        signinAppStyle: merchantDetail?.signinAppStyle,
        sendReviewLinkOption: merchantDetail?.sendReviewLinkOption,
        giftForNewEnabled: merchantDetail?.giftForNewEnabled,
        receiptFooter: merchantDetail?.receiptFooter,
        zip : merchantDetail?.zip,
        address : merchantDetail?.address,
        city : merchantDetail?.city,
        stateId : merchantDetail?.stateId,
        businessName: values?.businessName,
        webLink: values?.webLink,
        email: values?.email,
        cellPhone: values?.phone ? `${phoneHeader}${values?.phone}` : "",
      };

      const body = await merchantSetting(data);
      submitEditMerchant(body.params);
    }
  };
};

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
import { locationEditSchema } from "@shared/helpers/schema";
import NavigationService from '@navigation/NavigationService';
import { Alert } from "react-native";


export const useProps = (_params) => {
  const dispatch = useDispatch();

  const form = useForm({ 
    resolver: yupResolver(locationEditSchema)
  });
  const { errors } = form.formState;

  const {
    merchant: { merchantDetail = {} },
    auth: { staff },
    customer : { stateCity = [] }
  } = useSelector(state => state);


  const inputPhoneHeadRef = React.useRef();
  const stateRef = React.useRef();

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
    form.setValue('address', merchantDetail?.address);
    form.setValue('city', merchantDetail?.city);
    form.setValue('zip', merchantDetail?.zip);
    form.setValue('latitude', merchantDetail?.latitude);
    form.setValue('longitude', merchantDetail?.longitude);
    stateRef?.current?.changeItem(merchantDetail?.stateId);
  }, []);


  return {
    merchantDetail,
    inputPhoneHeadRef,
    form,
    errors,
    stateRef,

    getState : () =>{
      return stateCity.map((obj) =>({
        label : obj?.name,
        value : obj?.stateId,
      }));
    },


    onSubmit: async (values) => {

      const data = {
        
        address : values.address,
        city : values.city,
        zip : values.zip,
        stateId : values.stateId ? values?.stateId?.value : "0",
        latitude: values?.latitude ?? "",
        longitude: values?.longitude ?? "",
        businessName: merchantDetail.businessName,
        webLink: merchantDetail.webLink,
        email: merchantDetail.email,
        cellPhone : merchantDetail?.cellPhone,
        businessHour: merchantDetail?.businessHour,
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
        receiptFooter: merchantDetail?.receiptFooter
      };

      const body = await merchantSetting(data);
      submitEditMerchant(body.params);
    }
  };
};

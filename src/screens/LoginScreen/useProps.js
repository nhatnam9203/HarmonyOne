import NavigationService from '@navigation/NavigationService';
import { merchantLogin, useAxiosMutation } from '@src/apis';
import React from 'react';
import { ScreenNames } from '../ScreenName';
import { auth } from '@redux/slices';
import { useDispatch, useSelector } from 'react-redux';

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantIdSaved = useSelector(state => state?.auth?.merchantID);

  const [merchantID, setMerchantID] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState(null);


  const [{ isLoading }, login] = useAxiosMutation({
    ...merchantLogin(merchantID),
    isLoadingDefault: false,
    onLoginError: (msg) => {
      setTextMessage(msg);
    },
    onSuccess: (data) => {
      if (data?.code) {
        dispatch(auth.loginMerchant(data?.code));
      }

      NavigationService.navigate(ScreenNames.PinScreen);
    },
  });

  React.useEffect(() => {
    setTextMessage(null);
  }, []);

  React.useEffect(() => {
    if(merchantIdSaved)
    setMerchantID(merchantIdSaved);
  }, [merchantIdSaved]);

  return {
    merchantID,
    onChangeMID: (mid) => {
      setMerchantID(mid);
    },
    isLoading: isLoading,
    whatMerchantID: () => {
      NavigationService.navigate('WhatIsMerchant');
    },
    loginMerchant: () => {
      setTextMessage(null);
      login();
    },
    textMessage,
  };
};

import NavigationService from '@navigation/NavigationService';
import { useMerchantLogin } from '@src/apis';
import React from 'react';
import { ScreenNames } from '../ScreenName';

export const useProps = (_params) => {
  const [merchantID, setMerchantID] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState(null);

  const [{ isLoading }, merchantLogin] = useMerchantLogin({
    merchantID,
    onLoginError: (msg) => {
      setTextMessage(msg);
    },
    onLoginSuccess: () => {
      console.log('Login Merchant Success');
      NavigationService.navigate(ScreenNames.PinScreen);
    },
  });

  React.useEffect(() => {
    setTextMessage(null);
  }, []);

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
      merchantLogin();
    },
    textMessage,
  };
};

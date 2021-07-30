import NavigationService from '@navigation/NavigationService';
import { useMerchantLogin } from '@src/apis';
import React from 'react';
import { ScreenName } from '@src/screens';

export const useProps = (_params) => {
  const [merchantID, setMerchantID] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState(null);

  const [{ isLoading }, merchantLogin] = useMerchantLogin({
    merchantID,
    onLoginError: (msg) => {
      setTextMessage(msg);
    },
    onLoginSuccess: () => {
      NavigationService.navigate('hpo.pin');
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

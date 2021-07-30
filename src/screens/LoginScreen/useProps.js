import NavigationService from '@navigation/NavigationService';
import { useMerchantLogin } from '@src/apis';
import React from 'react';

export const useProps = (_params) => {
  const [merchantID, setMerchantID] = React.useState(null);

  const [{ isLoading }, merchantLogin] = useMerchantLogin({
    merchantID,
  });

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
      merchantLogin();
    },
  };
};

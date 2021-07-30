import React, { Component } from 'react';
import NavigationService from '@navigation/NavigationService';
import { useMerchantLogin } from '@src/apis';

export const useProps = (_params) => {
  const [merchantID, setMerchantID] = React.useState(null);

  const [{ isLoading, data }, merchantLogin] = useMerchantLogin({
    merchantID,
  });

  return {
    merchantID,
    onChangeMID: (mid) => {
      setMerchantID(mid);
    },
    isLoading: false,
    whatMerchantID: () => {
      NavigationService.navigate('WhatIsMerchant');
    },
    loginMerchant: () => {
      merchantLogin();
    },
  };
};

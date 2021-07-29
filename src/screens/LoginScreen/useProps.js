import React, { Component } from 'react';
import NavigationService from '@navigation/NavigationService';
export const useProps = (_params) => {
  const [merchantID, setMerchantID] = React.useState(null);

  return {
    merchantID,
    onChangeMID: (mid) => {
      setMerchantID(mid);
    },
    isLoading: false,
    whatMerchantID: () => {
      NavigationService.navigate('WhatIsMerchant');
    },
  };
};

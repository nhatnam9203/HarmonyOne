import React from 'react';
import NavigationService from '@navigation/NavigationService';
import { useStaffLogin } from '@src/apis';
import { useSelector } from 'react-redux';

export const useProps = (_params) => {
  const [pinCode, setPinCode] = React.useState('');

  const merchantID = useSelector((state) => state.auth.merchantID);

  const [{ isLoading }, staffLogin] = useStaffLogin({
    merchantID,
    pinCode,
    onLoginError: (msg) => {
      // setTextMessage(msg);
    },
    onLoginSuccess: () => {
      NavigationService.replace('HpOneStack');
    },
  });

  return {
    onChangeInputCode: (val) => {
      setPinCode(val);
    },
    pinCode,
    loginStaff: () => {
      staffLogin();
    },
    isLoading: isLoading,
    forgotPinCode: () => {
      NavigationService.navigate('ForgotPincode');
    },
    useAnotherMID: () => {
      NavigationService.back();
    },
  };
};

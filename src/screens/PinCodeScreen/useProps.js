import NavigationService from '@navigation/NavigationService';
import { auth } from '@redux/slices';
import { staffLoginRequest, useAxiosMutation } from '@src/apis';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantID = useSelector((state) => state.auth.merchantID);

  const [pinCode, setPinCode] = React.useState('');

  const [{ isLoading }, staffLogin] = useAxiosMutation({
    ...staffLoginRequest(merchantID, pinCode),
    onLoginError: (msg) => {
      // setTextMessage(msg);
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(auth.loginStaff(data));
      }
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

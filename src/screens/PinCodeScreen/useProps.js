import NavigationService from '@navigation/NavigationService';
import { auth, app } from '@redux/slices';
import { staffLoginRequest, useAxiosMutation } from '@src/apis';
import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantID = useSelector((state) => state.auth.merchantID);

  const [merchantCode, setMerchantCode] = React.useState("");

  const {
    auth: { staff }
  } = useSelector(state => state);

  const [pinCode, setPinCode] = React.useState('');

  const [{ isLoading }, staffLogin] = useAxiosMutation({
    ...staffLoginRequest(merchantCode, pinCode),
    onLoginError: (msg) => {
      // setTextMessage(msg);
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(auth.loginStaff(data));
        dispatch(app.setStatusHomeScreen(true));
      }
      NavigationService.replace('HpOneStack');
    },
  });

  const initialMerchantID = async () => {
    const merchant_code = await AsyncStorage.getItem("@merchantID");
    console.log({ merchantID, merchant_code })
    if (merchantID) {
      setMerchantCode(merchantID);
    } else {
      setMerchantCode(JSON.parse(merchant_code))
    }
  }

  React.useEffect(() => {
    initialMerchantID();
  }, []);



  return {
    onChangeInputCode: (val) => {
      setPinCode(val);
    },
    pinCode,

    loginStaff: () => {
      console.log({ merchantCode })
      staffLogin();
    },

    isLoading: isLoading,
    forgotPinCode: () => {
      NavigationService.navigate('ForgotPincode');
    },
    useAnotherMID: () => {
      NavigationService.navigate(screenNames.LoginScreen);
    },
  };
};

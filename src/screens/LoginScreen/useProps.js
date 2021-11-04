import NavigationService from '@navigation/NavigationService';
import { merchantLogin, useAxiosMutation } from '@src/apis';
import React from 'react';
import { ScreenNames } from '../ScreenName';
import { auth } from '@redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { getFcmToken } from "@shared/storages/fcmToken";
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from "react-native-device-info";
import { Alert } from 'react-native';


export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantIdSaved = useSelector(state => state?.auth?.merchantID);

  const [merchantID, setMerchantID] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState(null);
  const [firebaseToken, setFcmToken] = React.useState("");


  const [{ isLoading }, login] = useAxiosMutation({
    ...merchantLogin(),
    isLoadingDefault: false,
    onLoginError: (msg) => {
      setTextMessage(msg);
    },
    onSuccess: (data) => {
      console.log({ data })
      if (data?.code) {
        dispatch(auth.loginMerchant(merchantID));
        AsyncStorage.setItem("@merchantID", JSON.stringify(merchantID));
      }

      NavigationService.navigate(ScreenNames.PinScreen);
    },
  });


  React.useEffect(() => {
    setTextMessage(null);
  }, []);

  const initialMerchantCode = async () => {
    const merchant_code = await AsyncStorage.getItem("@merchantID");
    if (merchant_code) {
      setMerchantID(JSON.parse(merchant_code));
    }
  }

  React.useState(() => {
    initialMerchantCode();
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
    loginMerchant: async () => {
      const firebaseToken = await getFcmToken();
      setTextMessage(null);
      const data = {
        email: merchantID,
        password: "72ee0157",
        firebaseToken,
        deviceId: DeviceInfo.getUniqueId(),
      };
      Alert.alert(firebaseToken)
      const body = await merchantLogin(data);
      login(body.params);
    },
    textMessage,
  };
};

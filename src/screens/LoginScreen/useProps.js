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
    ...merchantLogin(merchantID),
    isLoadingDefault: false,
    isReturnError : false,
    onLoginError: (msg) => {
      if (msg == "Cant found your item") {
        setTextMessage("Your MID does not exist.");
      } else {
        setTextMessage(msg);
      }
    },
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(auth.loginMerchant(merchantID));
        AsyncStorage.setItem("@merchantID", JSON.stringify(merchantID));
      }

      NavigationService.navigate(ScreenNames.PinScreen);
    },
  });

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken() //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken);
      setFcmToken(fcmToken)
    } else {
      console.log("Failed", "No token received");
    }
  }

  React.useState(() => {
    requestUserPermission();
  }, []);



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
      setTextMessage(null);
      const data = {
        // email: merchantID,
        // password: "1qaz@WSC",
        firebaseToken,
        deviceId: DeviceInfo.getUniqueId(),
      };
      const body = await merchantLogin(merchantID, data);
      login(body.params);
    },

    textMessage,
  };
};

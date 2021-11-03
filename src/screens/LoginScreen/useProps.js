import NavigationService from '@navigation/NavigationService';
import { merchantLogin, useAxiosMutation } from '@src/apis';
import React from 'react';
import { ScreenNames } from '../ScreenName';
import { auth } from '@redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';


export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantIdSaved = useSelector(state => state?.auth?.merchantID);

  const [merchantID, setMerchantID] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState(null);


  const [{ isLoading }, login] = useAxiosMutation({
    ...merchantLogin(merchantID),
    isLoadingDefault: false,
    onLoginError: (msg) => {
      setTextMessage(msg);
    },
    onSuccess: (data) => {
      if (data?.code) {
        dispatch(auth.loginMerchant(data?.code));
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
     console.log(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  React.useState(()=>{
    requestUserPermission();
  },[]);

  React.useEffect(() => {
    setTextMessage(null);
  }, []);

  const initialMerchantCode = async() =>{
    const merchant_code = await AsyncStorage.getItem("@merchantID");
    if(merchant_code){
      setMerchantID(JSON.parse(merchant_code));
    }
  }

  React.useState(()=>{
    initialMerchantCode();
  },[]);

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
      login();
    },
    textMessage,
  };
};

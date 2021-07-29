import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { navigationRef } from './NavigationService';
import {
  LoginMID,
  LoginPincode,
  ForgotPincode,
  ForgotPincodeSuccess,
  WhatIsMerchant,
  LoginScreen,
} from '@screens';
import { ScreenName } from '../screens/ScreenName';

const { Screen, Navigator } = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator
      headerMode="none"
      initialRouteName={ScreenName.LoginScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Screen {...LoginScreen} />
      <Screen name="LoginMID" component={LoginMID} />
      <Screen name="LoginPincode" component={LoginPincode} />
      <Screen name="ForgotPincode" component={ForgotPincode} />
      <Screen name="ForgotPincodeSuccess" component={ForgotPincodeSuccess} />
      <Screen name="WhatIsMerchant" component={WhatIsMerchant} />
    </Navigator>
  );
};

export default AuthStack;

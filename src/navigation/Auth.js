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
} from '@screens';

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Auth.Screen name="LoginMID" component={LoginMID} />
      <Auth.Screen name="LoginPincode" component={LoginPincode} />
      <Auth.Screen name="ForgotPincode" component={ForgotPincode} />
      <Auth.Screen
        name="ForgotPincodeSuccess"
        component={ForgotPincodeSuccess}
      />
      <Auth.Screen name="WhatIsMerchant" component={WhatIsMerchant} />
    </Auth.Navigator>
  );
};

export default AuthStack;

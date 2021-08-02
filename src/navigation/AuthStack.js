import { createStackNavigator } from '@react-navigation/stack';
import {
  ForgotPincode,
  ForgotPincodeSuccess,
  LoginScreen,
  PinCodeScreen,
  ScreenNames,
  WhatIsMerchant,
} from '@screens';
import * as React from 'react';

const { Screen, Navigator } = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator
      headerMode="none"
      initialRouteName={ScreenNames.LoginScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Screen {...LoginScreen} />
      <Screen {...PinCodeScreen} />

      {/* <Screen name="LoginMID" component={LoginMID} /> */}
      {/* <Screen name="LoginPincode" component={LoginPincode} /> */}

      <Screen name="ForgotPincode" component={ForgotPincode} />
      <Screen name="ForgotPincodeSuccess" component={ForgotPincodeSuccess} />
      <Screen name="WhatIsMerchant" component={WhatIsMerchant} />
    </Navigator>
  );
};

export default AuthStack;

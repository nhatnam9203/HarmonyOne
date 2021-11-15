import { createStackNavigator } from '@react-navigation/stack';
import {
  ForgotPincode,
  ForgotPincodeSuccess,
  LoginScreen,
  PinCodeScreen,
  ScreenNames,
  WhatIsMerchant,
} from '@screens';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as React from 'react';

const { Screen, Navigator } = createStackNavigator();

const AuthStack = (props) => {

    return (
      <Navigator
        headerMode="none"
        initialRouteName={ScreenNames.LoginScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Screen {...LoginScreen} />
        <Screen {...PinCodeScreen} />

        <Screen name="ForgotPincode" component={ForgotPincode} />
        <Screen name="ForgotPincodeSuccess" component={ForgotPincodeSuccess} />
        <Screen name="WhatIsMerchant" component={WhatIsMerchant} />
      </Navigator>
    );
};

export default AuthStack;

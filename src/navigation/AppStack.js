import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  ChangePincode,
  ForgotPincode,
  FeedBack,
  AppointmentDetailScreen,
  AppointmentNewScreen,
  CustomerNewScreen,
  CustomerDetailScreen,
  CustomersScreen,
  ServiceScreen,
  ServiceNewScreen,
  CategoryNewScreen,
  EditProfileScreen,
  SettingScreen,
  NotificationScreen,
  ReviewScreen,
  MarketingScreen,
  MarketingNewScreen,
  ExtraScreen,
  ExtraNewScreen,
  ProductScreen,
  ProductNewScreen,
} from '@screens';
import { HPOBottomTabStack } from './HPOBottomTabStack';
import { useSelector } from "react-redux";

const { Screen, Navigator } = createStackNavigator();

const AppStack = () => {

  const { staff } = useSelector(state => state.auth);

  if(staff){
    return (
      <Navigator
        headerMode="none"
        screenOptions={{
          headerShown: false,
  
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="HpOneHomeStack">
        <Screen name="HpOneHomeStack" component={HPOBottomTabStack} />
        <Screen {...AppointmentDetailScreen} />
        <Screen {...AppointmentNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...CustomerNewScreen} />
        <Screen {...CustomerDetailScreen} />
        <Screen {...CustomersScreen} />
        <Screen {...ServiceScreen} />
        <Screen {...CategoryNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        /> 
        <Screen {...ServiceNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...EditProfileScreen} />
        <Screen {...SettingScreen} />
        <Screen {...NotificationScreen} />
        <Screen {...ReviewScreen} />
        <Screen {...MarketingScreen} />
        <Screen {...MarketingNewScreen} />
        <Screen {...ExtraScreen} />
        <Screen {...ExtraNewScreen} />
        <Screen {...ProductScreen} />
        <Screen {...ProductNewScreen} />

  
        <Screen name="ChangePincode" component={ChangePincode} />
        <Screen name="ForgotPincode" component={ForgotPincode} />
        <Screen name="FeedBack" component={FeedBack} />
      </Navigator>
    );
  }
  return null;
};

export default AppStack;

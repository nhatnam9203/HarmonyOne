import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  Notification,
  EditAppointment,
  EditService,
  Checkout,
  SelectPayment,
  EditProfile,
  ChangePincode,
  ForgotPincode,
  FeedBack,
  Reviews,
  AppointmentDetailScreen,
  AppointmentNewScreen,
  CustomerNewScreen,
  ServiceScreen,
  ServiceNewScreen,
  CategoryNewScreen,
} from '@screens';
import BottomMain from './BottomMain';
import { HPOBottomTabStack } from './HPOBottomTabStack';

const { Screen, Navigator } = createStackNavigator();

const AppStack = () => {
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

      <Screen name="Notification" component={Notification} />
      <Screen name="EditAppointment" component={EditAppointment} />
      <Screen name="EditService" component={EditService} />
      <Screen name="Checkout" component={Checkout} />
      <Screen name="SelectPayment" component={SelectPayment} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="ChangePincode" component={ChangePincode} />
      <Screen name="ForgotPincode" component={ForgotPincode} />
      <Screen name="FeedBack" component={FeedBack} />
      <Screen name="Reviews" component={Reviews} />
    </Navigator>
  );
};

export default AppStack;

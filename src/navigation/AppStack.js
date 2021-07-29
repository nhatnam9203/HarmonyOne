import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  Notification,
  AppointmentDetail,
  EditAppointment,
  EditService,
  AddService,
  Checkout,
  SelectPayment,
  EditProfile,
  ChangePincode,
  ForgotPincode,
  FeedBack,
  Services,
  NewCategory,
  NewService,
  Reviews,
} from '@screens';
import BottomMain from './BottomMain';

const App = createStackNavigator();

const AppStack = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="BottomMain">
      <App.Screen name="BottomMain" component={BottomMain} />
      <App.Screen name="Notification" component={Notification} />
      <App.Screen name="AppointmentDetail" component={AppointmentDetail} />
      <App.Screen name="EditAppointment" component={EditAppointment} />
      <App.Screen name="EditService" component={EditService} />
      <App.Screen name="AddService" component={AddService} />
      <App.Screen name="Checkout" component={Checkout} />
      <App.Screen name="SelectPayment" component={SelectPayment} />
      <App.Screen name="EditProfile" component={EditProfile} />
      <App.Screen name="ChangePincode" component={ChangePincode} />
      <App.Screen name="ForgotPincode" component={ForgotPincode} />
      <App.Screen name="FeedBack" component={FeedBack} />
      <App.Screen name="Services" component={Services} />
      <App.Screen name="NewCategory" component={NewCategory} />
      <App.Screen name="NewService" component={NewService} />
      <App.Screen name="Reviews" component={Reviews} />
    </App.Navigator>
  );
};

export default AppStack;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  AppointmentScreen,
  ReportsScreen,
  CustomersScreen,
  MoreScreen,
  ServiceScreen
} from '@src/screens';
import { CustomBottomBar } from '@shared/components';

const { Screen, Navigator } = createBottomTabNavigator();

export const HPOBottomTabStack = () => {
  return (
    <Navigator
      headerMode="none"
      initialRouteName={screenNames.AppointmentScreen}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Screen {...AppointmentScreen} />
      <Screen {...ReportsScreen} />
      <Screen {...CustomersScreen} />
      <Screen {...MoreScreen} />
    </Navigator>
  );
};

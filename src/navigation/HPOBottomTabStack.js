import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  AppointmentScreen,
  ReportsScreen,
  CustomersScreen,
  MoreScreen,
} from '@src/screens';
import { CustomBottomBar } from '@shared/components';

const { Screen, Navigator } = createBottomTabNavigator();

export const HPOBottomTabStack = () => {
  return (
    <Navigator
      headerMode="none"
      tabBar={(props) => <CustomBottomBar {...props} />}>
      <Screen {...AppointmentScreen} />
      <Screen {...ReportsScreen} />
      <Screen {...CustomersScreen} />
      <Screen {...MoreScreen} />
    </Navigator>
  );
};

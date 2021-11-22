import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  AppointmentScreen,
  ReportsScreen,
  CustomersScreen,
  MoreScreen,
  ServiceScreen,
  CheckoutTabScreen,
  ReportStaffSalary
} from '@src/screens';
import { CustomBottomBar } from '@shared/components';
import { useSelector } from "react-redux";

const { Screen, Navigator } = createBottomTabNavigator();

export const HPOBottomTabStack = () => {

  const staff = useSelector(state => state.auth.staff);
  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const isViewReport = roleName == "admin" || roleName == "manager";

  return (
    <Navigator
      headerMode="none"
      initialRouteName={screenNames.AppointmentScreen}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Screen {...AppointmentScreen} />
      {isViewReport ? <Screen {...ReportsScreen} /> : <Screen {...ReportStaffSalary} />}
      <Screen {...CheckoutTabScreen} />
      <Screen {...MoreScreen} />
    </Navigator>
  );
};

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
import { translate } from "@localize";
import { images } from '@shared/themes';
import { Image } from "react-native"


const { Screen, Navigator } = createBottomTabNavigator();

export const HPOBottomTabStack = () => {

  const staff = useSelector(state => state.auth.staff);
  const language = useSelector(state => state.dataLocal.language);
  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const isViewReport = roleName == "admin" || roleName == "manager";

  return (
    <Navigator
      headerMode="none"
      initialRouteName={screenNames.AppointmentScreen}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Screen
        {...AppointmentScreen}
        options={{
          tabBarIcon: require('@src/assets/images/icon_tab_appointment.png'),
          tabBarLabel: translate("txtAppointment"),
        }}
      />
      {
        isViewReport ?
          <Screen {...ReportsScreen}
            options={{
              tabBarIcon: images.iconTabReports,
              tabBarLabel: translate('txtReports')
            }}
          /> :
          <Screen
            {...ReportStaffSalary}
            options={{
              tabBarIcon: images.iconTabReports,
              tabBarLabel: translate('txtReports')
            }}
          />
      }
      <Screen
        {...CheckoutTabScreen}
        options={{
          tabBarIcon: images.iconPayment,
          tabBarLabel: translate('txtCheckout')
        }}
      />
      <Screen
        {...MoreScreen}
        options={{
          tabBarIcon: images.iconTabMore,
          tabBarLabel: translate("txtMore")
        }}
      />
    </Navigator>
  );
};

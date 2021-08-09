import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  AppointmentScreen,
  ReportsScreen,
  CustomersScreen,
  MoreScreen,
} from '@src/screens';
import { CustomBottomBar } from '@shared/components';
import { AppointmentTabStack } from './AppointmentTabStack';
import { images } from '@shared/themes';

const { Screen, Navigator } = createBottomTabNavigator();

export const HPOBottomTabStack = () => {
  return (
    <Navigator
      headerMode="none"
      tabBar={(props) => <CustomBottomBar {...props} />}>
      <Screen
        name={screenNames.AppointmentStack}
        component={AppointmentTabStack}
        options={{
          tabBarIcon: images.iconTabAppointment,
          tabBarLabel: 'Appointment',
        }}
      />
      <Screen {...ReportsScreen} />
      <Screen {...CustomersScreen} />
      <Screen {...MoreScreen} />
    </Navigator>
  );
};

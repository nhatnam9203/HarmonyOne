import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import * as React from 'react';
import { AppointmentScreen, AppointmentDetailScreen } from '@src/screens';
import { images } from '@shared/themes';
import { createStackNavigator } from '@react-navigation/stack';

const { Screen, Navigator } = createSharedElementStackNavigator();
// const { Screen, Navigator } = createStackNavigator();

export const AppointmentTabStack = () => {
  return (
    <Navigator
      initialRouteName={screenNames.AppointmentScreen}
      headerMode="none">
      <Screen {...AppointmentScreen} />
      <Screen {...AppointmentDetailScreen} />
    </Navigator>
  );
};

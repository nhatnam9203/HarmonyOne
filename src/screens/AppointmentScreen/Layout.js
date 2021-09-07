import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { images, layouts } from '@shared/themes';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppointmentsPage, SchedulePage } from './pages';
import { AppointmentHeaderTab, HeaderStaffInfo } from './widgets';

const { Navigator, Screen } = createMaterialTopTabNavigator();


export const Layout = () => {
  return (
    <View style={layouts.fill}>
      {/* <StatusBar barStyle="light-content" /> */}
      <HeaderStaffInfo />
      <View style={styles.container}>
        <Navigator
          tabBar={(props) => <AppointmentHeaderTab {...props} />}
          initialRouteName={screenNames.AppointmentsPage}
          swipeEnabled={false}>
          <Screen
            {...AppointmentsPage}
            options={{ tabBarLabel: ' ', tabBarIcon: images.iconDate }}
          />
          <Screen
            {...SchedulePage}
            options={{
              tabBarLabel: 'Schedule',
              tabBarIcon: images.iconSchedule,
            }}
          />
        </Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

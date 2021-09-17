import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { CustomerListPage , BookingPage } from './pages';

const { Navigator, Screen } = createStackNavigator();

export const Layout = () => {
  return (
    <View style={styles.container}>
      <Navigator
        initialRouteName={screenNames.CustomerListPage}
        swipeEnabled={false}
        headerMode="none"
      >
        <Screen {...CustomerListPage} />
        <Screen {...BookingPage} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
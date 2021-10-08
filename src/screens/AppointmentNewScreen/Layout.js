import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { SelectService, SelectServiceDetail, SelectStaff } from './pages';

const { Navigator, Screen } = createStackNavigator();

export const Layout = () => {
  return (
    <View style={styles.container}>
      <Navigator
        initialRouteName={screenNames.SelectService}
        swipeEnabled={false}
        headerMode="none"
      >
        <Screen {...SelectService} />
        <Screen {...SelectServiceDetail} />
        <Screen {...SelectStaff} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
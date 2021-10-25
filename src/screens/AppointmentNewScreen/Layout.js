import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { SelectService, SelectServiceDetail, SelectProductDetail, SelectStaff, SelectDateTime, ReviewConfirm } from './pages';

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
        <Screen {...SelectProductDetail} />
        <Screen {...SelectStaff} />
        <Screen {...SelectDateTime} />
        <Screen {...ReviewConfirm} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
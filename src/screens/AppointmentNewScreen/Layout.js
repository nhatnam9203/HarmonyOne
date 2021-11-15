import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { SelectService, SelectServiceDetail, SelectProductDetail, SelectStaff, SelectDateTime, ReviewConfirm, EnterGiftCardAmount } from './pages';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export const Layout = () => {
  return (
    <View style={styles.container}>
      <Navigator
        initialRouteName={screenNames.SelectService}
        swipeEnabled={false}
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator : CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled : false
        }}
      >
        <Screen {...SelectService} />
        <Screen {...SelectServiceDetail} />
        <Screen {...SelectProductDetail} />
        <Screen {...SelectStaff} />
        <Screen {...SelectDateTime} />
        <Screen {...ReviewConfirm} />
        <Screen {...EnterGiftCardAmount} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
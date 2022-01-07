import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { GeneralInformation, BusinessInformation, BankInformation, PrincipalInformation, PackagePricing, ApplicationSubmit } from './pages';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export const Layout = () => {
  return (
    <View style={styles.container}>
      <Navigator
        initialRouteName={screenNames.PrincipalInformation}
        swipeEnabled={false}
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false
        }}
      >
        <Screen {...GeneralInformation} />
        <Screen {...BusinessInformation} />
        <Screen {...BankInformation} />
        <Screen {...PrincipalInformation} />
        <Screen {...PackagePricing} />
        <Screen {...ApplicationSubmit} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { BusinessPage, BasicEdit, OpeningHourEdit, LocationEdit, PhotoEdit } from "./pages"

const { Navigator, Screen } = createStackNavigator();

export const Layout = ({ }) => {
  return (
    <View style={styles.container}>
      <Navigator
        initialRouteName="BusinessPage"
        swipeEnabled={false}
        headerMode="none"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Screen {...BusinessPage} />
        <Screen {...BasicEdit} />
        <Screen {...OpeningHourEdit} />
        <Screen {...LocationEdit} />
        <Screen {...PhotoEdit} />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


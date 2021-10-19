import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderBooking } from "../../widgets";
import { ServicePage } from "./ServicePage";
import { ProductPage } from "./ProductPage";

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const Layout = ({
  isAddMore,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <HeaderBooking
        step={1}
        title={'Select Services & Product'}
        onPressBack={onBack}
      />
      <View style={styles.content}>
        <Navigator
          initialRouteName="ServicePage"
          swipeEnabled={false}
          tabBarOptions={{
            indicatorStyle: {
              height: 4,
              backgroundColor: colors.ocean_blue
            },
            labelStyle: {
              fontFamily: fonts.REGULAR,
              fontSize: scaleFont(17)
            },
            style: {
              backgroundColor: colors.white,
              width: 250,
              marginHorizontal: scaleWidth(16),
              borderBottomColor: 'transparent'
            },
            inactiveTintColor: "#404040",
            activeTintColor: colors.ocean_blue
          }}
        >
          <Screen {...ServicePage} />
          <Screen {...ProductPage} />
        </Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scaleWidth(8)
  },
});

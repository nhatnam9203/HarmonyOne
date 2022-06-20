import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Campaigns, MarketPlace } from "./pages";
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

const { Screen, Navigator } = createMaterialTopTabNavigator();

export const Layout = ({
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("Marketing")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        onPressLeft={() => NavigationService.navigate(screenNames.MoreScreen)}
      >
        <View style={styles.content}>
          <Navigator
            headerMode="none"
            initialRouteName={screenNames.Campaigns}
            tabBarOptions={{
              tabStyle: {
                borderBottomColor: "#eeeeee",
                borderBottomWidth: 1,
              },
              activeTintColor: colors.ocean_blue,
              inactiveTintColor: colors.greyish_brown_40,
              indicatorStyle: {
                height: 5,
                backgroundColor: colors.ocean_blue,
                width: scaleWidth(375 / 2 - 32),
                marginLeft: scaleWidth(16)
              },
              labelStyle: {
                fontFamily: fonts.REGULAR,
                fontSize: scaleFont(17),
              },
              allowFontScaling : false
            }}
            swipeEnabled={false}
          >
            <Screen
              {...Campaigns}
              options={{ tabBarLabel: translate('Campaigns') }}
            />
            <Screen
              {...MarketPlace}
              options={{ tabBarLabel: translate('Market place' )}}
            />
          </Navigator>
        </View>
      </SingleScreenLayout>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
  },
});

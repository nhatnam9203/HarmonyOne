import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SettlementWaitingPage, TransactionsPage, BatchHistoryPage } from "./pages"
import NavigationService from '@navigation/NavigationService';
const { Navigator, Screen } = createMaterialTopTabNavigator();


export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Settlement')}
        isRight={false}
        isLeft={true}
        onPressLeft={() => NavigationService.navigate(screenNames.MoreScreen)}
        isScrollLayout={false}
        containerStyle={{
          paddingBottom: 0,
          ...(Platform.OS == "android" && { borderWidth: 1 }),
          borderColor: "#eeeeee"
        }}
      >
        <View style={styles.content}>
          <Navigator
            initialRouteName={screenNames.SettlementWaitingPage}
            swipeEnabled={false}
            tabBarOptions={{
              indicatorStyle: {
                height: 4,
                backgroundColor: colors.ocean_blue
              },
              labelStyle: {
                fontFamily: fonts.REGULAR,
                fontSize: scaleFont(15)
              },
              style: {
                backgroundColor: colors.white,
              },
              activeTintColor: colors.ocean_blue,
              inactiveTintColor: "#585858",
              allowFontScaling: false
            }}
          >
            <Screen {...SettlementWaitingPage} />
            <Screen {...TransactionsPage} />
            <Screen {...BatchHistoryPage} />

          </Navigator>
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", },
  content: { flex: 1 }
})

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CloseSettlementPage, TransactionsPage, BatchHistoryPage } from "./pages"
const { Navigator, Screen } = createMaterialTopTabNavigator();


export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Settlement')}
        isRight={false}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingTop: 5, paddingBottom: 0 }}
      >
        <View style={styles.content}>
          <Navigator
            initialRouteName={screenNames.CloseSettlementPage}
            swipeEnabled={false}
            tabBarOptions={{
              indicatorStyle: {
                height: 4,
                backgroundColor: colors.ocean_blue
              },
              labelStyle: {
                fontFamily: fonts.REGULAR,
                fontSize: scaleFont(16)
              },
              style: {
                backgroundColor: colors.white,
              },
              activeTintColor : colors.ocean_blue,
              inactiveTintColor : "#585858"
            }}
          >
            <Screen {...CloseSettlementPage} />
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

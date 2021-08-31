import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScheduleTopTabBar } from './ScheduleTopTabBar';
import { fonts, colors } from '@shared/themes';

import { UpcomingPage } from './Upcoming';
import { CompletePage } from './Completed';

const { Screen, Navigator } = createMaterialTopTabNavigator();

export const Layout = ({}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: colors.WHITE_FA,
          },
        }}
        lazy={true}
        optimizationsEnabled={true}
        swipeEnabled={false}
        tabBar={(props) => <ScheduleTopTabBar {...props} />}>
        <Screen
          name="UpcomingPage"
          component={UpcomingPage}
          options={{
            tabBarLabel: t('Upcoming'),
          }}
          initialParams={{}}
        />
        <Screen
          name="CompletePage"
          component={CompletePage}
          options={{
            tabBarLabel: t('Completed'),
          }}
          initialParams={{}}
        />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

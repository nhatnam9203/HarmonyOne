import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { HeaderStaffInfo, HeaderTabPage } from './widgets';
import { layouts } from '@shared/themes';

export const Layout = () => {
  return (
    <View style={layouts.fill}>
      {/* <StatusBar barStyle="light-content" /> */}
      <HeaderStaffInfo />
      <HeaderTabPage />
      <View style={styles.container}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

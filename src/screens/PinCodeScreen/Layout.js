import React from 'react';
import { View, StyleSheet } from 'react-native';
export const Layout = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

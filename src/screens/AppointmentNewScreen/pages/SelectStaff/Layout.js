import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";

export const Layout = ({
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
 
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

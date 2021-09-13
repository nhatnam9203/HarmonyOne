import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from "@shared/themes";
import { CustomerInfo, AddService } from "../widget";
import HeaderBooking from "../HeaderBooking";

export const Layout = ({
  customerInfoRef
}) => {
  return (
    <View style={styles.container}>
      <HeaderBooking
        step={1}
        title={'Select Services'}
      />
      <View style={styles.content}>
        <CustomerInfo ref={customerInfoRef} />
        <View style={styles.line} />

        <AddService />
        <View style={styles.line} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scaleHeight(16)
  },
  line: {
    width: "100%",
    backgroundColor: "#eeeeee",
    height: 1,
    marginTop: scaleHeight(16),
    marginBottom : scaleHeight(16)
  }
});

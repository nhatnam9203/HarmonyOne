import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button } from "@shared/components";
import { HeaderBooking } from "../../widgets";

export const Layout = ({

}) => {

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={4}
        title={'Review & Confirm'}
      />
      <View style={styles.content}>
        <View style={{ flex: 1 }}>

        </View>

        <View style={styles.bottom}>
          <Button
            label="Confirm"
            onPress={() => { }}
            highlight={true}
            width={'100%'}
          />
        </View>
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
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
});

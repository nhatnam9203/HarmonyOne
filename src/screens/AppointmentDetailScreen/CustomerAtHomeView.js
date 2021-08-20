import { colors, fonts, images, layouts } from '@shared/themes';
import { formatPhoneNumber } from '@shared/utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CustomerAtHomeView = () => {
  return (
    <View style={styles.container}>
      <Image source={images.iconAtHome} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(64),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {},
});

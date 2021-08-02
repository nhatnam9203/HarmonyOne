import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { colors } from '@shared/themes';
import { images, fonts } from '@shared/themes';

export const HeaderTabPage = ({ isSchedule = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle}>
        <Image
          source={images.iconDate}
          style={[styles.icon, !isSchedule && { tintColor: colors.ocean_blue }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContent}>
        <Text style={styles.textStyle}>{'text'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle}>
        <Image
          source={images.iconSchedule}
          style={[styles.icon, isSchedule && { tintColor: colors.ocean_blue }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(56),
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.48,
    textAlign: 'center',
    color: colors.black,
  },

  btnStyle: {
    width: scaleWidth(42),
    height: scaleHeight(42),
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },
});

import { colors, fonts, images } from '@shared/themes';
import { dateToFormat } from '@shared/utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATE_FORMAT = 'dddd, DD MMM YYYY'; // Monday, August 30 2021
const TIME_FORMAT = 'LT'; // 4:20 PM
export const AppointmentTimeView = ({ fromTime = '', toTime = '' }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.customerContent}>
        <Text style={styles.textDate}>
          {dateToFormat(fromTime, DATE_FORMAT)}
        </Text>
        <Text style={styles.textTime}>
          {dateToFormat(fromTime, TIME_FORMAT)}
        </Text>
      </View>
      {/* <Image source={images.iconArrow} style={styles.arrow} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(80),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: scaleWidth(48),
    height: scaleHeight(48),
    borderRadius: scaleWidth(24),
    backgroundColor: colors.white_fa,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(23),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.55,
    textAlign: 'center',
    color: colors.ocean_blue,
  },

  customerContent: { flex: 1 },

  textDate: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(20),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.48,
    textAlign: 'left',
    color: colors.greyish_brown_40,
    height: scaleHeight(30),
  },

  textTime: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(23),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.55,
    textAlign: 'left',
    color: colors.ocean_blue,
    height: scaleHeight(34),
  },

  arrow: {
    width: scaleWidth(6),
    height: scaleHeight(10),
  },
});
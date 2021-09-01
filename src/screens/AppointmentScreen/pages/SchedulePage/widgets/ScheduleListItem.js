import { useNavigation } from '@react-navigation/core';
import { colors, fonts, images } from '@shared/themes';
import {
  dateToFormat,
  formatPhoneNumber,
  TIME_APPOINTMENT_FORMAT,
} from '@shared/utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppointmentStatus } from './AppointmentStatus';

export const ScheduleListItem = ({ item }) => {
  const navigation = useNavigation();

  const onPress = (pressEvt) => {
    navigation.push(screenNames.AppointmentDetailScreen, { item });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={images.barTimeLine}
        style={styles.barTimeLine}
        resizeMode="contain"
      />

      <View style={styles.columnContent}>
        <View style={styles.rowContent}>
          <Text style={styles.textTime}>
            {dateToFormat(item.fromTime, TIME_APPOINTMENT_FORMAT)}
          </Text>
        </View>
        <View style={styles.marginVertical} />
        <View style={styles.rowContent}>
          <Text style={styles.textTime}>
            {dateToFormat(item?.toTime, TIME_APPOINTMENT_FORMAT)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowContent}>
          <Text style={styles.textName}>
            {`${item?.firstName} ${item?.lastName}`}
          </Text>
        </View>
        <View style={styles.marginVertical} />
        <View style={styles.rowContent}>
          <Text style={styles.textPhone}>
            {`${formatPhoneNumber(item?.phoneNumber)}`}
          </Text>
        </View>
      </View>
      <View style={styles.columnContent}>
        <View style={styles.rowContent}>
          <AppointmentStatus status={item?.status} />
        </View>
        <View style={styles.rowContent}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    height: scaleHeight(68),
    paddingHorizontal: scaleWidth(16),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: scaleHeight(1),
    flexDirection: 'row',
  },

  barTimeLine: {
    height: scaleHeight(44),
    width: scaleWidth(8),
    flex: 0,
  },

  columnContent: {
    height: '100%',
    flex: 0,
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(4),
    paddingVertical: scaleHeight(8),
  },

  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(4),
    paddingVertical: scaleHeight(4),
  },

  rowContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  textTime: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.greyish_brown_40,
  },

  textName: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.ocean_blue,
  },

  textPhone: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'left',
    color: colors.bluegrey,
  },

  marginVertical: { height: scaleHeight(16) },
});

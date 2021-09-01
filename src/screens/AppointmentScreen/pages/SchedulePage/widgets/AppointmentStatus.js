import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@shared/themes';
import { upperFirst } from 'lodash';
import { APPOINTMENT_STATUS, getColorForStatus } from '@shared/utils';

export const AppointmentStatus = ({ status }) => {
  const theme = () => {
    const temp = getColorForStatus(status);

    switch (`${status}`.toLowerCase()) {
      case APPOINTMENT_STATUS.CONFIRM:
      case APPOINTMENT_STATUS.UN_CONFIRM:
        return {
          content: { backgroundColor: temp, borderWidth: 0 },
          text: { color: colors.greyish_brown_40 },
        };
      default:
        return {
          content: { backgroundColor: temp, borderWidth: 0 },
          text: { color: colors.white },
        };
    }
  };

  return (
    <View style={[styles.container, theme()?.content]}>
      <Text style={[styles.textStyle, theme()?.text]}>
        {upperFirst(status ?? '')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(80),
    height: scaleHeight(20),
    borderRadius: scaleWidth(10),
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(10),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.WHITE,
  },
});

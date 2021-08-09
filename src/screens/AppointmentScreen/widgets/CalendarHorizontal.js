import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@components';
import CalendarStrip from 'react-native-calendar-strip';
import { calendar } from '@assets';
import NavigationService from '@navigation/NavigationService';
import { colors, fonts } from '@shared/themes';
import { dateToFormat } from '@shared/utils';

export const CalendarHorizontal = ({ onChangeWeekText }) => {
  const onWeekChanged = (start, end) => {
    const textFormat = dateToFormat(start, 'MMMM YYYY');
    console.log(textFormat);
    if (onChangeWeekText && typeof onChangeWeekText === 'function') {
      onChangeWeekText(textFormat);
    }
  };
  const onDateSelected = (start, end) => {
    console.log(start);
    console.log(end);
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        style={styles.calendar}
        calendarHeaderContainerStyle={styles.calendarHeaderStyle}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        dayContainerStyle={styles.dayContainerStyle}
        dateNameStyle={styles.dateNameStyle}
        highlightDateNameStyle={styles.dateNameStyle}
        dateNumberStyle={styles.dateNumberStyle}
        highlightDateNumberStyle={[styles.dateNumberStyle, { color: 'white' }]}
        highlightDateNumberContainerStyle={
          styles.highlightDateNumberContainerStyle
        }
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
        }}
        scrollable={true}
        scrollerPaging={true}
        // calendarHeaderPosition="below"
        onWeekChanged={onWeekChanged}
        onDateSelected={onDateSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(60),
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },

  calendar: {
    height: scaleHeight(60),
    paddingTop: 0,
    paddingBottom: scaleHeight(30),
    justifyContent: 'center',
  },

  calendarHeaderStyle: {
    height: 0,
  },

  dayContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scaleHeight(14),
    height: scaleHeight(48),
  },

  dateNameStyle: {
    opacity: 0.7,
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: colors.bluegrey,
  },

  dateNumberStyle: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: colors.greyish_brown_40,
  },

  highlightDateNumberContainerStyle: {
    height: scaleHeight(28),
    width: scaleWidth(28),
    borderRadius: scaleHeight(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ocean_blue,
  },
});

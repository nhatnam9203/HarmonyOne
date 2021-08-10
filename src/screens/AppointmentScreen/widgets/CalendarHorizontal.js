import { colors, fonts } from '@shared/themes';
import { dateToFormat } from '@shared/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export const CalendarHorizontal = ({ onChangeWeekText, onDateSelected }) => {
  const onWeekChanged = (start, end) => {
    const textFormat = dateToFormat(start, 'MMMM YYYY');
    if (onChangeWeekText && typeof onChangeWeekText === 'function') {
      onChangeWeekText(textFormat);
    }
  };

  const onHandleDateSelected = (date) => {
    if (onDateSelected && typeof onDateSelected === 'function') {
      onDateSelected(date);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CalendarStrip
          style={styles.calendar}
          calendarHeaderContainerStyle={styles.calendarHeaderStyle}
          calendarHeaderStyle={styles.calendarHeaderStyle}
          dayContainerStyle={styles.dayContainerStyle}
          dateNameStyle={styles.dateNameStyle}
          highlightDateNameStyle={styles.dateNameStyle}
          dateNumberStyle={styles.dateNumberStyle}
          highlightDateNumberStyle={[
            styles.dateNumberStyle,
            { color: 'white' },
          ]}
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
          onDateSelected={onHandleDateSelected}
          selectedDate={new Date()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    flex: 0,
    paddingBottom: scaleHeight(2),
  },

  content: {
    flex: 0,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
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
    height: scaleHeight(50),
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

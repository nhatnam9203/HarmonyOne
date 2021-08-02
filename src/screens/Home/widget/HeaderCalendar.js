import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight, slop } from '@utils';
import { Text } from '@components';
import { calendar, personHome } from '@assets';
import moment from 'moment';
import NavigationService from '@navigation/NavigationService';

const Header = () => {
  const [isSchedule, setSchedule] = React.useState(false);

  const navigateSchedule = () => {
    NavigationService.navigate('Schedule');
    setSchedule(true);
  };

  const back = () => {
    NavigationService.navigate('AppointmentList');
    setSchedule(false);
  };

  return (
    <View style={styles.container}>
      <DayPicked isSchedule={isSchedule} onPress={back} />
      <Text fontFamily="bold" style={styles.month}>
        {isSchedule ? 'Schedule' : `${moment().format('MMMM YYYY')}`}
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={navigateSchedule}>
        <Image style={styles.calendar(isSchedule)} source={calendar} />
      </TouchableOpacity>
    </View>
  );
};

const DayPicked = ({ onPress, isSchedule = false }) => {
  return (
    <TouchableOpacity
      hitSlop={slop}
      onPress={onPress}
      activeOpacity={1}
      style={styles.containerDayPicked}>
      <View style={styles.rowDot}>
        <View style={styles.dot(isSchedule)} />
        <View style={[styles.dot(isSchedule), { marginLeft: scaleWidth(3) }]} />
      </View>
      <View style={styles.iconDayPicked(isSchedule)}>
        <View style={styles.iconDayPickedHeader(isSchedule)} />
        <View style={styles.bodyiconDayPicked}>
          <Text fontFamily="bold" style={styles.txtDay(isSchedule)}>
            20
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(1),
    paddingHorizontal: scaleWidth(5),
  },
  calendar: (isSchedule) => {
    return {
      width: scaleWidth(8),
      height: scaleWidth(8),
      tintColor: isSchedule ? '#1366AE' : '#585858',
    };
  },
  month: {
    fontSize: scaleWidth(5),
    color: '#000000',
  },
  iconDayPicked: (isSchedule) => {
    return {
      width: scaleWidth(8),
      height: scaleWidth(6.5),
      borderRadius: 3,
      borderWidth: 1.3,
      borderColor: !isSchedule ? '#1366AE' : '#585858',
    };
  },
  iconDayPickedHeader: (isSchedule) => {
    return {
      width: '100%',
      height: scaleWidth(2),
      backgroundColor: !isSchedule ? '#1366AE' : '#585858',
    };
  },
  rowDot: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: scaleWidth(1.5),
    marginBottom: 1,
  },
  dot: (isSchedule) => {
    return {
      width: scaleWidth(1),
      height: scaleWidth(1),
      borderRadius: 300,
      backgroundColor: !isSchedule ? '#1366AE' : '#585858',
    };
  },
  bodyiconDayPicked: {
    width: '100%',
    height: scaleWidth(3.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDay: (isSchedule) => {
    return {
      fontSize: scaleWidth(3),
      color: !isSchedule ? '#1366AE' : '#585858',
    };
  },
});

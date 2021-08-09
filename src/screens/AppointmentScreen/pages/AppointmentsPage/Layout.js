import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppointmentHeaderTab,
  HeaderStaffInfo,
  CalendarHorizontal,
} from '../../widgets';

export const Layout = ({ onChangeWeekText }) => {
  return (
    <View style={styles.container}>
      <CalendarHorizontal onChangeWeekText={onChangeWeekText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

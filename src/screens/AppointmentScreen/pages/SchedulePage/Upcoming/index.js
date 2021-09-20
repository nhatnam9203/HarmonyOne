import React from 'react';
import { View, SectionList, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { ScheduleList } from '../widgets';
import { useAxiosQuery, appointmentStaffByTypeRequest } from '@src/apis';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { appointmentGroupByFromTime } from '@shared/utils';

export const UpcomingPage = ({ services }) => {
  const { staffId } = useSelector((state) => state.auth.staff);

  const [items, setItems] = React.useState(services);

  const [, getAppointmentStaffByType] = useAxiosQuery({
    ...appointmentStaffByTypeRequest(staffId),
    onSuccess: (data) => {
      const groupAppointments = appointmentGroupByFromTime(data);
      setItems(groupAppointments);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      getAppointmentStaffByType();
    }, []),
  );

  return (
    <View style={styles.container}>
      <ScheduleList sections={items} />
    </View>
  );
};

const styles = StyleSheet.create({});

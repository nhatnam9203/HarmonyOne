import React from 'react';
import { View, SectionList, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { ScheduleList } from '../widgets';

export const UpcomingPage = ({ services }) => {
  const [items, setItems] = React.useState(services);

  return (
    <View style={styles.container}>
      <ScheduleList sections={items} />
    </View>
  );
};

const styles = StyleSheet.create({});

import React from 'react';
import { View, SectionList, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { images } from '@shared/themes';

export const ScheduleListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.barTimeLine}
        style={styles.barTimeLine}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    height: scaleHeight(68),
    paddingHorizontal: scaleWidth(16),
    justifyContent: 'center',
    marginVertical: scaleHeight(1),
  },
  barTimeLine: {
    height: '80%',
  },
});

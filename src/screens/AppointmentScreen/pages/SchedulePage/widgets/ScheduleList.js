import React from 'react';
import { View, SectionList, StyleSheet, Image, Text } from 'react-native';
import { fonts, colors } from '@shared/themes';
import { ScheduleListItem } from './ScheduleListItem';

const data = [
  {
    title: 'Thursdata - Feb 20, 2020',
    data: [
      {
        fromTime: '08:00 AM',
        toTime: '10:00 AM',
        userName: 'Kevin Baber',
        phone: '(+84) 35514-0858',
        status: 'unconfirm',
      },
      {
        fromTime: '08:00 AM',
        toTime: '10:00 AM',
        userName: 'Kevin Baber',
        phone: '(+84) 35514-0858',
        status: 'confirm',
      },
      {
        fromTime: '08:00 AM',
        toTime: '10:00 AM',
        userName: 'Kevin Baber',
        phone: '(+84) 35514-0858',
        status: 'checkin',
      },
      {
        fromTime: '08:00 AM',
        toTime: '10:00 AM',
        userName: 'Kevin Baber',
        phone: '(+84) 35514-0858',
        status: 'paid',
      },
    ],
  },
];

export const ScheduleList = ({ sections }) => {
  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.headerContent}>
        <Text style={styles.textHeader}>{section?.key}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return <ScheduleListItem key={item.appointmentId} item={item} />;
  };

  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      keyExtractor={(item) => item?.appointmentId}
    />
  );
};

const styles = StyleSheet.create({
  headerContent: {
    justifyContent: 'center',
    height: scaleHeight(48),
    paddingHorizontal: scaleWidth(16),
  },
  textHeader: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'left',
    color: colors.greyish_brown_40,
  },
});

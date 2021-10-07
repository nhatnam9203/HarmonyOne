import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts } from '@shared/themes';
import { AppointmentServiceItem } from './AppointmentServiceItem';

export const AppointmentServiceList = ({ services = [] }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{t('Sevices')}</Text>
      {
        services?.map((item) => (
          <AppointmentServiceItem key={item?.bookingServiceId+"serviceItem"} service={item} />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0, paddingVertical: scaleHeight(10) },
  flatList: { flex: 1, backgroundColor: 'red' },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(17),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.greyish_brown_40,
  },
});

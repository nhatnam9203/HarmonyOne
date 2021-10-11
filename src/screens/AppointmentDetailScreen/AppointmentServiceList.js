import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts } from '@shared/themes';
import { AppointmentServiceItem } from '@shared/components';
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";

export const AppointmentServiceList = ({ services = [], extras = [] }) => {
  const { t } = useTranslation();


  const totalDuration = (service, itemType) => {
    let total = 0;
    total += parseInt(service[itemType])
    for (let i = 0; i < extras.length; i++) {
      if ((extras[i].bookingServiceId == service.bookingServiceId)) {
        total += extras[i][itemType];
      }
    }
    return total;
  }

  const getTotalPrice = (service) => {
    let total = 0;
    total += formatNumberFromCurrency(service.price);
    for (let i = 0; i < extras.length; i++) {
      if ((extras[i].bookingServiceId == service.bookingServiceId)) {
        total += formatNumberFromCurrency(extras[i].price);
      }
    }
    return formatMoney(total);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{t('Sevices')}</Text>
      {
        services?.map((item) => (
          <AppointmentServiceItem
            key={item?.bookingServiceId + "serviceItem"}
            service={item}
            extras={extras.map(ex => ({ ...ex, name: ex.extraName }))}
            name={item?.serviceName}
            duration={totalDuration(item, "duration")}
            price={getTotalPrice(item)}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: scaleHeight(10) },
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

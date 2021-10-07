import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '@shared/themes';
import { CustomImage } from '@shared/components';
import { formatMoneyWithUnit } from '@shared/utils';

export const AppointmentServiceItem = ({ service }) => {
  const { t } = useTranslation();

  const getDuration = (duration) => {
    return duration + ' min';
  };

  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <CustomImage
        style={styles.serviceImage}
        source={{
          uri: service.imageUrl,
          priority: 'normal',
        }}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.textServiceName}>{service?.serviceName}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.textServiceDuration}>
            {getDuration(service?.duration)}
          </Text>
          <Text style={styles.textServiceTotal}>
            {getPrice(service?.price)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(90),
    flexDirection: 'row',
    paddingVertical: scaleHeight(16),
    borderBottomColor: '#eeeeee',
    borderBottomWidth: scaleHeight(1),
  },
  content: { flex: 1, marginLeft: scaleWidth(16), justifyContent : 'space-between' },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(17),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.greyish_brown_40,
  },
  serviceImage: {
    width: scaleHeight(60),
    height: scaleHeight(60),
    borderRadius: scaleHeight(3),
  },
  textServiceName: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.ocean_blue,
    flex: 1,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textServiceDuration: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(14),
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.greyish_brown_40,
  },
  textServiceTotal: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.greyish_brown_40,
  },
});

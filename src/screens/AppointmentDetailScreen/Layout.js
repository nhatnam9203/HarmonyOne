import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';
import { CustomerInfoView } from './CustomerInfoView';
import { AppointmentTimeView } from './AppointmentTimeView';
import { CustomerAtHomeView } from './CustomerAtHomeView';
import { colors, fonts } from '@shared/themes';
import { AppointmentServiceList } from './AppointmentServiceList';
import { formatMoneyWithUnit } from '@shared/utils';

export const Layout = ({ appointmentItem, headerColor }) => {
  const [t] = useTranslation();

  const getDuration = (duration) => {
    return duration + ' min';
  };

  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <SingleScreenLayout pageTitle={t('Appointment details')} {...headerColor}>
        <View style={styles.content}>
          <CustomerInfoView
            customerId={appointmentItem?.customerId}
            firstName={appointmentItem?.firstName}
            lastName={appointmentItem?.lastName}
            phoneNumber={appointmentItem?.phoneNumber}
          />
          <CustomerAtHomeView />
          <View style={styles.line} />
        </View>
        <View style={styles.content}>
          <AppointmentTimeView
            fromTime={appointmentItem?.fromTime}
            toTime={appointmentItem?.toTime}
          />
          <View style={styles.line} />
          <AppointmentServiceList services={appointmentItem?.services} />

          <View style={styles.totalContent}>
            <View style={styles.totalInfoContent}>
              <Text style={styles.textTotalInfo}>{t('Total duration')}</Text>
              <Text style={styles.textTotalInfo}>
                {getDuration(appointmentItem?.duration)}
              </Text>
            </View>
            <View style={styles.totalInfoContent}>
              <Text style={styles.textTotal}>{t('Total')}</Text>
              <Text style={styles.textTotalPrice}>
                {getPrice(appointmentItem?.total)}
              </Text>
            </View>
          </View>
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: scaleWidth(16),
    flex: 0,
  },

  line: {
    height: scaleHeight(1),
    width: '100%',
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
  },

  totalContent: {
    flex: 0,
  },

  totalInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: scaleHeight(30),
  },

  textTotalInfo: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'left',
    color: colors.bluegrey,
  },

  textTotal: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.bluegrey,
  },

  textTotalPrice: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.frog_green,
  },
});

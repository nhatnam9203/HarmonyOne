import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';
import { CustomerInfoView } from './CustomerInfoView';
import { CustomerAtHomeView } from './CustomerAtHomeView';
import { colors } from '@shared/themes';

export const Layout = ({ appointmentItem, headerColor }) => {
  const [t] = useTranslation();

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
          <CustomerInfoView
            customerId={appointmentItem?.customerId}
            firstName={appointmentItem?.firstName}
            lastName={appointmentItem?.lastName}
            phoneNumber={appointmentItem?.phoneNumber}
          />
          <View style={styles.line} />
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
  },

  line: {
    height: scaleHeight(1),
    width: '100%',
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
  },
});

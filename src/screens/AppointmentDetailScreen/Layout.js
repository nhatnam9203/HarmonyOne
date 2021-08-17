import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';

export const Layout = ({ appointmentItem, headerColor }) => {
  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout pageTitle={t('Appointment details')} {...headerColor}>
        <View style={styles.content}></View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});

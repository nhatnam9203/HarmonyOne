import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import NavigationService from '@navigation/NavigationService'

export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Help & FAQ')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <View style={{ marginVertical: scaleWidth(10) }} >
            <Text style={[styles.contentTerms, { fontWeight: "bold", fontSize: scaleFont(15) }]}>
              Contacting HarmonyPay
            </Text>
          </View>
          <Text style={styles.contentTerms}>
            If you have any questions, please contact HarmonyPay at
            team@harmonypayment.com.
          </Text>
        </View>
      </SingleScreenLayout>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },

  title: {
    fontSize: scaleFont(23),
    color: colors.ocean_blue,
    fontFamily: fonts.MEDIUM,
  },

  contentTerms: {
    fontSize: scaleFont(14),
    color: "#000000",
    marginTop: scaleHeight(12),
    fontWeight: "400",
    lineHeight : 22

  }
});

import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button, IconButton } from "@shared/components";
import { IncomeByPaymentMethod } from "./IncomeByPaymentMethod";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SingleScreenLayout } from '@shared/layouts';
import moment from "moment";

export const Layout = ({
  settlementWaiting,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Review settlement')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <KeyboardAwareScrollView style={styles.content}>

          <Text style={styles.bigTitle}>Actual amount</Text>
          <IncomeByPaymentMethod settlementWaiting={settlementWaiting} />

          <View style={{ marginTop: scaleHeight(24) }} >
            <Text style={[styles.title, { fontFamily: fonts.MEDIUM, color: "#00408080" }]}>
              Note
            </Text>

            <View pointerEvents="none" style={styles.containerNote}>
              <TextInput
                multiline={true}
                textAlignVertical='top'
                value={settlementWaiting?.note || ""}
                onChangeText={text => {
                }}
                style={{ flex: 1 }}
              />
            </View>

            <Text style={[styles.bigTitle, { marginTop: scaleHeight(16) }]}>Open batch</Text>

            <TouchableOpacity style={styles.wrapBatch}>
              <Text style={[styles.bigTitle, styles.txtCreditTrans]}>
                Credit transactions:
              </Text>
              <Text style={[styles.bigTitle, { fontSize: scaleFont(15), marginBottom : 0 }]}>
                24
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: scaleHeight(120) }} />

        </KeyboardAwareScrollView>

      </SingleScreenLayout>

      <View style={styles.bottom}>
        <Button
          label="Settle"
          onPress={() => { }}
          highlight={true}
          width={'100%'}
          styleButton={{ backgroundColor: "#4AD100", borderWidth: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  txtCreditTrans : {
    fontSize: scaleFont(15), 
    fontFamily: fonts.MEDIUM, 
    marginLeft : 0,
     marginBottom : 0 
  },
  wrapBatch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleWidth(10),
    borderWidth : 1,
    borderColor : "#cccccc",
    marginHorizontal : scaleWidth(16),
    borderRadius : 3
  },
  iconPen: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  txtNote: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.LIGHT
  },
  containerNote: {
    width: scaleWidth(375 - 32),
    minHeight: scaleHeight(80),
    marginTop: scaleHeight(16),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginHorizontal: scaleWidth(16),
    padding: scaleWidth(8)
  },
  rowIncone: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  txtIncome: {
    fontSize: scaleFont(14),
    color: "#404040",
    fontFamily: fonts.REGULAR
  },
  rowBetween: {
    flexDirection: "row", justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    paddingVertical: scaleWidth(16)
  },

  title: {
    fontSize: scaleFont(15),
    fontFamily: fonts.MEDIUM,
    color: "#404040",
    marginLeft: scaleWidth(16)
  },

  bigTitle: {
    fontSize: scaleFont(17),
    color: colors.ocean_blue,
    fontFamily: fonts.BOLD,
    marginBottom: scaleHeight(16),
    marginLeft: scaleWidth(16)
  },

  bottom: {
    width: scaleWidth(375),
    padding: scaleWidth(16)
  }

});

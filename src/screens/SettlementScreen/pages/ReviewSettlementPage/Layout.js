import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button, IconButton } from "@shared/components";
import { TableSalesByStaff } from "./TableSalesByStaff";
import { IncomeByPaymentMethod } from "./IncomeByPaymentMethod";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SingleScreenLayout } from '@shared/layouts';
import moment from "moment";

export const Layout = ({
  listStaffSales,
  listGiftCardSales,
  settlementWaiting,
  valueNote,
  onChangeNote,
  editActualAmount,
}) => {

  const [t] = useTranslation();

  let totalAmount = 0;
  let giftCardTotal = 0
  if (listStaffSales.length > 0) {
    listStaffSales.forEach(staff => {
      totalAmount = parseFloat(totalAmount) + parseFloat(formatNumberFromCurrency(staff?.total || 0.00));
    });
  }

  if (listGiftCardSales.length > 0) {
    listGiftCardSales.forEach(giftCard => {
      giftCardTotal = parseFloat(giftCardTotal) + parseFloat(formatNumberFromCurrency(giftCard?.total || 0.00));
    });
  }
  totalAmount = totalAmount + giftCardTotal;

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
                value={valueNote}
                onChangeText={text => {
                  onChangeNote(text);
                }}
                style={{ flex: 1 }} 
              />
            </View>
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
          styleButton={{ backgroundColor: "#4AD100", borderWidth : 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

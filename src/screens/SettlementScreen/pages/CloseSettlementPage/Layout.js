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
import moment from "moment";

export const Layout = ({
  listStaffSales,
  listGiftCardSales,
  settlementWaiting,

  valueNote,
  onChangeNote,
  
  editActualAmount,
  reviewSettlement,
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
      <KeyboardAwareScrollView style={styles.content}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.title, { fontFamily: fonts.BOLD }]}>
            Last settlement :
          </Text>
          <Text style={[styles.title, { marginLeft: scaleWidth(16) }]}>
            {moment(settlementWaiting?.settlementdate).format("MM/DD/YYYY - hh:mm A")}
          </Text>
        </View>

        {/*********************************** TABLE SALES BY STAFF  ***********************************/}
        <Text style={styles.bigTitle}>Sales by staff</Text>
        <TableSalesByStaff data={listStaffSales} />

        {/*********************************** TOTAL GIFT CARD SOLD  ***********************************/}
        <View style={[styles.rowBetween, { marginTop: scaleHeight(16) }]}>
          <Text style={[styles.title, { fontFamily: fonts.MEDIUM, color: colors.ocean_blue }]}>
            Gift Card Sold
            </Text>

          <Text style={[styles.title, { fontFamily: fonts.MEDIUM, paddingRight: scaleWidth(16), color: colors.ocean_blue }]}>
            $ {formatMoney(giftCardTotal)}
          </Text>
        </View>

        {/*********************************** TOTAL  ***********************************/}
        <View style={[styles.rowBetween, { backgroundColor: "#DCF7FF", alignItems: 'center', marginTop: scaleHeight(5) }]}>
          <Text style={[styles.title, { fontFamily: fonts.MEDIUM }]}>
            Total
          </Text>
          <Text style={[styles.title, { fontFamily: fonts.MEDIUM, padding: scaleWidth(16), color: "#4CD964" }]}>
            $ {formatMoney(totalAmount)}
          </Text>
        </View>

      {/*********************************** INCOME BY PAYMENT METHOD  ***********************************/}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: scaleWidth(16) }}>
          <Text style={styles.bigTitle}>Income by payment methods</Text>
          {
            settlementWaiting?.checkout && settlementWaiting?.checkout.length > 0 &&
            <IconButton
              icon={images.iconPen}
              iconStyle={styles.iconPen}
              onPress={editActualAmount}
            />
          }
        </View>
        <IncomeByPaymentMethod settlementWaiting={settlementWaiting} />

      {/*********************************** NOTE  ***********************************/}
        <View style={{ marginTop: scaleHeight(24) }} >
          <Text style={[styles.title, { fontFamily: fonts.MEDIUM, color: "#00408080" }]}>
            Note
          </Text>

          <View style={styles.containerNote}>
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

      {/*********************************** BUTTON CONFIRM  ***********************************/}
      {
        settlementWaiting?.checkout && settlementWaiting?.checkout.length > 0 &&
        <View style={styles.bottom}>
          <Button
            label="Confirm"
            onPress={reviewSettlement}
            highlight={true}
            width={'100%'}
          />
        </View>
      }
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
    marginVertical: scaleHeight(16),
    marginTop: scaleHeight(24),
    marginLeft: scaleWidth(16)
  },

  bottom: {
    width: scaleWidth(375),
    padding: scaleWidth(16)
  }

});
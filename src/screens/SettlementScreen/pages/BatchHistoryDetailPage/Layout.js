import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { TableSalesByStaff } from "./TableSalesByStaff";
import { IncomeByPaymentMethod } from "./IncomeByPaymentMethod";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import moment from "moment";
import { translate } from "@localize";

export const Layout = ({
  staffSales,
  giftCardSales,
  batchDetail,
  viewGiftCardSold
}) => {

  const [t] = useTranslation();

  let totalAmount = 0;
  let giftCardTotal = 0
  if (staffSales.length > 0) {
    staffSales.forEach(staff => {
      totalAmount = parseFloat(totalAmount) + parseFloat(formatNumberFromCurrency(staff?.total || 0.00));
    });
  }

  if (giftCardSales.length > 0) {
    giftCardSales.forEach(giftCard => {
      giftCardTotal = parseFloat(giftCardTotal) + parseFloat(formatNumberFromCurrency(giftCard?.total || 0.00));
    });
  }

  totalAmount = totalAmount + giftCardTotal;


  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t(`Batch #${batchDetail?.settlementId}`)}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <ScrollView style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.title, { fontFamily: fonts.BOLD }]}>
              {translate("Batch ID")} : #{batchDetail?.settlementId}
            </Text>
            <Text style={[styles.title, { marginLeft: scaleWidth(16) }]}>
              {moment(batchDetail?.settlementdate).format("MM/DD/YYYY - hh:mm A")}
            </Text>
          </View>

          <Text style={styles.bigTitle}>{translate("Sales by staff")}</Text>
          <TableSalesByStaff data={staffSales} />

          <TouchableOpacity onPress={viewGiftCardSold} style={[styles.rowBetween, { marginTop: scaleHeight(16) }]}>
            <Text style={[styles.title, { fontFamily: fonts.MEDIUM, color: colors.ocean_blue }]}>
              {translate("Gift Card Sold")}
            </Text>

            <Text style={[styles.title, { fontFamily: fonts.MEDIUM, paddingRight: scaleWidth(16), color: colors.ocean_blue }]}>
              $ {formatMoney(giftCardTotal)}
            </Text>
          </TouchableOpacity>

          <View style={[styles.rowBetween, { backgroundColor: "#DCF7FF", alignItems: 'center', marginTop: scaleHeight(5) }]}>
            <Text style={[styles.title, { fontFamily: fonts.MEDIUM }]}>
              {translate("Total")}
            </Text>

            <Text style={[styles.title, { fontFamily: fonts.BOLD, padding: scaleWidth(16), color: "#4CD964" }]}>
              $ {formatMoney(totalAmount)}
            </Text>
          </View>

          <Text style={styles.bigTitle}>{translate("Income by payment methods")}</Text>
          <IncomeByPaymentMethod batchDetail={batchDetail} />

          <View style={{ marginTop : scaleHeight(24) }} >
            <Text style={[styles.title, { fontFamily: fonts.MEDIUM, color: "#00408080" }]}>
              {translate("Note")}
            </Text>

            <View style={styles.containerNote}>
              <TextInput 
                multiline={true}
                textAlignVertical='top'
                style={{ }}
                value={batchDetail?.note || ""}
              />
            </View>
          </View>

          <View style={{ height: scaleHeight(120) }} />

        </ScrollView>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  txtNote : {
    fontSize : scaleFont(15), 
    color : "#404040", 
    fontFamily : fonts.LIGHT 
  },
  containerNote : {
    width: scaleWidth(375-32),
    minHeight: scaleHeight(80),
    marginTop : scaleHeight(16),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginHorizontal : scaleWidth(16),
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
  }

});

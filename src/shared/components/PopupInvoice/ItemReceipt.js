import { formatMoney } from "@shared/utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ItemReceipt = ({ item, index, textStyle }) => {
  console.log(item);

  const renderSalonItemInvoice = () => {
    const price = item.data && item.data.price ? item.data.price : 0;
    const quanlitySet = item.quanlitySet ? item.quanlitySet : 1;
    const total = formatMoney(price * quanlitySet);
    const note = item.note ? item.note : "";
    const staffName = item.staff?.displayName ?? "";
    return (
      <View style={styles.content}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={[styles.textStyle, textStyle]}>
            {`${index + 1}. ${
              item.data && item.data.name ? item.data.name : ""
            }`}
          </Text>
          {note ? (
            <Text
              style={[styles.textStyle, textStyle]}
            >{`(Note: ${note})`}</Text>
          ) : null}
        </View>

        <View style={{ justifyContent: "center", width: scaleWidth(100) }}>
          <Text style={[styles.textStyle, textStyle]}>{` ${staffName}`}</Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(80),
            },
          ]}
        >
          <Text style={[styles.textStyle, textStyle]}>{`$ ${
            total ? total : ""
          }`}</Text>
        </View>
      </View>
    );
  };

  return renderSalonItemInvoice();
};

export const ItemHeaderReceipt = ({ textStyle }) => {

  const renderSalonHeaderInvoice = () => {
    return (
      <View style={styles.content}>
        <View
          style={[
            styles.headerContent,
            {
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
            },
          ]}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`DESCRIPTION`}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            width: scaleWidth(100),
            alignItems: "flex-start",
          }}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`STAFF`}</Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(90),
            },
          ]}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`TOTAL`}</Text>
        </View>
      </View>
    );
  };

  return renderSalonHeaderInvoice();
};

const styles = StyleSheet.create({
  content: { flexDirection: "row", paddingVertical: scaleHeight(0) },

  textStyle: { fontSize: scaleFont(15), fontWeight: "400", textAlign: "left" },

  headerStyle: {
    fontSize: scaleFont(15),
    fontWeight: "500",
    textAlign: "left",
  },

  headerContent: {
    justifyContent: "center",
    alignItems: "center",
    height: scaleHeight(40),
  },
});

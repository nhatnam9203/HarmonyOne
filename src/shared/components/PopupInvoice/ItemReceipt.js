import { formatMoney } from "@utils";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ItemReceipt = ({ item, index, type, textStyle }) => {
  console.log(item);

  const renderItemInvoice = () => {
    const price = item.data && item.data.price ? item.data.price : 0;
    const discount = item?.data?.discount;
    const discountPercent = item?.data?.discountPercent;

    const quanlitySet = item.quanlitySet ?? 1;
    const total = formatMoney(price * quanlitySet);
    const note = item.note ? item.note : "";
    const label = item?.data?.value;

    return (
      <>
        <View style={styles.content}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={[styles.textStyle, textStyle]}>
              {`${index + 1}. ${
                item.data && item.data.name ? item.data.name : ""
              }`}
            </Text>

            {label ? <Text style={styles.textStyle}>{`${label}`}</Text> : null}
            {/* {discount > 0 ? (
            <Text
              style={styles.textStyle}
            >{`  (Discount: $ ${discount})`}</Text>
          ) : null}
          {discountPercent > 0 ? (
            <Text
              style={styles.textStyle}
            >{`  (Discount: ${discountPercent}%)`}</Text>
          ) : null} */}
            {note ? (
              <Text style={styles.textStyle}>{`(Note: ${note})`}</Text>
            ) : null}
          </View>

          <View
            style={{
              width: scaleWidth(90),
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text style={[styles.textStyle, textStyle]}>{`$ ${price}`}</Text>
          </View>

          <View
            style={[
              styles.headerContent,
              {
                width: scaleWidth(40),
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Text style={[styles.textStyle, textStyle]}>{quanlitySet}</Text>
          </View>

          <View
            style={[
              styles.headerContent,
              {
                width: scaleWidth(90),
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Text style={[styles.textStyle, textStyle]}>{`$ ${
              total ? total : ""
            }`}</Text>
            {/*
          {discount > 0 ? (
            <Text style={styles.textStyle}>{` $ ${
              discount * quanlitySet
            }`}</Text>
          ) : null}
          {discountPercent > 0 ? (
            <Text style={styles.textStyle}>{`$ ${
              discountPercent * price * quanlitySet
            }`}</Text>
          ) : null} */}
          </View>
        </View>
        {(discount > 0 || discountPercent > 0) && (
          <View style={{ height: scaleHeight(30), flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {discount > 0 ? (
                <Text
                  style={styles.textStyle}
                >{`Discount: $ ${discount}`}</Text>
              ) : null}
              {discountPercent > 0 ? (
                <Text
                  style={styles.textStyle}
                >{`Discount: ${discountPercent}%`}</Text>
              ) : null}
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                width: scaleWidth(90),
                alignItems: "flex-start",
              }}
            >
              {discount > 0 ? (
                <Text style={styles.textStyle}>{`- $ ${formatMoney(
                  discount / quanlitySet
                )}`}</Text>
              ) : null}
              {discountPercent > 0 ? (
                <Text style={styles.textStyle}>{`- $ ${formatMoney(
                  (discountPercent * price) / 100
                )}`}</Text>
              ) : null}
            </View>
            <View
              style={[
                styles.headerContent,
                {
                  width: scaleWidth(40),
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                },
              ]}
            >
              {/* <Text style={[styles.textStyle, textStyle]}>{quanlitySet}</Text> */}
            </View>
            <View
              style={[
                styles.headerContent,
                {
                  width: scaleWidth(90),
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                },
              ]}
            >
              {discount > 0 ? (
                <Text style={styles.textStyle}>{`- $ ${formatMoney(
                  discount
                )}`}</Text>
              ) : null}
              {discountPercent > 0 ? (
                <Text style={styles.textStyle}>{`- $ ${formatMoney(
                  ((discountPercent * price) / 100) * quanlitySet
                )}`}</Text>
              ) : null}
            </View>
          </View>
        )}
      </>
    );
  };

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

  const renderItemReturnReceipt = () => {
    const quanlitySet = item?.returnQuantity ?? 1;
    const total = item?.returnPrice;
    const price = item?.returnPrice / quanlitySet;

    return (
      <View style={styles.content}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={[styles.textStyle, textStyle]}>
            {`${index + 1}. ${item?.productName ?? " "}`}
          </Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(55),
            },
          ]}
        >
          <Text style={[styles.textStyle, textStyle]}>
            {item?.saleQuantity}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: scaleWidth(85),
          }}
        >
          <Text
            style={[styles.textStyle, textStyle]}
          >{`$ ${item?.saslePrice}`}</Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(55),
            },
          ]}
        >
          <Text
            style={[styles.textStyle, { textAlign: "center" }, textStyle]}
          >{`${item?.returnQuantity} `}</Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: scaleWidth(85),
          }}
        >
          <Text
            style={[styles.textStyle, { textAlign: "center" }, textStyle]}
          >{`$ ${item?.returnPrice}`}</Text>
        </View>
      </View>
    );
  };

  switch (type) {
    default:
      return renderItemInvoice();
    case "SalonPos":
      return renderSalonItemInvoice();
    case "ReturnReceipt":
      return renderItemReturnReceipt();
  }
};

export const ItemHeaderReceipt = ({ type, textStyle }) => {
  const renderHeaderInvoice = () => {
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
          <Text
            style={[styles.headerStyle, textStyle, { textAlign: "left" }]}
          >{`DESCRIPTION`}</Text>
        </View>

        <View style={{ justifyContent: "center", width: scaleWidth(90) }}>
          <Text style={[styles.headerStyle, textStyle]}>{`PRICE`}</Text>
        </View>
        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(40),
            },
          ]}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`QTY`}</Text>
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

  const renderItemReturnHeaderReceipt = () => {
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
          <Text style={[styles.headerStyle, textStyle]}>{`Name`}</Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(55),
            },
          ]}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`Qty`}</Text>
        </View>

        <View style={{ justifyContent: "center", width: scaleWidth(85) }}>
          <Text style={[styles.headerStyle, textStyle]}>{`Total Price`}</Text>
        </View>

        <View
          style={[
            styles.headerContent,
            {
              width: scaleWidth(55),
            },
          ]}
        >
          <Text style={[styles.headerStyle, textStyle]}>{`Return Qty`}</Text>
        </View>

        <View style={{ justifyContent: "center", width: scaleWidth(85) }}>
          <Text style={[styles.headerStyle, textStyle]}>{`Return Total`}</Text>
        </View>
      </View>
    );
  };

  switch (type) {
    default:
      return renderHeaderInvoice();
    case "SalonPos":
      return renderSalonHeaderInvoice();
    case "ReturnReceipt":
      return renderItemReturnHeaderReceipt();
  }
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

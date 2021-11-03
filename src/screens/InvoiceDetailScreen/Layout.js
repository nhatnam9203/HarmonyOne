import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton, CustomerInfoView } from "@shared/components";
import { fonts, images, colors } from '@shared/themes';
import { guid, formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '@navigation/NavigationService';
import ViewShot from "react-native-view-shot";
import moment from "moment";


export const Layout = ({
  invoiceDetail,
  isDebitPayment,
  voidRefundInvoice,
  viewShotRef,
  shareInvoice,
  printInvoice,
}) => {

  const [t] = useTranslation();

  const items = [
    ...invoiceDetail?.basket?.extras?.map(item => ({ ...item, qty: 1, name: item?.extraName, key: item?.bookingExtraId + guid() })),
    ...invoiceDetail?.basket?.giftCards?.map(item => ({ ...item, qty: item?.quantity, name: item?.giftCardName, key: item?.bookingGiftCardId + guid() })),
    ...invoiceDetail?.basket?.products?.map(item => ({ ...item, qty: item?.quantity, name: item?.productName, key: item?.bookingProductId + guid() })),
    ...invoiceDetail?.basket?.services?.map(item => ({ ...item, qty: 1, name: item?.serviceName, key: item?.bookingServiceId + guid() })),
  ]

  const isVisibleButton = (!isDebitPayment && invoiceDetail?.status == "paid") ||
    (!isDebitPayment && invoiceDetail?.status == "complete")

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Invoice details')}
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        headerRightComponent={() =>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <View style={{ position: 'relative' }}>
              <IconButton
                onPress={printInvoice}
                icon={images.iconPrint}
                iconStyle={styles.icon}
                style={styles.button}
              />
              <IconButton
                onPress={shareInvoice}
                icon={images.iconShare}
                iconStyle={[styles.icon, { width: scaleWidth(19), height: scaleWidth(19) }]}
                style={[styles.button, { position: 'absolute', right: scaleWidth(45) }]}
              />
            </View>
          </View>
        }
      >
        <ViewShot style={{ flex : 1 }} ref={viewShotRef}>
          <KeyboardAwareScrollView style={styles.content}>
            <Text style={styles.invoiceNumber}>
              {`Invoice #${invoiceDetail?.code}`}
            </Text>
            <View style={[styles.row, { marginTop: scaleHeight(12) }]}>
              <View style={styles.circleStatus(invoiceDetail?.status)} />
              <Text style={styles.txtStatus(invoiceDetail?.status)}>
                {invoiceDetail?.status}
              </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(12) }]}>
              <Text style={[styles.text, { width: scaleWidth(80) }]}>Date/time:</Text>
              <Text style={[styles.text, { marginLeft: scaleWidth(16) }]}>
                {moment(invoiceDetail?.createdDate).format("MMM DD YYYY hh:mm A")}
              </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(12) }]}>
              <Text style={[styles.text, { width: scaleWidth(80) }]}>Staff</Text>
              <Text style={[styles.text, { marginLeft: scaleWidth(16) }]}>
                {invoiceDetail?.createdBy}
              </Text>
            </View>

            <View style={[styles.line, { marginTop: scaleHeight(16) }]} />
            <CustomerInfoView
              customerId={invoiceDetail?.user?.customerId}
              firstName={invoiceDetail?.user?.firstName}
              lastName={invoiceDetail?.user?.lastName}
              phoneNumber={invoiceDetail?.user?.phone}
            />
            <View style={styles.line} />

            <View style={[styles.row, { marginTop: scaleHeight(12) }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(150) }]}>
                Description
              </Text>

              <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(69) }]}>
                Price
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(69) }]}>
                Qty
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.BOLD, width: scaleWidth(55), textAlign: "right" }]}>
                Total
              </Text>
            </View>
            <View style={[styles.line, { marginTop: scaleHeight(12) }]} />
            {
              items.map(item => {
                const itemPrice = parseFloat(formatNumberFromCurrency(item?.price)) * parseInt(item?.qty);
                return (
                  <View key={item?.key} style={[styles.row, { marginTop: scaleHeight(12), alignItems : "flex-start" }]}>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(150) }]}>
                      {item?.name}
                    </Text>

                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(69) }]}>
                      $ {item?.price}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(69) }]}>
                      {item?.qty}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.BOLD, width: scaleWidth(55), textAlign: "right" }]}>
                      $ {formatMoney(itemPrice)}
                    </Text>
                  </View>
                )
              })
            }
            <Text style={styles.lineDashed} ellipsizeMode="clip" numberOfLines={1}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - - - - - - - - - - - - -
            </Text>

            <View style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                Subtotal
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.subTotal}
              </Text>
            </View>


            <View style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                Tax
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.tax}
              </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                Tip
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.tipAmount}
              </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                Discount
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.discount}
              </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                Total
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.BOLD }]}>
                $ {invoiceDetail?.total}
              </Text>
            </View>

            {
              invoiceDetail?.checkoutPayments && invoiceDetail?.checkoutPayments?.length > 0 &&
              <View style={[styles.line, { marginTop: scaleHeight(12) }]} />
            }
            {
              invoiceDetail?.checkoutPayments?.map((pay) => (
                <View
                  key={pay?.checkoutPaymentId + "checkoutPaymentId"}
                  style={[styles.row, { marginTop: scaleHeight(12), justifyContent: "space-between" }]}>
                  <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                    Entry method: {pay?.paymentMethod}
                  </Text>
                  <Text style={[styles.text, { fontFamily: fonts.MEDIUM, marginLeft: scaleWidth(16) }]}>
                    $ {pay?.amount}
                  </Text>
                </View>
              ))
            }
          </KeyboardAwareScrollView>
        </ViewShot>
      </SingleScreenLayout>
      {
        isVisibleButton &&
        <View style={styles.bottom}>
          <Button
            label={invoiceDetail?.status == "paid" ? "Refund" : "Void"}
            onPress={voidRefundInvoice}
            highlight={true}
            width={'100%'}
          />
        </View>
      }
    </View>
  );
};



const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccccc",
  },

  lineDashed: {
    color: colors.ocean_blue,
    marginTop: scaleHeight(12)
  },

  text: {
    fontSize: scaleFont(15),
    fontFamily: fonts.REGULAR,
    color: "#404040"
  },
  circleStatus: status => {

    let backgroundColor = "#404040";

    switch (status) {
      case "incomplete":
        backgroundColor = colors.ocean_blue
        break;
      case "pending":
        color = colors.ocean_blue
        break;
      case "complete":
        backgroundColor = "#19A9EC";
        break;
      case "paid":
        backgroundColor = "#4AD100";
        break;
      case "void":
        backgroundColor = "#CCCCCC";
        break;
      case "refund":
        backgroundColor = "#CCCCCC";
        break;


      default:
        break;
    }

    return {
      width: scaleWidth(12),
      height: scaleWidth(12),
      borderRadius: 3000,
      backgroundColor,
      marginRight: 5
    }
  },
  txtStatus: status => {
    let color = "#404040";

    switch (status) {
      case "incomplete":
        color = colors.ocean_blue
        break;
      case "pending":
        color = colors.ocean_blue
        break;
      case "complete":
        color = "#19A9EC";
        break;
      case "paid":
        color = "#4AD100";
        break;
      case "void":
        color = "#CCCCCC";
        break;
      case "refund":
        color = "#CCCCCC";
        break;


      default:
        break;
    }

    return {
      color,
      fontSize: scaleFont(14),
      fontFamily: fonts.REGULAR
    }
  },
  invoiceNumber: {
    fontSize: scaleFont(19),
    fontFamily: fonts.MEDIUM,
    color: colors.ocean_blue
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(15),
  },


  icon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    tintColor: "#333"
  },

  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: "center",
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },
});
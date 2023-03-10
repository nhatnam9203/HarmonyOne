import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import {
  Button,
  IconButton,
  CustomerInfoView,
  PopupProcessingCredit,
  PopupInvoice,
  DialogConfirm,
} from "@shared/components";
import { fonts, images, colors } from '@shared/themes';
import { guid, formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '@navigation/NavigationService';
import ViewShot from "react-native-view-shot";
import moment from "moment";
import _ from "lodash";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { translate } from "@localize";
import { translateManual } from "@shared/utils";

const switchMethodText = (method) => {

  switch (method) {
    case "other":
      return "Other - Check";
    case "cash":
      return "Cash";
    case "giftcard":
      return "Gift Card";
    case "credit_card":
      return "Credit Card";
    case "harmony":
      return "HarmonyPay";

    default:
      return method;
  }
}


export const Layout = ({
  inputTransactionId,
  invoiceDetail,
  isDebitPayment,
  voidRefundInvoice,
  viewShotRef,
  popupProcessingRef,
  popupConfirmPrintRef,
  invoiceRef,
  shareInvoice,
  printInvoice,
  cancelInvoicePrint,
  isDisabledButtonRefund,
  language
}) => {

  const [t] = useTranslation();

  const items = [
    ...invoiceDetail?.basket?.extras?.map(item => ({ ...item, qty: 1, name: item?.extraName, key: item?.bookingExtraId + guid() })),
    ...invoiceDetail?.basket?.giftCards?.map(item => ({ ...item, qty: item?.quantity, name: item?.name, key: item?.bookingGiftCardId + guid() })),
    ...invoiceDetail?.basket?.products?.map(item => ({ ...item, qty: item?.quantity, name: item?.productName, key: item?.bookingProductId + guid() })),
    ...invoiceDetail?.basket?.services?.map(item => ({ ...item, qty: 1, name: item?.serviceName, key: item?.bookingServiceId + guid() })),
  ]

  const isVisibleButton = (!isDebitPayment && invoiceDetail?.status == "paid") ||
    (!isDebitPayment && invoiceDetail?.status == "complete")

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Invoice details')}
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
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
        <ViewShot style={{ flex: 1 }} ref={viewShotRef}>
          <KeyboardAwareScrollView style={styles.content}>
            <Text style={styles.invoiceNumber}>
              {`Invoice #${invoiceDetail?.checkoutId}`}
            </Text>
            <View style={[styles.row]}>
              <View style={styles.circleStatus(invoiceDetail?.status)} />
              <Text style={styles.txtStatus(invoiceDetail?.status)}>
                {translateManual(language,invoiceDetail?.status)}
              </Text>
            </View>

            <View style={[styles.row]}>
              <Text style={[styles.text, { width: scaleWidth(80) }]}>{translate('Date/time')}:</Text>
              <Text style={[styles.text, { marginLeft: scaleWidth(16) }]}>
                {moment(invoiceDetail?.createdDate).format("MMM DD YYYY hh:mm A")}
              </Text>
            </View>

            <View style={[styles.row]}>
              <Text style={[styles.text, { width: scaleWidth(80) }]}>{translate('txtStaff')}</Text>
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

            <View style={[styles.row]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(150) }]}>
                {translate('Description')}
              </Text>

              <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(105) }]}>
                {translate('txtStaff')}
              </Text>

              <Text style={[styles.text, { fontFamily: fonts.BOLD, width: scaleWidth(74), textAlign: "right" }]}>
                {translate('txtTotal')}
              </Text>
            </View>
            <View style={[styles.line, { marginTop: scaleHeight(12) }]} />
            {
              items.map(item => {
                const itemPrice = parseFloat(formatNumberFromCurrency(item?.price)) * parseInt(item?.qty);
                return (
                  <View key={item?.key} style={[styles.row, { alignItems: "center" }]}>
                    <View style={{ width: scaleWidth(150) }}>
                      <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(125) }]}>
                        {item?.name}
                      </Text>
                    </View>

                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM, width: scaleWidth(105) }]}>
                      {item.staff?.displayName ?? ""}
                    </Text>
                    
                    <Text style={[styles.text, { fontFamily: fonts.BOLD, width: scaleWidth(88), zIndex: 99999, textAlign: "right" }]}>
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

            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                {translate('Subtotal')}
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.subTotal}
              </Text>
            </View>


              
              {
                formatNumberFromCurrency(invoiceDetail?.taxProductPercent) > 0 
                && formatNumberFromCurrency(invoiceDetail?.taxServicePercent) > 0 ?
               <>
                  <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      {translate('txtTax')}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                    $ {invoiceDetail?.tax}
                    </Text>
                  </View>
                  <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      {` - ${translate('Product')} ${translate('Tax')}: ${invoiceDetail?.taxProductPercent}%`}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      $ {invoiceDetail?.taxProductAmount}
                    </Text>
                  
                  </View>
                  <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      {` - ${translate('Service')} ${translate('Tax')}: ${invoiceDetail?.taxServicePercent}%`}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      $ {invoiceDetail?.taxServiceAmount}
                    </Text>
                 </View>
               </>
                :
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                    {
                      formatNumberFromCurrency(invoiceDetail?.taxProductPercent) > 0 
                      || formatNumberFromCurrency(invoiceDetail?.taxServicePercent) > 0
                      ? `Tax (${formatNumberFromCurrency(invoiceDetail?.taxProductPercent) || formatNumberFromCurrency(invoiceDetail?.taxServicePercent)} %)`
                      : "Tax"
                    }
                  </Text>
                  <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                    $ {invoiceDetail?.tax}
                  </Text>
                </View>
              }
              

            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                {translate('Tip')}
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.tipAmount}
              </Text>
            </View>

            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
              {translate('Discount')}
              </Text>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                $ {invoiceDetail?.discount}
              </Text>
            </View>
            {
              invoiceDetail?.checkoutPaymentFeeSum != 0 &&
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                  {translate('Non-Cash Adjustment')}
                </Text>
                <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                  $ {invoiceDetail?.checkoutPaymentFeeSum}
                </Text>
              </View>
            }
            {
              invoiceDetail?.checkoutPaymentCashDiscountSum != 0 &&
              
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                  {`${translate("Cash")} ${translate("Discount")}`}
                </Text>
                <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                  $ {invoiceDetail?.checkoutPaymentCashDiscountSum}
                </Text>
              </View>
            }
            
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                {translate('Total')}
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
                <>
                  <View
                    key={pay?.checkoutPaymentId + "checkoutPaymentId"}
                    style={[styles.row, { justifyContent: "space-between" }]}>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                      Entry method: {switchMethodText(pay?.paymentMethod)}
                    </Text>
                    <Text style={[styles.text, { fontFamily: fonts.MEDIUM, marginLeft: scaleWidth(16) }]}>
                      $ {pay?.amount}
                    </Text>
                   
                  </View>
                  {(pay.paymentMethod &&
                            pay.paymentMethod === "credit_card") ||
                          pay.paymentMethod === "debit_card" ? (
                            <View style={{ marginTop: scaleHeight(5) }}>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  pay?.paymentInformation?.type || ""
                                }: ***********${
                                  pay?.paymentInformation?.number || ""
                                }`}
                              </Text>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  pay?.paymentInformation?.sn
                                    ? `${translate("Terminal ID")}: ${pay?.paymentInformation?.sn}`
                                    : ""
                                }`}
                              </Text>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  pay?.paymentInformation?.refNum
                                    ? `${translate("Transaction")} #: ${pay?.paymentInformation?.refNum}`
                                    : ""
                                }`}
                              </Text>

                              {!!_.get(pay, "paymentInformation.signData") && (
                                <View style={styles.rowSignature}>
                                  <Text style={[styles.fontPrintStyle]}>
                                    {`    ${translate('Signature')}: `}
                                  </Text>
                                  <Image
                                    style={styles.signImage}
                                    source={{
                                      uri: `data:image/png;base64,${pay?.paymentInformation?.signData}`,
                                    }}
                                  />
                                </View>
                              )}
                              
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  pay?.paymentInformation?.name?.replace(
                                    /%20/g,
                                    " "
                                  ).replace(
                                    /%2f/g,
                                    " "
                                  ) || ""
                                }`}
                              </Text>
                            </View>
                          ) : null
                          }
                </>
              ))
            }

            {/* Barcode */}
            {!!invoiceDetail?.code && (
              <Barcode
                format="CODE128"
                value={`${invoiceDetail?.code}`}
                text={`${invoiceDetail?.code}`}
                height={40}
                style={{marginTop: scaleHeight(20)}}
              />
            )}
          </KeyboardAwareScrollView>
        </ViewShot>
      </SingleScreenLayout>


      <PopupProcessingCredit
        ref={popupProcessingRef}
        onConfirmYes={() => onCancelTransactionCredit()}
        transactionId={inputTransactionId}
      />

      <PopupInvoice
        ref={invoiceRef}
        cancelInvoicePrint={cancelInvoicePrint}
      />
      <DialogConfirm
        ref={popupConfirmPrintRef}
        title={translate('Confirmation')}
        titleContent={translate("Do you want to print receipt?")}
        onConfirmYes={printInvoice}
        onConfirmNo={() => NavigationService.back()}
        isCloseButton={false}
      />

      {
        isVisibleButton &&
        <View style={styles.bottom}>
          <Button
            label={invoiceDetail?.status == "paid" ? translate("Refund") : translate("Void")}
            onPress={voidRefundInvoice}
            highlight={true}
            width={'100%'}
            disabled={isDisabledButtonRefund}
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
    color: colors.ocean_blue,
    marginTop: scaleHeight(16),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(12)
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
    justifyContent: "center"
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },
  rowSignature: {
    flexDirection: "row",
    alignItems: "center",
  },
  fontPrintStyle: {
    color: "#000",
    fontSize: scaleFont(14),
    textAlign: "left",
  },
  signImage: {
    width: scaleWidth(100),
    height: scaleHeight(40),
    resizeMode: "contain",
  },
});

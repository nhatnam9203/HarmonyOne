import { Button } from "../Button";
import PrintManager from "@lib/PrintManager";
import {
  useAxiosMutation,
  useAxiosQuery,
  getGroupAppointmentById,
  getInvoiceDetail,
} from "@src/apis";
import { 
  getFullName, 
  statusSuccess,
  formatNumberFromCurrency,
  formatWithMoment,
  getInfoFromModelNameOfPrinter,
  getPaymentString,
  getStaffNameForInvoice,
  PaymentTerminalType,
  stringIsEmptyOrWhiteSpaces,
  formatMoney,
  doPrintClover,
 } from "@shared/utils";
 import {
  requestPrintDejavoo,
} from "@utils";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Dash from "react-native-dash";
import { StarPRNT } from "react-native-star-prnt";
import { captureRef, releaseCapture } from "react-native-view-shot";
import { useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import { ItemHeaderReceipt, ItemReceipt } from "./ItemReceipt";
import { TotalView } from "./TotalView";
import { layouts } from "@shared/themes";
import _ from 'lodash';

export const PopupInvoice = React.forwardRef(
  ({ cancelInvoicePrint }, ref) => {
    const viewShotRef = React.useRef(null);
    const tempHeight = scaleHeight(400);

    /**
  |--------------------------------------------------
  | REDUX variables
  |--------------------------------------------------
  */
    const profile = useSelector((state) => state.merchant.merchantDetail);
    const profileStaffLogin = useSelector(
      (state) => state.auth.staff
    );
    const printerList = useSelector((state) => state.hardware.printerList);
    const printerSelect = useSelector((state) => state.hardware.printerSelect);

    const {
      hardware: { 
        dejavooMachineInfo,
       },
    } = useSelector(state => state);
  
    /**
  |--------------------------------------------------
  | STATE variables
  |--------------------------------------------------
  */
    const [visible, setVisible] = React.useState(false);

    const [groupAppointment, setGroupAppointment] = React.useState(null);
    const [invoiceDetail, setInvoiceDetail] = React.useState(null);
    const [printTempt, setPrintTempt] = React.useState(false);
    const [isSignature, setIsSignature] = React.useState(true);
    const [isProcessingPrint, setIsProcessingPrint] = React.useState(false);
    const [isShare, setIsShare] = React.useState(false);
    const [paymentMachineType, setPaymentMachineType] = React.useState(null);
    const [appointmentId, setAppointmentId] = React.useState("");
    const [checkoutId, setCheckoutId] = React.useState("");

    /**
  |--------------------------------------------------
  | CALL API
  |--------------------------------------------------
  */
  const [, fetchGroupApointmentById] = useAxiosQuery({
    ...getGroupAppointmentById(appointmentId),
    queryId: "fetchGroupApointmentById_invoicePrint",
    enabled: false,
    isStopLoading: true,
    isLoadingDefault: false,
    isFetching: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        setGroupAppointment(data);
      }
    }
  });

  const [, fetchInvoiceDetailData] = useAxiosQuery({
    ...getInvoiceDetail(checkoutId),
    queryId: "fetchInvoiceDetailData_invoicePrint",
    enabled: false,
    isStopLoading: true,
    isLoadingDefault: false,
    isFetching: false,
    onSuccess: (data, response) => {
      setInvoiceDetail(data);
    },
  });

    /**
  |--------------------------------------------------
  | FUNCTION
  |--------------------------------------------------
  */

    const reset = async () => {
      setGroupAppointment(null);
      setInvoiceDetail(null);
      setIsShare(false);
      setPrintTempt(false);
      setIsSignature(true);
    };

    const getBasketOnline = (appointments) => {
      const arrayProductBuy = [];
      const arryaServicesBuy = [];
      const arrayExtrasBuy = [];
      const arrayGiftCards = [];
      const promotionNotes = [];

      appointments.forEach((appointment) => {
        // ------ Push Service -------
        appointment.services?.forEach((service) => {
          arryaServicesBuy.push({
            type: "Service",
            data: {
              name: service?.serviceName || "",
              price: service?.price || "",
            },
            staff: service?.staff || false,
            note: service?.note || "",
          });
        });

        // ------ Push Product -------
        appointment.products?.forEach((product) => {
          arrayProductBuy.push({
            type: "Product",
            data: {
              name: product?.productName || "",
              price: product?.price || "",
              value: product?.value,
              discount: product?.discount,
              discountPercent: product?.discountPercent,
            },
            quanlitySet: product?.quantity || "",
          });
        });

        // ------ Push Product -------
        appointment.extras?.forEach((extra) => {
          arrayExtrasBuy.push({
            type: "Extra",
            data: {
              name: extra?.extraName || "",
              price: extra?.price || "",
            },
          });
        });

        // ------ Push Gift Card -------
        appointment.giftCards?.forEach((gift) => {
          arrayGiftCards.push({
            type: "GiftCards",
            data: {
              name: gift?.name || "Gift Card",
              price: gift?.price || "",
            },
            quanlitySet: gift?.quantity || "",
          });
        });
      });

      return arryaServicesBuy.concat(
        arrayExtrasBuy,
        arrayProductBuy,
        arrayGiftCards
      );
    };

    const getNonCashFee = () => {
      if (groupAppointment) {
        return groupAppointment?.checkoutPaymentFeeSum;
      } else if (invoiceDetail) {
        return invoiceDetail?.checkoutPaymentFeeSum;
      }
      return 0;
    };

    const getCashDiscount = () => {
      if (groupAppointment) {
        return groupAppointment?.checkoutPaymentCashDiscountSum;
      } else if (invoiceDetail) {
        return invoiceDetail?.checkoutPaymentCashDiscountSum;
      }
      return 0;
    };

    const getSubTotal = () => {
      if (groupAppointment) return groupAppointment?.subTotal;
      return 0;
    };
    const getDiscount = () => {
      if (groupAppointment) return groupAppointment?.discount;
      return 0;
    };
    const getTipAmount = () => {
      if (groupAppointment) return groupAppointment?.tipAmount;
      return 0;
    };
    const getTax = () => {
      if (groupAppointment) return groupAppointment?.tax;
      return 0;
    };
    const getTotal = () => {
      if (groupAppointment) return groupAppointment?.total;
      return 0;
    };

    const getCheckoutPaymentMethods = () => {
      if (invoiceDetail) {
        return invoiceDetail?.checkoutPayments?.slice(0).reverse() || [];
      }

      return groupAppointment?.paymentMethods?.length > 0
        ? groupAppointment?.paymentMethods
        : groupAppointment?.checkoutPayments;
    };

    const getPromotionNotes = (appointments) => {
      let promotionNotes = [];
      appointments?.forEach((appointment) => {
        const note = appointment?.promotionNotes?.note || "";
        if (note) {
          promotionNotes.push(note);
        }
      });

      return promotionNotes.join(",");
    };

    const getFooterReceipt = () => {
      if (
        (invoiceDetail?.status === "paid" ||
          groupAppointment?.status === "paid") &&
        !isSignature
      ) {
        return "Customer's Receipt";
      }
      return "Merchant's Receipt";
    };

    const getInvoiceName = () => {
      let invoiceName = " ";

      if (groupAppointment) {
        invoiceName = getStaffNameForInvoice(
          profileStaffLogin,
          getBasketOnline(groupAppointment.appointments)
        );
      }

      if (!invoiceName && invoiceDetail?.user?.userId) {
        invoiceName = getFullName(invoiceDetail?.user);
      }
      if (!invoiceName) {
        invoiceName = profileStaffLogin?.displayName;
      }

      return invoiceName;
    };

    const getCustomerName = () => {
      if (groupAppointment && groupAppointment.appointments?.length > 0) {
        const { firstName = " ", lastName = " " } =
          groupAppointment.appointments[0] || {};
        return `${firstName} ${lastName}`;
      }
      return " ";
    };

    const onCancel = (temp) => {
      if (
        cancelInvoicePrint &&
        typeof cancelInvoicePrint === "function" &&
        !isShare
      ) {
        cancelInvoicePrint(temp ?? printTempt);
      }
      setVisible(false);
      reset();
    };

    const renderLoadingProcessingPrint = () => {
      if (isProcessingPrint) {
        return (
          <View
            style={{
              height: scaleHeight(490),
              width: scaleWidth(290),
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              rightL: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0764B0" />
          </View>
        );
      }
      return null;
    };

    const doPrintAgain = async () => {
      setIsSignature(false);
      // setTimeout(() => {
      //   onPrintProcess();
      // }, 1000);
    };

    React.useEffect(() => {
      if (!isSignature && !isShare && !printTempt) {
        onPrintProcess();
      }
    }, [isSignature]);

    const onPrintProcess = async () => {
      const { portName, emulation, widthPaper } = getInfoFromModelNameOfPrinter(
        printerList,
        printerSelect
      );

      try {
        await setIsProcessingPrint(true);
        let option = {}
        if (!printerSelect) {
          if (paymentMachineType === "Clover") {
            option = { result: "base64" }
          } 
        }
        
        const imageUri = await captureRef(viewShotRef, option);
        await setIsProcessingPrint(false);

        if (imageUri) {
          if (portName) {
            let commands = [];
            commands.push({ appendLineFeed: 0 });
            commands.push({
              appendBitmap: imageUri,
              width: parseFloat(widthPaper),
              bothScale: true,
              diffusion: true,
              alignment: "Center",
            });
            commands.push({
              appendCutPaper: StarPRNT.CutPaperAction.FullCutWithFeed,
            });

            await PrintManager.getInstance().print(
              emulation,
              commands,
              portName
            );

            releaseCapture(imageUri);
            
          } else {
            if (paymentMachineType == "Clover") {
              if (Platform.OS === "ios") {
                doPrintClover(imageUri);
              }
            } else if (paymentMachineType == "Dejavoo") {
        
                const content = getContentXmlReceipt()
                const params = {
                  dejavooMachineInfo,
                  content,
                };
                requestPrintDejavoo(params);
            }
          }

          if (!printTempt && isSignature) {
            Alert.alert(
              "Would you like to print  customer's receipt?",
              "",
              [
                {
                  text: "Cancel",
                  onPress: onCancel,
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: doPrintAgain,
                },
              ],
              { cancelable: false }
            );
          } else {
            onCancel();
          }
        }
      } catch (error) {
        alert(`Printer error with ${error}`);
        onCancel();
      }
    };

    const onShareProcess = async () => {
      try {
        await setIsProcessingPrint(true);
        const imageUri = await captureRef(viewShotRef, {});
        await setIsProcessingPrint(false);
        await setVisible(false);

        if (Platform.OS === "ios") {
          setTimeout(() => {
            RNFetchBlob.ios.previewDocument(imageUri);
          }, 500);
        } else {
          await Share.open({
            url: `file://${imageUri}`,
          });
        }
      } catch (error) {
        await setVisible(false);
      }
    };

    //---- Functions for Print text Receipt by Dejavoo  ----//

    const getArrayBeakLineString = (text, maxWidth) => {
      let arrayString = [];
      let words = text.split(' ');
      let textLine = ""
      let oldTextLine = ""
      for(let i = 0; i < words.length; i++) {
        oldTextLine = textLine;
        textLine = textLine + words[i] + " ";
        if(textLine.length > maxWidth) {
          textLine = oldTextLine
          arrayString.push(textLine)
          textLine = ""

          if(i == words.length - 1) {
            arrayString.push(words[i])
          }
        } else if(i == words.length - 1) {
          arrayString.push(textLine)
        }
      }

      return arrayString
    }

    const getCenterStringArrayXml = (text) => {
      const arrayString = getArrayBeakLineString(text, 24);
      if(!arrayString) return ""
      let result = ""
      for (let i=0; i < arrayString.length; i++) {
        result = result + `<t><c>${arrayString[i]}</c></t>`
      }
      return result
    } 

    const getInvoiceItemsXml = () => {
      
      if (!groupAppointment) return ""
      
      let stringItems = ""

      let invoiceItems = 
      getBasketOnline(groupAppointment?.appointments)?.map(
        (item, index) => {
          const price = item.data && item.data.price ? item.data.price : 0;
          const quanlitySet = item.quanlitySet ? item.quanlitySet : 1;
          const total = formatMoney(price * quanlitySet);
          const note = item.note ? item.note : "";
          const staffName = item.staff?.displayName ?? "";

          const noteXml = note ? `<t>(Note: ${note})</t>` : ``
          const staffXml = staffName ? `<t>(${staffName})</t>` : ``

          stringItems = stringItems + `<t>${
            _.padEnd(_.truncate(`${index + 1}.${_.get(item, 'data.name')}`, {
              'length': 15
            }), 15, '.')}${_.padStart(`$${total}`, 9, ".")}</t>
          ${noteXml}
          ${staffXml}`

        }
      ) 
      return stringItems
    }

    const getContentXmlReceipt = () => {

      const invoiceNo = checkoutId ? 
                      `Invoice No: ${checkoutId ?? " "}`
                      :`` 
      let entryMethodXml = ""
      if(!printTempt) {
        getCheckoutPaymentMethods()?.map((data, index) => {
          entryMethodXml = entryMethodXml +
                          `<br/><t>- Entry method:</t>
                          <t>${_.padEnd(`${getPaymentString(
                            data?.paymentMethod || ""
                          )}`, 15, ".")}${_.padStart(
                            `$${Number(formatNumberFromCurrency(data?.amount || "0")).toFixed(2)}`,
                            9,
                            "."
                          )}</t>
                          ${(data.paymentMethod &&
                             data.paymentMethod === "credit_card") ||
                             data.paymentMethod === "debit_card" ? 
                             `
                              <t>${
                                data?.paymentInformation?.type || ""
                              }: ***********${
                                data?.paymentInformation?.number || ""
                              }</t>
                              ${data?.paymentInformation?.name ?
                                `<t>${data?.paymentInformation?.name?.replace(
                                  /%20/g,
                                  " "
                                ).replace(
                                  /%2f/g,
                                  " "
                                )}</t>`: ""
                              }
                              ${
                                data?.paymentInformation?.sn
                                ? `<t>Terminal ID: ${data?.paymentInformation?.sn}</t>`
                                : ""
                              }
                              ${
                                data?.paymentInformation?.refNum
                                  ? `<t>Transaction #: ${data?.paymentInformation?.refNum}</t>`
                                  : ""
                              }
                              ${
                                !stringIsEmptyOrWhiteSpaces(
                                  _.get(data, "paymentInformation.signData")
                                ) ? `<t>Signature: </t>
                                    <img>${data?.paymentInformation?.signData}</img>` : ""
                              }
                              ` 
                              : ``
                             
                            }`
        })

      }

      let xmlContent = `<b>${getCenterStringArrayXml(profile?.businessName || " ")}</b>
      ${getCenterStringArrayXml(profile?.addressFull || " ")}
      <t><c>${`Tel : ${profile?.phone || " "}`}</c></t>
      <t><c>${profile?.webLink}</c></t>
      <t><b><c>${`${
        invoiceDetail?.status &&
        invoiceDetail?.status !== "paid" &&
        invoiceDetail?.status !== "pending" &&
        invoiceDetail?.status !== "incomplete" &&
        invoiceDetail?.status !== "complete"
          ? `${invoiceDetail?.status}`.toUpperCase()
          : "SALE"
      }`}</c></b></t>
      <t><c>${`( ${formatWithMoment(
                        new Date(),
                        "MM/DD/YYYY hh:mm A"
                      )} )`}</c></t>
      <t><c>${"-".repeat(24)}</c></t>
      <t>Customer: ${getCustomerName()}</t>
      <t>Invoice Date: ${formatWithMoment(
                              invoiceDetail?.createdDate,
                              "MM/DD/YYYY hh:mm A"
                            )}</t>
      <t>${invoiceNo}</t>
      <t><c>${"-".repeat(24)}</c></t>
      <t><b><c>DESCRIPTION.......TOTAL</c></b></t>
      <t><c>${"-".repeat(24)}</c></t>
      ${getInvoiceItemsXml()}
      <t><c>${"-".repeat(24)}</c></t>
      <t/>
      <t>${_.padEnd("Subtotal: ", 15, ".")}${_.padStart(`$${getSubTotal()}`, 9, ".")}</t>
      <t>${_.padEnd("Discount: ", 15, ".")}${_.padStart(`$${getDiscount()}`, 9, ".")}</t>
      <t>${_.padEnd("Tip: ", 15, ".")}${_.padStart(`$${getTipAmount()}`, 9, ".")}</t>
      <t>${_.padEnd("Tax: ", 15, ".")}${_.padStart(`$${getTax()}`, 9, ".")}</t>
      ${
        getNonCashFee() != 0 &&
        `<t>${_.padEnd("Non-Cash Fee:", 15, ".")}${_.padStart(
          `$${getNonCashFee()}`,
          9,
          "."
        )}</t>`
      }
      ${
        getCashDiscount() != 0 &&
        `<t>${_.padEnd("Cash Discount: ", 15, ".")}${_.padStart(
          `$${getCashDiscount()}`,
          9,
          "."
        )}</t>`
      }
      ${!printTempt ? 
     `<t><b><c>${_.padEnd("Total: ", 15, ".")}${_.padStart(`$${getTotal()}`, 9, ".")}</c></b></t>
     <br/><br/>
     ${entryMethodXml}
     ${isSignature ? `<br/><br/><br/><t>Signature: _____________</t><br/><br/>`: ``}
      `: ``}
      ${printTempt ? `<t>Tip :</t>
                      <t>Total :</t>
                      <br/><br/>
                      <t>Signature: _____________</t>
                      <br/>` 

                    : ``}
      ${profile?.receiptFooter 
        ? `<t>${profile?.receiptFooter}</t>` 
        : `<t><c>Thank you!</c></t>
          <t><c>Please come again</c></t>`}
      ${
        !!getPromotionNotes(groupAppointment?.appointments) 
        ? `<t>Discount note: ${getPromotionNotes(
                              groupAppointment?.appointments
                            )}</t>` 
        : ``
      }
      <t>${_.pad(getFooterReceipt(), 24, '*')}</t>
      <br/><br/><br/><br/><br/><br/>
      `
     return xmlContent                  
    }

    /**
  |--------------------------------------------------
  | HOOKS
  |--------------------------------------------------
  */

    React.useImperativeHandle(ref, () => ({
      showAppointmentReceipt: async ({
        appointmentId,
        checkoutId,
        isPrintTempt = false,
        isShareMode = false,
        machineType,
        title = "TICKET",
      }) => {
        reset();

        if (!appointmentId) {
          return;
        }

        if (!isShareMode) {
          const { portName } = getInfoFromModelNameOfPrinter(
            printerList,
            printerSelect
          );

          if (!portName
            && machineType == PaymentTerminalType.Pax) {
            onCancel(isPrintTempt);
            alert("Please connect to your printer!");
            return;
          }
        }

        setPrintTempt(isPrintTempt);
        setIsShare(isShareMode);
        setPaymentMachineType(machineType);
        setAppointmentId(appointmentId);
        setCheckoutId(checkoutId);

        // call api get info
        const body = await getGroupAppointmentById(appointmentId)
        fetchGroupApointmentById(body.params);
  
        if (checkoutId) {
          const bodyInvoice = await getInvoiceDetail(checkoutId)
          fetchInvoiceDetailData(bodyInvoice.params);
        }

        // show modal
        await setVisible(true);
      },
    }));

    return (
      <Modal visible={visible} onRequestClose={() => {}} transparent={true}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={{ height: tempHeight }}>
              <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={true}
                keyboardShouldPersistTaps="always"
              >
                <View
                  ref={viewShotRef}
                  style={[
                    {
                      backgroundColor:
                        isShare ||
                        paymentMachineType == PaymentTerminalType.Clover
                        || paymentMachineType == PaymentTerminalType.Dejavoo
                          ? "#fff"
                          : "#0000",
                    },
                    styles.receiptContent,
                  ]}
                >
                  {/* ------------- Store Name -----------*/}
                  <Text style={styles.fontPrintTitleStyle}>
                    {profile?.businessName || " "}
                  </Text>

                  {/* ------------- Store Address ----------- */}
                  <Text
                    numberOfLines={2}
                    style={styles.fontPrintSubTitleStyle}
                  >
                    {profile?.addressFull || " "}
                  </Text>

                  {/* ------------- Phone Address ----------- */}
                  <Text style={styles.fontPrintSubTitleStyle}>
                    {`Tel : ${profile?.phone || " "}`}
                  </Text>

                  {/* ------------- Company Website ----------- */}
                  {!!profile?.webLink && (
                    <Text style={styles.fontPrintSubTitleStyle}>
                      {profile?.webLink}
                    </Text>
                  )}

                  {/* ------------- SALE/VOID/REFUND  ----------- */}
                  <Text style={styles.fontPrintTitleStyle}>
                    {`${
                          invoiceDetail?.status &&
                          invoiceDetail?.status !== "paid" &&
                          invoiceDetail?.status !== "pending" &&
                          invoiceDetail?.status !== "incomplete" &&
                          invoiceDetail?.status !== "complete"
                            ? `${invoiceDetail?.status}`.toUpperCase()
                            : "SALE"
                        }`}
                  </Text>
                  <Text
                    style={[
                      styles.fontPrintStyle,
                      { fontSize: scaleFont(18), textAlign: "center" },
                    ]}
                  >
                    {`( ${formatWithMoment(
                      new Date(),
                      "MM/DD/YYYY hh:mm A"
                    )} )`}
                  </Text>
                  {/* ------------- Dot Border  ----------- */}
                  <Dash
                    style={{ width: "100%", height: 1 }}
                    dashGap={5}
                    dashLength={8}
                    dashThickness={1}
                    style={{
                      marginVertical: scaleHeight(10),
                      marginHorizontal: scaleWidth(4),
                    }}
                  />

                  {/* ------------- Staff ----------- */}
                  <View style={styles.rowContent}>
                    <View
                      style={{
                        width: scaleWidth(90),
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        style={[
                          styles.fontPrintSubTitleStyle,
                          { textAlign: "left" },
                        ]}
                      >{`Customer`}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[styles.fontPrintStyle]}
                      >{`: ${getCustomerName()}`}</Text>
                    </View>
                  </View>
                  

                  {/* ------------- Invoice Date ----------- */}
                  {invoiceDetail && (
                    <View style={styles.rowContent}>
                      <View style={{ width: scaleWidth(90) }}>
                        <Text
                          style={[
                            styles.fontPrintSubTitleStyle,
                            { textAlign: "left" },
                          ]}
                        >{`Invoice Date`}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.fontPrintStyle]}>
                          {`: ${formatWithMoment(
                            invoiceDetail?.createdDate,
                            "MM/DD/YYYY hh:mm A"
                          )}`}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* ------------- Invoice No ----------- */}
                  {checkoutId && (
                    <View style={styles.rowContent}>
                      <View style={{ width: scaleWidth(90) }}>
                        <Text
                          style={[
                            styles.fontPrintSubTitleStyle,
                            { textAlign: "left" },
                          ]}
                        >{`Invoice No`}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.fontPrintStyle]}>
                          {`: ${checkoutId ?? " "}`}
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* ------------- Dot Border  ----------- */}
                  <Dash
                    style={{ height: 1 }}
                    dashGap={5}
                    dashLength={8}
                    dashThickness={1}
                    style={{
                      marginVertical: scaleHeight(10),
                      marginHorizontal: scaleWidth(4),
                    }}
                  />

                  {/* ------------- Header  ----------- */}
                  <ItemHeaderReceipt
                    type={profile.type}
                    textStyle={styles.fontPrintSubTitleStyle}
                  />

                  {/* ------------- Dot Border  ----------- */}
                  <Dash
                    style={{ width: "100%", height: 1 }}
                    dashGap={5}
                    dashLength={8}
                    dashThickness={1}
                    style={{
                      marginVertical: scaleHeight(10),
                      marginHorizontal: scaleWidth(4),
                    }}
                  />

                  {/* ------------- Item Invoice   ----------- */}
                  {groupAppointment &&
                    getBasketOnline(groupAppointment?.appointments)?.map(
                      (receiptItem, index) => (
                        <ItemReceipt
                          key={index}
                          item={receiptItem}
                          index={index}
                          textStyle={[styles.fontPrintStyle]}
                        />
                      )
                    )}
                  {/* ------------- Line end item invoice   ----------- */}
                  <View
                    style={{
                      height: 2,
                      backgroundColor: "#000",
                      marginVertical: scaleHeight(10),
                    }}
                  />
                  {/* ------------- SubTotal   ----------- */}
                  <TotalView
                    title={"Subtotal"}
                    value={getSubTotal()}
                    styleTextTitle={styles.fontPrintSubTitleStyle}
                    styleTextValue={styles.fontPrintStyle}
                  />
                  <TotalView
                    title={"Discount"}
                    value={getDiscount()}
                    styleTextTitle={styles.fontPrintSubTitleStyle}
                    styleTextValue={styles.fontPrintStyle}
                  />
                  <TotalView
                    title={"Tip"}
                    value={getTipAmount()}
                    styleTextTitle={styles.fontPrintSubTitleStyle}
                    styleTextValue={styles.fontPrintStyle}
                  />
                  <TotalView
                    title={"Tax"}
                    value={getTax()}
                    styleTextTitle={styles.fontPrintSubTitleStyle}
                    styleTextValue={styles.fontPrintStyle}
                  />
                  {!printTempt && (
                    <>
                      {getNonCashFee() != 0 && (
                        <TotalView
                          title={"Non-Cash Adjustment"}
                          value={getNonCashFee()}
                          styleTextTitle={styles.fontPrintSubTitleStyle}
                          styleTextValue={styles.fontPrintStyle}
                        />
                      )}
                      {getCashDiscount() != 0 && (
                        <TotalView
                          title={"Cash Discount"}
                          value={getCashDiscount()}
                          styleTextTitle={styles.fontPrintSubTitleStyle}
                          styleTextValue={styles.fontPrintStyle}
                        />
                      )}
                      <TotalView
                        title={"Total"}
                        value={getTotal()}
                        styleTextTitle={[styles.fontPrintSubTitleStyle, {fontSize: scaleFont(20)}]}
                        styleTextValue={[styles.fontPrintStyle, {fontSize: scaleFont(20)}]}
                      />
                    </>
                    
                  )}
                  {/* ------------- Enter Tip   ----------- */}
                  {printTempt && (
                    <View
                      style={{
                        height: scaleHeight(25),
                        flexDirection: "row",
                        marginBottom: scaleHeight(12),
                      }}
                    >
                      <View
                        style={{
                          width: scaleWidth(70),
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles.fontPrintStyle,
                            { fontSize: scaleFont(20), fontWeight: "600" },
                          ]}
                        >
                          {"Tip :"}
                        </Text>
                      </View>
                      <View style={{ width: scaleWidth(50) }} />
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: "#000",
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  )}

                  {/* ------------- Enter Total   ----------- */}
                  {printTempt && (
                    <View
                      style={{
                        height: scaleHeight(25),
                        flexDirection: "row",
                        marginBottom: scaleHeight(12),
                      }}
                    >
                      <View
                        style={{
                          width: scaleWidth(70),
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles.fontPrintStyle,
                            { fontSize: scaleFont(20), fontWeight: "600" },
                          ]}
                        >
                          {"Total :"}
                        </Text>
                      </View>
                      <View style={{ width: scaleWidth(50) }} />
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: "#000",
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  )}

                  {/* ------------- Entry Method   ----------- */}
                  {!printTempt && (
                    <View>
                      {getCheckoutPaymentMethods()?.map((data, index) => (
                        <View
                          key={index}
                          style={{ marginBottom: scaleHeight(4), marginTop: scaleHeight(10) }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.fontPrintStyle]}>
                              {`- Entry method: ${getPaymentString(
                                data?.paymentMethod || ""
                              )}`}
                            </Text>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "flex-end",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[
                                  styles.fontPrintStyle,
                                ]}
                              >
                                {`$${Number(
                                  formatNumberFromCurrency(data?.amount || "0")
                                ).toFixed(2)}`}
                              </Text>
                            </View>
                          </View>
                          {(data.paymentMethod &&
                            data.paymentMethod === "credit_card") ||
                          data.paymentMethod === "debit_card" ? (
                            <View style={{ marginTop: scaleHeight(5) }}>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  data?.paymentInformation?.type || ""
                                }: ***********${
                                  data?.paymentInformation?.number || ""
                                }`}
                              </Text>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  data?.paymentInformation?.name?.replace(
                                    /%20/g,
                                    " "
                                  ).replace(
                                    /%2f/g,
                                    " "
                                  ) || ""
                                }`}
                              </Text>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  data?.paymentInformation?.sn
                                    ? `Terminal ID: ${data?.paymentInformation?.sn}`
                                    : ""
                                }`}
                              </Text>
                              <Text style={[styles.fontPrintStyle]}>
                                {`    ${
                                  data?.paymentInformation?.refNum
                                    ? `Transaction #: ${data?.paymentInformation?.refNum}`
                                    : ""
                                }`}
                              </Text>

                              {!stringIsEmptyOrWhiteSpaces(
                                _.get(data, "paymentInformation.signData")
                              ) && (
                                <View style={styles.rowSignature}>
                                  <Text style={[styles.fontPrintStyle]}>
                                    {"    Signature: "}
                                  </Text>
                                  <Image
                                    style={styles.signImage}
                                    source={{
                                      uri: `data:image/png;base64,${data?.paymentInformation?.signData}`,
                                    }}
                                  />
                                </View>
                              )}
                            </View>
                          ) : null
                          }
                        </View>
                      ))}
                    </View>
                  )}

                  {isSignature && !printTempt && (
                    <View
                      style={{
                        height: scaleHeight(30),
                        flexDirection: "row",
                        marginTop: scaleHeight(15),
                      }}
                    >
                      <View
                        style={{
                          width: scaleWidth(70),
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles.fontPrintStyle,
                          ]}
                        >
                          {"Signature:"}
                        </Text>
                      </View>
                      <View style={{ width: scaleWidth(50) }} />
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: "#000",
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  )}

                  {printTempt && (
                    <View
                      style={{
                        height: scaleHeight(15),
                        flexDirection: "row",
                        marginTop: scaleHeight(15),
                      }}
                    >
                      <View
                        style={{
                          width: scaleWidth(70),
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles.fontPrintStyle,
                          ]}
                        >
                          {"Signature:"}
                        </Text>
                      </View>
                      <View style={{ width: scaleWidth(50) }} />
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: "#000",
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  )}

                  <View style={styles.marginVertical} />

                  <View style={styles.marginVertical} />
                  {profile?.receiptFooter ? (
                    <Text
                      style={[
                        styles.fontPrintSubTitleStyle,
                        { alignSelf: "center", textAlign: "center" },
                      ]}
                    >
                      {` ${profile?.receiptFooter}`}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.fontPrintSubTitleStyle,
                        { alignSelf: "center", textAlign: "center" },
                      ]}
                    >
                      {`Thank you!\nPlease come again`}
                    </Text>
                  )}

                  {/* ------------- Promotions Note   ----------- */}
                  {!!getPromotionNotes(groupAppointment?.appointments) && (
                    <Text style={styles.fontPrintStyle}>
                      {`Discount note: `}
                      <Text style={{ fontWeight: "600" }}>
                        {` ${getPromotionNotes(
                          groupAppointment?.appointments
                        )}`}
                      </Text>
                    </Text>
                  )}

                  {/* ------------- This is not a bill   ----------- */}
                  <Text
                    style={[
                      styles.fontPrintStyle,
                      {
                        alignSelf: "center",
                      },
                    ]}
                  >
                    {`********* ${getFooterReceipt()} *********`}
                  </Text>
                </View>
              </ScrollView>
            </View>

            {/* ------ Button ----- */}
            <View style={styles.buttonContent}>
              <Button
                backgroundColor="#F1F1F1"
                label={"CANCEL"}
                textColor="#404040"
                onPress={onCancel}
                styleText={{fontSize: scaleFont(13)}}
              />
              <View style={{ width: scaleWidth(35) }} />
              <Button
                backgroundColor="#0764B0"
                label={isShare ? "SHARE" : "PRINT"}
                textColor="#fff"
                onPress={isShare ? onShareProcess : onPrintProcess}
                styleText={{fontSize: scaleFont(13)}}
              />
            </View>

            {/* ------ Loading ----- */}
            {renderLoadingProcessingPrint()}
          </View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  content: {
    backgroundColor: "#fff",
    width: scaleWidth(290),
  },

  textStyle: {
    color: "#000",
    fontSize: scaleFont(18),
    textAlign: "left",
    fontWeight: "300",
  },

  titleStyle: {
    color: "#000",
    fontSize: scaleFont(24),
    fontWeight: "500",
    marginTop: scaleHeight(8),
    textAlign: "center",
  },

  footerTextStyle: {
    color: "#000",
    fontSize: scaleFont(18),
    fontWeight: "600",
    alignSelf: "center",
  },

  receiptContent: {
    paddingHorizontal: scaleWidth(10),
  },

  rowContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },

  buttonContent: {
    height: scaleHeight(50),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: scaleHeight(20),
    marginTop: scaleHeight(20),
  },

  marginVertical: { height: scaleHeight(10) },

  rowSignature: {
    flexDirection: "row",
    alignItems: "center",
  },
  signImage: {
    width: scaleWidth(100),
    height: scaleHeight(40),
    resizeMode: "contain",
  },
  fontPrintStyle: {
    color: "#000",
    fontSize: scaleFont(14),
    fontWeight: "600",
    textAlign: "left",
  },
  fontPrintTitleStyle: {
    color: "#000",
    fontSize: scaleFont(15),
    textAlign: "center",
    fontWeight: "700",
  },
  fontPrintSubTitleStyle: {
    color: "#000",
    fontSize: scaleFont(14),
    fontWeight: "500",
    textAlign: "center",
  },
});

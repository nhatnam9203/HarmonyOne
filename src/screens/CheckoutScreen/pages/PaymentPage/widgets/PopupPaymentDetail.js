import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { Button, IconButton } from "@shared/components";
import { images } from "@shared/themes/resources";
import { app } from "@redux/slices";
import { formatMoney, formatNumberFromCurrency, slop, guid } from "@shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Modal from "react-native-modal";


export const PopupPaymentDetail = React.forwardRef(
    ({
        paymentDetail,
    }, ref) => {
        const [t] = useTranslation();
        const dispatch = useDispatch();

        const [open, setOpen] = React.useState(false);


        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
            },

            hide: () => {
                setOpen(false);
            }
        }));

        const close = () => {
            setOpen(false);
        }

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={() => { }}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="zoomIn"
                animationOut="zoomOut"
                statusBarTranslucent
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{`Payment details`}</Text>
                    </View>
                    <View style={{ width: "100%", backgroundColor: "white", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Invoice No:</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}># {paymentDetail?.checkoutPaymentResponse?.invoiceNo}</Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Customer name:</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>
                                {paymentDetail?.checkoutPaymentResponse?.customerName}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Phone number:</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>
                                {paymentDetail?.checkoutPaymentResponse?.phone}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Status:</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>
                                {paymentDetail?.checkoutPaymentResponse?.status}
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Grand total</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: "#000" }]}>
                                {`$ ${formatMoney(paymentDetail?.checkoutPaymentResponse?.grandTotal)}`}
                            </Text>
                        </View>

                        <View style={styles.horizontalLine} />

                        {
                            paymentDetail?.checkoutPaymentResponse?.paidAmounts &&
                            paymentDetail?.checkoutPaymentResponse?.paidAmounts?.length > 0 &&
                            paymentDetail?.checkoutPaymentResponse?.paidAmounts?.map((obj) => (
                                <View key={guid()} style={[styles.row]}>
                                    <Text style={[styles.txt]}>{`Paid (${obj.paymentMethod})`}</Text>
                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: "#000" }]}>{`$ ${formatMoney(obj.amount)}`}</Text>
                                </View>
                            ))
                        }

                        <View style={[styles.row]}>
                            <Text style={[styles.txt, { color: "red" }]}>Amount Due: </Text>
                            <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: "red" }]}>
                                {`$ ${formatMoney(paymentDetail?.checkoutPaymentResponse?.dueAmount)}`}
                            </Text>
                        </View>

                        <View style={styles.bottomStyle}>
                            <TouchableOpacity
                                onPress={close}
                                style={styles.buttonSubmit}
                            >

                                <Text style={styles.textSubmit}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    horizontalLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#dddddd",
        marginTop: scaleHeight(20)
    },
    txt: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: scaleHeight(17),
        paddingHorizontal: scaleWidth(20),
        position: 'relative'
    },
    line: {
        width: "100%",
        height: 5,
        backgroundColor: "#cccccc"
    },
    buttonSubmit: {
        height: scaleHeight(36),
        width: scaleWidth(120),
        backgroundColor: colors.ocean_blue,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textSubmit: {
        fontFamily: fonts.MEDIUM,
        color: colors.white,
        fontSize: scaleFont(17)
    },
    header: {
        width: "100%",
        height: scaleHeight(55),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1366AE",
        borderTopLeftRadius: scaleHeight(5),
        borderTopRightRadius: scaleHeight(5),
    },
    textHeader: {
        color: "white",
        fontSize: scaleFont(20),
        fontFamily: fonts.BOLD
    },
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(350),
        borderRadius: scaleHeight(5),
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        position: 'relative',
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        marginTop: scaleHeight(20),
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scaleHeight(28),
        marginBottom: scaleHeight(16),
    },
});

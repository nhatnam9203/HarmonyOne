import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";

export const IncomeByPaymentMethod = ({
    settlementWaiting,
    translate
}) => {

    return (
        <>
            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>{translate("Payment")}</Text>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>{translate("Amount")}</Text>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>Harmony {translate("account")}</Text>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.paymentByHarmony || "0.00"}</Text>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>{translate("Credit Card")}</Text>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.paymentByCreditCard || "0.00"}</Text>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>{translate("Cash")}</Text>
                <View style={{ flexDirection: "row" }}>
                    {
                        settlementWaiting?.paymentByCashStatistic !== settlementWaiting?.paymentByCash &&
                        <Text style={[styles.txtIncome, { fontFamily: fonts.LIGHT, textDecorationLine: 'line-through', marginRight: scaleWidth(16) }]}>
                            $ {settlementWaiting?.paymentByCashStatistic || "0.00"}
                        </Text>
                    }
                    <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.paymentByCash || "0.00"}</Text>
                </View>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>{translate("Gift card")}</Text>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.paymentByGiftcard || "0.00"}</Text>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>{translate("Other")}</Text>
                <View style={{ flexDirection: "row" }}>
                    {
                        settlementWaiting?.otherPaymentStatistic !== settlementWaiting?.otherPayment &&
                        <Text style={[styles.txtIncome, { fontFamily: fonts.LIGHT, textDecorationLine: 'line-through', marginRight: scaleWidth(16) }]}>
                            $ {settlementWaiting?.otherPaymentStatistic || "0.00"}
                        </Text>
                    }
                    <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.otherPayment || "0.00"}</Text>
                </View>
            </View>

            <View style={styles.rowIncone}>
                <Text style={[styles.txtIncome, { fontFamily: fonts.REGULAR }]}>{translate("Discount")}</Text>
                <Text style={[styles.txtIncome, { fontFamily: fonts.MEDIUM }]}>$ {settlementWaiting?.discount || "0.00"}</Text>
            </View>

            <View style={[styles.rowBetween, { backgroundColor: "#DCF7FF", alignItems: 'center' }]}>
                <Text style={[styles.title, { fontFamily: fonts.MEDIUM }]}>
                    {translate("Total")}
                </Text>
                <Text style={[styles.title, { fontFamily: fonts.BOLD, padding: scaleWidth(16), color: "#4CD964" }]}>
                    $ {settlementWaiting?.total}
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    rowIncone: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: scaleWidth(16),
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
    },
    txtIncome: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },
    rowBetween: {
        flexDirection: "row", justifyContent: "space-between",
    },
    title: {
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM,
        color: "#404040",
        marginLeft: scaleWidth(16)
    },

});

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts, images } from '@shared/themes';

export const TotalViewPaid = ({
    duration = "0",
    price = "0.00",
    tax,
    discount,
    subTotal = "0.00",
    tipAmount,
    giftCard
}) => {
    const [t] = useTranslation();

    const getDuration = (duration) => {
        return duration + ' min';
    };

    const getPrice = (price) => {
        return formatMoneyWithUnit(price);
    };

    return (
        <View style={styles.totalContent}>
            <View style={styles.totalInfoContent}>
                <Text style={styles.textTotal}>
                    {t('Subtotal')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {subTotal}
                </Text>
            </View>
            <View style={styles.totalInfoContent}>
                <Text style={styles.textTotal}>
                    {t('Tax')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {tax}
                </Text>
            </View>
            <View style={styles.totalInfoContent}>
                <Text style={styles.textTotal}>
                    {t('Discount')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {discount}
                </Text>
            </View>
            <View style={styles.totalInfoContent}>
                <Text style={styles.textTotal}>
                    {t('Tip')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {tipAmount}
                </Text>
            </View>
            <View style={[styles.totalInfoContent]}>
                <Text style={styles.textTotal}>
                    {t('Gift card')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {giftCard}
                </Text>
            </View>
            <View style={[styles.totalInfoContent, { marginBottom: scaleHeight(8) }]}>
                <Text style={[styles.textTotal, { fontFamily: fonts.BOLD }]}>
                    {t('Total')}
                </Text>
                <Text style={[styles.textTotalPrice, { fontFamily: fonts.BOLD, color: "#72CE3D" }]}>
                    {price}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    totalContent: {
        flex: 0,
        marginTop : scaleHeight(12)
    },

    totalInfoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: scaleHeight(30),
    },

    textTotalInfo: {
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(17),
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.36,
        textAlign: 'left',
        color: colors.bluegrey,
    },

    textTotal: {
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(17),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: "#404040",
    },

    textTotalPrice: {
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(17),
        letterSpacing: 0,
        textAlign: 'right',
        color: "#404040",
    },

});

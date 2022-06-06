import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts, images } from '@shared/themes';
import { translate } from "@localize";

export const TotalView = ({
    duration = "0",
    price = "0.00",
    tax,
    discount,
    subTotal = "0.00",
    isShowSubtotal = false
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
                <Text style={styles.textTotalInfo}>
                    {translate('totalDuration')}
                </Text>
                <Text style={styles.textTotalInfo}>
                    {duration}
                </Text>
            </View>
            {
                !isShowSubtotal && <View style={styles.totalInfoContent}>
                    <Text style={styles.textTotal}>
                        {translate('txtTotal')}
                    </Text>
                    <Text style={styles.textTotalPrice}>
                        {price}
                    </Text>
                </View>
            }
            {
                isShowSubtotal &&
                <View style={styles.totalInfoContent}>
                    <Text style={styles.textTotal}>
                        {translate('subTotal')}
                    </Text>
                    <Text style={styles.textTotalPrice}>
                        {subTotal}
                    </Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({

    totalContent: {
        flex: 0,
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
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.bluegrey,
    },

    textTotalPrice: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(17),
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.frog_green,
    },

});

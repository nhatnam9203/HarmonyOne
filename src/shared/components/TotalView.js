import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts, images } from '@shared/themes';

export const TotalView = ({
    duration = "0",
    price = "0.00"
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
                    {t('Total duration')}
                </Text>
                <Text style={styles.textTotalInfo}>
                    {duration}
                </Text>
            </View>
            <View style={styles.totalInfoContent}>
                <Text style={styles.textTotal}>
                    {t('Total')}
                </Text>
                <Text style={styles.textTotalPrice}>
                    {price}
                </Text>
            </View>
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
        fontSize: scaleFont(15),
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.36,
        textAlign: 'left',
        color: colors.bluegrey,
    },

    textTotal: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(15),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.bluegrey,
    },

    textTotalPrice: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(15),
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.frog_green,
    },

});

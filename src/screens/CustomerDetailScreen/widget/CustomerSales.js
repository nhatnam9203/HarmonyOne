import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { dateToFormat } from '@shared/utils';

const CustomerSales = ({
    totalSales,
    lastVisitSale,
    lastVisitDate,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sales</Text>
            </View>
            <View style={styles.content}>
                <View style={[styles.contentItem, { borderRightWidth: 1, borderRightColor: "#dddddd" }]}>
                    <Text style={styles.price}>{`$ ${totalSales}`}</Text>
                    <Text style={styles.totalSales}>Total sales</Text>
                </View>
                <View style={styles.contentItem}>
                    <Text style={styles.price}>{`$ ${lastVisitSale}`}</Text>
                    <Text style={styles.totalSales}>Last visit sales</Text>
                    <Text style={[styles.totalSales, { fontFamily: fonts.LIGHT }]}>
                        { lastVisitDate ? `${dateToFormat(lastVisitDate,"MM/DD/YYYY")}` : ""}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.34,

        elevation: 5,
        marginTop: scaleHeight(16)
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom: scaleHeight(16),
        padding: scaleWidth(16),
    },
    headerText: {
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
    },
    content: {
        flexDirection: 'row'
    },
    contentItem: {
        width: '50%',
        padding: scaleWidth(16),
    },
    price: {
        fontSize: scaleFont(20),
        fontFamily: fonts.BOLD,
        color: colors.greyish_brown_40,
    },
    totalSales: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.black,
        marginTop: scaleHeight(12)
    }
});

export default CustomerSales;

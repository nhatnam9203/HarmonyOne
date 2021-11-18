import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors, images } from '@shared/themes';
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";

export const ItemList = ({
    services = [],
    extras = [],
    products = [],
    giftCards = [],
}) => {

    const [t] = useTranslation();

    const renderItem = (item) => {
        const priceShow = parseFloat(formatNumberFromCurrency(item?.price)) * parseInt(item?.qty);
        return (
            <View key={item?.key?.toString()} style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.price}>
                        {`$ ${formatMoney(priceShow)}`}
                    </Text>
                </View>
                {(item?.productId || item?.giftCardId )&& <Text style={styles.qty}>{`${item?.qty} item`}</Text>}
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Services</Text>
            {
                services.map((obj => ({ ...obj, qty: 1, name: obj?.serviceName, key: "service" + obj?.bookingServiceId }))).map((item) => (
                    renderItem(item)
                ))
            }
            <Text style={styles.title}>Extras</Text>
            {
                extras.map((obj => ({ ...obj, qty: 1, name: obj?.extraName, key: "extra" + obj?.bookingExtraId }))).map((item) => (
                    renderItem(item)
                ))
            }
            <Text style={styles.title}>Products</Text>
            {
                products.map((obj => ({ ...obj, qty: obj?.quantity, name: obj?.productName, key: "product" + obj?.bookingProductId }))).map((item) => (
                    renderItem(item)
                ))
            }
            <Text style={styles.title}>Gift cards</Text>
            {
                giftCards.map((obj => ({ ...obj, qty: obj?.quantity, name: obj?.name, key: "giftCard" + obj?.giftCardId }))).map((item) => (
                    renderItem(item)
                ))
            }
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
        position: 'relative',
        paddingHorizontal: scaleWidth(16),
    },
    icon: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        tintColor: "#333"
    },
    button: {
        height: '100%',
        alignItems: 'center'
    },
    bottom: {
        paddingHorizontal: scaleWidth(16),
        paddingBottom: scaleHeight(8)
    },

    customerInfoView: {
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee"
    },
    title: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.BOLD,
        marginLeft: scaleWidth(16),
        marginTop: scaleHeight(24)

    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.MEDIUM,
        width: scaleWidth(260),
    },
    price: {
        fontSize: scaleFont(16),
        color: "#000000",
        fontFamily: fonts.MEDIUM
    },
    qty: {
        color: "#7C9AB9",
        fontSize: scaleFont(12),
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(8)
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
        paddingBottom: scaleHeight(12),
        marginTop: scaleHeight(24),
        paddingHorizontal: scaleWidth(16),
    },
    flatList: {
        maxHeight: scaleHeight(270),
        paddingHorizontal: scaleWidth(16),
    }
});

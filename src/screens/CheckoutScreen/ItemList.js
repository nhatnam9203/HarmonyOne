import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors, images } from '@shared/themes';

export const ItemList = ({
    services = [],
    extras = [],
    products = [],
    giftCards = [],
}) => {

    const [t] = useTranslation();

    let itemList = [
        ...services.map((obj => ({ ...obj, qty: 1, name: obj?.serviceName, key: "service" + obj?.bookingServiceId }))),
        ...extras.map((obj => ({ ...obj, qty: 1, name: obj?.extraName, key: "extra" + obj?.bookingExtraId }))),
        ...products.map((obj => ({ ...obj, qty: obj?.quantity, name: obj?.productName, key: "product" + obj?.bookingProductId }))),
        ...giftCards.map((obj => ({ ...obj, qty: obj?.quantity, name: obj?.giftCardName, key: "giftCard" + obj?.giftCardId }))),
    ];


    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.price}>
                        {`$ ${item?.price}`}
                    </Text>
                </View>
                <Text style={styles.qty}>{`${item?.qty} item`}</Text>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Items</Text>
            <FlatList
                data={itemList}
                keyExtractor={(item) => item?.key?.toString()}
                renderItem={({ item }) => renderItem(item)}
                style={styles.flatList}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginTop: scaleHeight(16),
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
        width: scaleWidth(290),
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
        marginTop: scaleHeight(24)
    },
    flatList: {
        maxHeight: scaleHeight(270),
        paddingHorizontal: scaleWidth(16),
    }
});

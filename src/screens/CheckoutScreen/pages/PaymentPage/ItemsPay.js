import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, CustomInput, InputText, Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";

const methodPays = [
    {
        title: "Harmony pay",
        icon: images.harmonyPay,
        method: "harmony"
    },
    {
        title: "Cash",
        icon: images.cashPay,
        method: "cash"
    },
    {
        title: "Credit Card",
        icon: images.creditCardPay,
        method: "credit_card"
    },
    {
        title: "Others - Check",
        icon: images.otherPay,
        method : "other"
    },
    {
        title: "Gift Card",
        icon: images.giftCardPay,
        method: "giftcard"
    },
]

export const ItemsPay = ({
    methodPay,
    onChangeMethodPay = () => { }
}) => {
    return (
        <View style={styles.container}>
            {
                methodPays.map(item => (
                    <Pressable
                        key={item?.title}
                        style={[
                            styles.item,
                            { backgroundColor: methodPay?.title == item.title ? "#0764B0" : "white" }
                        ]}
                        onPress={() => onChangeMethodPay(item)}
                    >
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={[
                                styles.iconPay,
                                { tintColor: methodPay?.title == item.title ? "white" : "#7A98BB" }
                            ]}
                        />
                        <Text style={[styles.title, { color: methodPay?.title == item.title ? "white" : "#7A98BB" }]}>
                            {item.title}
                        </Text>
                    </Pressable>
                ))
            }
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: scaleHeight(24),
        justifyContent: "space-between"
    },
    item: {
        width: scaleWidth((375 - 32) / 2 - 8),
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#00000029",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleHeight(8),
        marginBottom: scaleHeight(16)
    },
    iconPay: {
        width: scaleWidth(32),
        height: scaleWidth(32)
    },
    title: {
        fontSize: scaleFont(11),
        fontFamily: fonts.REGULAR,
        color: "#7A98BB",
        marginTop: scaleHeight(8)
    }
});

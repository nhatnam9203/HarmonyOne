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
        icon: images.harmonyPay
    },
    {
        title: "Cash",
        icon: images.cashPay
    },
    {
        title: "Credit Card",
        icon: images.creditCardPay
    },
    {
        title: "Giftcard",
        icon: images.giftCardPay
    },
    {
        title: "Others - Check",
        icon: images.otherPay
    }
]

export const ItemsPay = ({
    methodPay,
    onChangeMethodPay = () => { }
}) => {
    return (
        <View style={styles.container}>
            {
                methodPays.map(method => (
                    <Pressable
                        key={method?.title}
                        style={[
                            styles.item,
                            { backgroundColor: methodPay == method.title ? "#0764B0" : "white" }
                        ]}
                        onPress={() => onChangeMethodPay(method?.title)}
                    >
                        <Image
                            source={method.icon}
                            resizeMode='contain'
                            style={[
                                styles.iconPay,
                                { tintColor: methodPay == method.title ? "white" : "#7A98BB" }
                            ]}
                        />
                        <Text style={[styles.title, { color: methodPay == method.title ? "white" : "#7A98BB" }]}>
                            {method.title}
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

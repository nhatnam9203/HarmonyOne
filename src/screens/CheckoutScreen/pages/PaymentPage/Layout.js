import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, CustomInput, InputText, Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { ItemsPay } from "./ItemsPay";

export const Layout = ({
    back,
    appointmentDetail,
    methodPay,
    onChangeMethodPay
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('Check out')}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <View style={styles.content}>
                    <Text style={styles.txtTotal}>Total</Text>

                    <View style={styles.wrapPrice}>
                        <Text style={styles.priceTotal}>{`$ ${appointmentDetail?.total}`}</Text>
                    </View>

                    <Text style={styles.txtSelectPayment}>
                        Select payment method
                    </Text>

                    <ItemsPay 
                        methodPay={methodPay}
                        onChangeMethodPay={onChangeMethodPay}
                    />
                </View>

                <View style={styles.bottom}>
                    <Button
                        label="Charge"
                        onPress={() => { }}
                        highlight={true}
                        width={'100%'}
                        disabled={methodPay == "" || !methodPay}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    txtTotal: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.BOLD,
        textAlign: "center"
    },
    content: {
        flex: 1,
        padding: scaleWidth(16),
    },
    buttonClose: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        tintColor: "#000000"
    },
    button: {
        height: '100%',
        alignItems: 'center'
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },
    wrapPrice: {
        width: "100%",
        paddingVertical: scaleHeight(10),
        borderWidth: 1,
        borderColor: "#cccccc",
        justifyContent: "center",
        alignItems: "center",
        marginTop: scaleHeight(16)
    },
    priceTotal: {
        fontSize: scaleFont(19),
        color: "#4AD100",
        fontFamily: fonts.BOLD,
        textAlign: "center"
    },
    txtSelectPayment: {
        textAlign: "center",
        fontSize: scaleFont(15),
        color: "#404040",
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20)
    }
});

import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { Button } from "@shared/components";
import { images } from "@shared/themes/resources";
import { fonts, colors } from "@shared/themes";
import NavigationService from '@navigation/NavigationService';


export const Layout = ({
    onSubmit,
}) => {

    const [t] = useTranslation();

    return (
        <ImageBackground resizeMode="stretch" source={images.background} style={styles.container}>

            <View style={styles.content}>
                {/* <TouchableOpacity onPress={()=>NavigationService.back()} style={styles.btnBack}>
                    <Image
                        source={images.iconBack}
                        style={[styles.iconSize]}
                        resizeMode="cover"
                    />
                </TouchableOpacity> */}
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                <View style={{ marginVertical: scaleHeight(80), alignItems: "center" }}>
                    <Text style={styles.txtTrryApp}>
                        Thank for submitting your application!
                    </Text>
                    <Text style={[styles.txtTrryApp, { marginTop: scaleHeight(12) }]}>
                        One of our agents will contact you within the next business day.
                    </Text>
                </View>

                <View style={styles.bottom}>
                    <Button
                        label="FINISH"
                        onPress={onSubmit}
                        highlight={true}
                        width={'100%'}
                        styleButton={{ backgroundColor: "#4CD964", borderWidth: 0 }}
                        styleText={{ fontWeight: "bold", color: "#fff" }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({

    txtTrryApp: {
        fontSize: scaleFont(16),
        fontFamily: fonts.BOLD,
        color: "white",
        marginTop: 8,
        textAlign: "center"
    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        paddingTop: scaleHeight(70),
        alignItems: "center",
        paddingHorizontal: scaleWidth(16)
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },
    logo: {
        width: scaleWidth(180),
        height: scaleHeight(112),
    },

    iconSize: {
        width: scaleWidth(24),
        height: scaleHeight(24),
    },

    btnBack : {
        position : "absolute",
        top : scaleHeight(55),
        left : scaleWidth(16),
    }

});

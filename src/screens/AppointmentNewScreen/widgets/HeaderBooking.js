import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { IconButton } from "@shared/components";
import { images, colors, fonts } from "@shared/themes";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

const HeaderBooking = ({
    title = "Select service",
    step = "1",
    onPressBack = null,
    renderRight = null,
}) => {
    const dispatch = useDispatch();

    const insets = useSafeAreaInsets();

    const { bookAppointment: { isQuickCheckout } } = useSelector(state => state);

    const onGoBack = () => {
        if (onPressBack) onPressBack();
        else NavigationService.back();
    }

    const close = () => {
        NavigationService.navigate(screenNames.AppointmentScreen);
        dispatch(bookAppointment.resetBooking());
    }

    const steps = isQuickCheckout ? "3" : "4";

    return (
        <ImageBackground
            source={images.imageHeaderBg}
            style={{ width: '100%', paddingBottom: scaleHeight(10) }}
            blurRadius={7}
        >
            <View
                source={images.imageHeaderBg}
                style={[styles.headContent,]}
            >
                <View style={styles.headerLeftContent}>
                    <IconButton
                        icon={images.iconBack}
                        iconStyle={[styles.iconSize, { tintColor: colors.white }]}
                        onPress={onGoBack} style={styles.button}
                    />
                </View>

                <View style={styles.headerCenterContent}>
                    <Text style={[styles.headTitle, { color: colors.white }]}>
                        {isQuickCheckout ? translate('Check Out') : translate('txtNewAppointment')}
                    </Text>
                </View>

                <View style={styles.headerRightContent}>
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={[styles.iconSize, { tintColor: colors.white }]}
                        onPress={close} style={styles.button}
                    />
                </View>
            </View>
            <Text style={styles.txtStep}>
                {`Step ${step} of ${steps}`}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: scaleWidth(16) }}>
                <Text style={styles.title}>
                    {`${title}`}
                </Text>
                {renderRight && renderRight()}
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    buttonContent: {
        height: scaleHeight(84),
        backgroundColor: colors.WHITE,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },

    headContent: {
        width: '100%',
        backgroundColor: "transparent",
        shadowColor: '#383434',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 5,
        // paddingBottom: scaleHeight(4),
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(10),
    },

    headTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        textAlign: 'center',
        color: colors.black,
    },

    headerLeftContent: { flex: 0 },

    headerRightContent: {
        flex: 0,
    },

    headerCenterContent: {
        flex: 1,
        paddingTop: scaleHeight(48)
    },

    iconSize: {
        width: scaleWidth(27),
        height: scaleHeight(27),
    },

    button: {
        width: scaleWidth(35),
        paddingTop: scaleHeight(48)
    },
    txtStep: {
        fontSize: scaleFont(13),
        color: colors.white,
        fontFamily: fonts.REGULAR,
        marginBottom: scaleHeight(5),
        marginLeft: scaleWidth(16),
        marginTop: scaleHeight(12),
    },
    title: {
        fontSize: scaleFont(16),
        color: colors.white,
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(16)
    },
});


export default HeaderBooking;
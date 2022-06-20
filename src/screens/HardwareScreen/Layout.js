import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import NavigationService from '@navigation/NavigationService';
import {
    PaymentTerminalType,
} from "@shared/utils";

import { translate } from "@localize";

export const Layout = ({
    onPressBox,
    deleteHardware,
    dejavooMachineInfo,
    paymentMachineType,
    printerSelect,
    isSetup,
    tempTitle,
}) => {


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Hardwares')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => onPressBox('PaymentTerminal')}
                        style={styles.box} >

                        <View style={styles.containerIconBox} >
                            <Image source={images.paymentHardware} style={{
                                width: scaleWidth(25),
                                height: scaleHeight(35)
                            }} />
                        </View>
                        <View style={styles.containerTextBox} >
                            <Text style={styles.textBox} >
                                {translate('Payment terminal')}
                            </Text>
                            <Text style={[styles.textBox, { fontWeight: 'normal', fontSize: scaleFont(13), marginTop: scaleHeight(10) }]} >
                                {tempTitle !== "No Device" ? tempTitle : translate(tempTitle)}
                            </Text>
                        </View>

                        {
                            isSetup ? <IconButton onPress={() => deleteHardware()} style={styles.buttonDelete} >
                                <Image source={images.deleteIconBanner}
                                    style={{ width: scaleWidth(10), height: scaleHeight(10), }}
                                />
                            </IconButton> : null
                        }

                    </TouchableOpacity>

                    {/* ------------- Print ----------- */}
                    <TouchableOpacity
                        onPress={() => onPressBox('Print')}
                        style={[styles.box]} >

                        <View style={styles.containerIconBox} >
                            <Image source={images.printHardware} style={{
                                width: scaleWidth(28),
                                height: scaleHeight(35),
                            }} />
                        </View>
                        <View style={styles.containerTextBox} >
                            <Text style={styles.textBox} >
                                {translate('Receipt printer')}
                            </Text>
                            <Text style={[styles.textBox, { fontWeight: 'normal', fontSize: scaleFont(13), marginTop: scaleHeight(10) }]} >
                                {`${printerSelect === "" ? translate("No Device") : printerSelect}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
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

    content: {
        flex: 1,
        paddingTop: scaleHeight(16),
        alignItems: 'center',
        backgroundColor: "#fafafa"
    },
    buttonDelete: {
        width: scaleWidth(20),
        height: scaleHeight(20),
        position: "absolute",
        top: 5,
        right: 5,
        borderRadius: scaleHeight(10),
        justifyContent: "center",
        alignItems: "center",
    },

    box: {
        flexDirection: 'row',
        width: '90%',
        height: scaleHeight(80),
        backgroundColor: '#fff',
        borderRadius: scaleHeight(10),
        ...Platform.select({
            ios: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
            },

            android: {
                elevation: 2,
            },
        }),
        marginTop: scaleHeight(15),
        alignItems: 'center',

    },
    containerIconBox: {
        paddingLeft: scaleWidth(14),
        paddingRight: scaleWidth(16),
        justifyContent: 'center'
    },
    containerTextBox: {
        // paddingTop: scaleHeight(16),
    },
    textBox: {
        fontSize: scaleFont(15),
        color: '#0764B0',
        fontFamily: fonts.BOLD
    }
});

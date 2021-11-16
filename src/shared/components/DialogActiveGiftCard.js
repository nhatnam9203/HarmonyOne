import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { Button, IconButton } from "@shared/components";
import { images } from "@shared/themes/resources";
import { checkGiftCard, useAxiosQuery } from "@src/apis";
import { axios } from '@shared/services/axiosClient';
import { app } from "@redux/slices";
import { formatMoney, formatNumberFromCurrency, slop } from "@shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import { GiftCardScanner } from "./GiftCardScanner";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import Modal from "react-native-modal";


export const DialogActiveGiftCard = React.forwardRef(
    ({
        onConfirmYes = () => { },
        title = "",
        titleContent = "",
        onModalHide = () => { },
        onSuccess = () => { },
    }, ref) => {
        const [t] = useTranslation();
        const dispatch = useDispatch();

        const [open, setOpen] = React.useState(false);
        const [isLoading, setLoading] = React.useState(false);
        const [serialNumber, setSerialNumber] = React.useState("");
        const [titlePage, setTitlePage] = React.useState("Active Gift Card");
        const [isScanning, setScanning] = React.useState(false);

        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
                setSerialNumber("");
                setScanning(false);
                setTitlePage("Active Gift Card");
            },
            hide: () => {
                setOpen(false);
            }
        }));

        { /************************************* GỌI API CHECK SERIAL NUMBER *************************************/ }
        const checkSerialNumber = async () => {
            try {
                if (!isEmpty(serialNumber)) {
                    setLoading(true);
                    const params = {
                        url: `giftcard/serialNumber/${serialNumber}?isActive=${false}`,
                        method: "GET",
                    }
                    const response = await axios(params);
                    if (response?.data?.codeNumber == 400) {
                        Alert.alert(response?.data?.message);
                    } else {
                        onSuccess(response?.data?.data, serialNumber)
                    }
                }
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }

        const openScanBarcode = () => {
            setScanning(true);
            setTitlePage("Scan Your Code");
        }

        const onReadBarcode = (result) => {
            if (!isEmpty(result)) {
                setSerialNumber(result);
            }
            setScanning(false);
        }

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="zoomIn"
                animationOut="zoomOut"
                statusBarTranslucent
            >
                <KeyboardAwareScrollView
                    pointerEvents={isLoading ? "none" : "auto"}
                    contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <View pointerEvents={isLoading ? "none" : "auto"} style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.textHeader}>{titlePage}</Text>
                            <IconButton
                                icon={images.iconClose}
                                style={styles.buttonClose}
                                iconStyle={styles.iconButtonClose}
                                onPress={hideModal}
                            />
                        </View>

                        {!isScanning && <Text style={styles.txtTitle}>
                            {title}
                        </Text>}
                        {
                            isScanning ?
                                <View style={{ width: scaleWidth(340), height: scaleWidth(350), justifyContent: "center", alignItems: "center" }}>
                                    <GiftCardScanner onReadBarcode={onReadBarcode} />
                                </View> :
                                <>
                                    <View style={styles.containerInput}>
                                        <TextInput
                                            style={styles.textInput}
                                            value={serialNumber}
                                            onChangeText={text => setSerialNumber(text)}
                                            placeholderTextColor="#cccccc"
                                            placeholder="Your gift card"
                                        />

                                        <TouchableOpacity onPress={openScanBarcode} hitSlop={slop(20)} style={styles.buttonScancode}>
                                            <Image
                                                source={images.scancode}
                                                resizeMode='contain'
                                                style={styles.iconScancode}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.bottomStyle}>
                                        <TouchableOpacity
                                            onPress={checkSerialNumber}
                                            style={styles.buttonSubmit}
                                        >
                                            {
                                                isLoading ?
                                                    <ActivityIndicator size='small' color='white' /> :
                                                    <Text style={styles.textSubmit}>Add card</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    buttonScancode: {
        height: scaleHeight(50),
        width: scaleWidth(42),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        borderWidth: 2,
        borderColor: "#dddddd",
        borderLeftWidth: 0,
    },
    iconScancode: {
        height: scaleHeight(25),
        width: scaleWidth(25),
    },
    rowAmountDue: {
        borderBottomWidth: 1, borderBottomColor: "#dddddd", paddingBottom: scaleHeight(16)
    },
    rowAmount: {
        borderBottomWidth: 1, borderBottomColor: "#dddddd", paddingBottom: scaleHeight(16), justifyContent: "flex-start"
    },
    txt: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: scaleHeight(17),
        paddingHorizontal: scaleWidth(20),
        position: 'relative'
    },
    line: {
        width: "100%",
        height: 5,
        backgroundColor: "#cccccc"
    },
    buttonSubmit: {
        height: scaleHeight(40),
        width: scaleWidth(120),
        backgroundColor: colors.ocean_blue,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textSubmit: {
        fontFamily: fonts.MEDIUM,
        color: colors.white,
        fontSize: scaleFont(16)
    },
    header: {
        width: "100%",
        height: scaleHeight(55),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1366AE",
        borderTopLeftRadius: scaleHeight(5),
        borderTopRightRadius: scaleHeight(5),
    },
    textHeader: {
        color: "white",
        fontSize: scaleFont(20),
        fontFamily: fonts.BOLD
    },
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(350),
        borderRadius: scaleHeight(5),
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        position: 'relative',
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        marginTop: scaleHeight(20),
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
    },
    inputPrice: {
        width: scaleWidth(135),
        height: scaleHeight(35),
        borderWidth: 2,
        fontSize: scaleFont(17),
        fontFamily: fonts.BOLD,
        color: "#404040",
        borderColor: "#f0dfdf",
        marginTop: scaleHeight(12),
        paddingHorizontal: scaleWidth(7),
        textAlign: "right",
        position: 'absolute',
        right: scaleWidth(16),
    },
    containerInput: {
        width: scaleWidth(300),
        height: scaleHeight(50),
        marginTop: scaleHeight(12),
        flexDirection: "row"
    },
    textInput: {
        flex: 1,
        borderWidth: 2,
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM,
        borderColor: "#f0dfdf",
        paddingHorizontal: scaleWidth(16),
        textAlign: "center"
    },

    buttonClose: {
        width: scaleWidth(28),
        height: scaleWidth(28),
        borderRadius: scaleWidth(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginRight: scaleWidth(10),
        position: 'absolute',
        right: scaleWidth(0),
        top: scaleHeight(12),
    },

    iconButtonClose: {
        width: scaleWidth(25),
        height: scaleHeight(25),
        tintColor: colors.ocean_blue,
    },

    titleContent: {
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20),
        fontSize: scaleFont(15),
        marginHorizontal: scaleWidth(16),
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
    },

    buttonPay: {
        height: scaleHeight(36),
        width: scaleWidth(130),
        backgroundColor: colors.ocean_blue,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(16),
    },
    line: {
        height: scaleHeight(48),
        width: scaleWidth(2),
        backgroundColor: "#dddddd"
    }
});

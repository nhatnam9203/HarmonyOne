import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { Button, IconButton } from "@shared/components";
import { images } from "@shared/themes/resources";
import { checkGiftCard, useAxiosQuery } from "@src/apis";
import { axios } from '@shared/services/axiosClient';
import { app } from "@redux/slices";
import { formatMoney, formatNumberFromCurrency } from "@shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import Modal from "react-native-modal";


export const DialogActiveGiftCard = React.forwardRef(
    ({
        onConfirmYes = () => { },
        title = "",
        titleContent = "",
        onModalHide = () => { },
        onPayGiftCard = () => { },
    }, ref) => {
        const [t] = useTranslation();
        const dispatch = useDispatch();

        const [open, setOpen] = React.useState(false);
        const [isLoading, setLoading] = React.useState(false);
        const [serialNumber, setSerialNumber] = React.useState("");
        const [titlePage, setTitlePage] = React.useState("Active Gift Card");
        const [giftcardPaymentInfo, setGiftcardPaymentInfo] = React.useState(null);
        const [amount, setAmount] = React.useState("0.00");
        const [dueAmountGiftCardPayment, setDueAmountGiftCardPayment] = React.useState("0.00");

        const { appointment: { groupAppointments } } = useSelector(state => state);

        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleNOButtonPress = () => {
            hideModal();
        };

        const onHandleYESButtonPress = () => {
            hideModal();
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
                hideModal();
            }
        };

        const checkSerialNumber = async () => {
            try {
                setLoading(true);
                const params = {
                    url: `giftcard/serialNumber/${serialNumber}?isActive=${true}`,
                    method: "GET",
                }
                const response = await axios(params);
                if (response?.data?.codeNumber == 400) {
                    Alert.alert(response?.data?.message);
                } else {
                    setTitlePage("Gift Card Details");
                    setGiftcardPaymentInfo(response?.data?.data);
                    calcuLateDueAmount(response?.data?.data);
                }
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }

        const getAmountEnter = (amountMoney) => {
            if (`${amountMoney}`.indexOf("$") !== -1) {
                const tempAmount = (`${amountMoney}`.trim()).split("$ ");
                return formatNumberFromCurrency(tempAmount[1]);
            }

            return formatNumberFromCurrency(amountMoney);
        }

        const calcuLateDueAmount = async (giftCardInfo) => {
            console.log({ giftCardInfo })
            const dueAmount = groupAppointments.dueAmount ? groupAppointments.dueAmount : 0;
            const tempDueAmount = formatMoney(formatNumberFromCurrency(dueAmount) - getAmountEnter(giftCardInfo.amount));
            const tempAmount = tempDueAmount >= 0 ? giftCardInfo.amount : dueAmount;
            setAmount(tempAmount);
            setDueAmountGiftCardPayment(
                formatMoney(formatNumberFromCurrency(dueAmount) - formatNumberFromCurrency(tempAmount))
            )
        }

        const payGiftCard = () => {
            if (getAmountEnter(amount) > formatNumberFromCurrency(giftcardPaymentInfo.amount)) {
                alert("Enter amount is not bigger than the value of gift card!")
            } else if (getAmountEnter(amount) === 0) {
                alert("Pay amount is not equal 0!")
            } else {
                if (formatNumberFromCurrency(dueAmountGiftCardPayment) < 0) {
                    alert("Enter amount is not bigger than the charge amount!")
                } else {
                    const checkoutGroupId = groupAppointments?.checkoutGroupId || 0;
                    const giftCardId = giftcardPaymentInfo?.giftCardId || 0;
                    onPayGiftCard(formatNumberFromCurrency(amount),giftCardId);
                }
            }
        }

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
                setSerialNumber("");
                setGiftcardPaymentInfo(null);
                setTitlePage("Active Gift Card");
            },
            hide: () => {
                setOpen(false);
            }
        }));

        const onChangeAmount = (value) => {
            const dueAmount = groupAppointments.dueAmount ? groupAppointments.dueAmount : 0;
            setAmount(value);
            setDueAmountGiftCardPayment(
                formatMoney(formatNumberFromCurrency(dueAmount) - formatNumberFromCurrency(value))
            );
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
            >
                <View pointerEvents={isLoading ? "none" : "auto"} style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{titlePage}</Text>
                        {
                            !giftcardPaymentInfo && <IconButton
                                icon={images.iconClose}
                                style={styles.buttonClose}
                                iconStyle={styles.iconButtonClose}
                                onPress={hideModal}
                            />
                        }
                    </View>
                    {!giftcardPaymentInfo && <Text style={styles.txtTitle}>
                        {title}
                    </Text>}

                    {
                        giftcardPaymentInfo ?
                            <View style={{ width: "100%", backgroundColor: "white", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                <View style={[styles.row, { justifyContent: "flex-start" }]}>
                                    <Text style={[styles.txt, { width: scaleWidth(140) }]}>Serial number:</Text>
                                    <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}># {giftcardPaymentInfo?.serialNumber}</Text>
                                </View>

                                <View style={[styles.row, styles.rowAmount]}>
                                    <Text style={[styles.txt, { width: scaleWidth(140) }]}>Amount:</Text>
                                    <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>{`$ ${giftcardPaymentInfo?.amount}`}</Text>
                                </View>


                                <View style={styles.row}>
                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD }]}>Payment details</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.txt}>Charge amount:</Text>
                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD }]}>{`$ ${groupAppointments?.dueAmount}`}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.txt}>Pay amount:</Text>
                                    <TextInputMask
                                        value={amount}
                                        onChangeText={onChangeAmount}
                                        type="money"
                                        style={styles.inputPrice}
                                        options={{ precision: 2, separator: '.', delimiter: ',', unit: '$ ', suffixUnit: '' }}
                                    />
                                </View>

                                <View style={[styles.row, styles.rowAmountDue]}>
                                    <Text style={styles.txt}>Amount Due:</Text>
                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: colors.red }]}>
                                        {`$ ${dueAmountGiftCardPayment}`}
                                    </Text>
                                </View>

                                <View style={[styles.bottomStyle, { paddingHorizontal: scaleWidth(15) }]}>
                                    <TouchableOpacity
                                        onPress={hideModal}
                                        style={[styles.buttonPay, { backgroundColor: "#F1F1F1", borderWidth: 1, borderColor: "#cccccc" }]}
                                    >
                                        <Text style={[styles.textSubmit, { color: "#404040" }]}>CANCEL</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={payGiftCard}
                                        style={styles.buttonPay}
                                    >
                                        <Text style={styles.textSubmit}>PAY</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : <>
                                <TextInput
                                    style={styles.textInput}
                                    value={serialNumber}
                                    onChangeText={text => setSerialNumber(text)}
                                    placeholderTextColor="#cccccc"
                                    placeholder="Your gift card"
                                />

                                <View style={styles.bottomStyle}>
                                    <TouchableOpacity
                                        onPress={checkSerialNumber}
                                        style={styles.buttonSubmit}
                                    >
                                        {
                                            isLoading ? <
                                                ActivityIndicator size='small' color='white' /> :
                                                <Text style={styles.textSubmit}>Add card</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </>
                    }
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
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
        height: scaleHeight(36),
        width: scaleWidth(120),
        backgroundColor: colors.ocean_blue,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textSubmit: {
        fontFamily: fonts.MEDIUM,
        color: colors.white,
        fontSize: scaleFont(17)
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

    textInput: {
        width: scaleWidth(300),
        height: scaleHeight(38),
        borderWidth: 2,
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        borderColor: "#f0dfdf",
        marginTop: scaleHeight(12),
        paddingHorizontal: scaleWidth(16),
        textAlign: "center"
    },

    buttonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        borderRadius: scaleWidth(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginRight: scaleWidth(10),
        position: 'absolute',
        right: scaleWidth(0),
        top: scaleWidth(11),
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

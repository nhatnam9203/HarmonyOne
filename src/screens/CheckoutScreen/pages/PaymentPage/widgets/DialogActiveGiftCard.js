import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { Button, IconButton, GiftCardScanner } from "@shared/components";
import { images } from "@shared/themes/resources";
import { checkGiftCard, useAxiosQuery, useAxiosMutation, selectPaymentMethod } from "@src/apis";
import { axios } from '@shared/services/axiosClient';
import { app } from "@redux/slices";
import { formatMoney, formatNumberFromCurrency, slop } from "@shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import Modal from "react-native-modal";

export const CardType = {
    GIFT_CARD: "GiftCard",
    CUSTOMER_CARD: "HarmonyPay",
};



export const DialogActiveGiftCard = React.forwardRef(
    ({
        onConfirmYes = () => { },
        title = "",
        titleContent = "",
        onModalHide = () => { },
        onPayGiftCard = () => { },
        submitConsumerPayment,
        consumerPayment,
    }, ref) => {
        const [t] = useTranslation();
        const dispatch = useDispatch();

        const [open, setOpen] = React.useState(false);
        const [isLoading, setLoading] = React.useState(false);
        const [serialNumber, setSerialNumber] = React.useState("");
        const [titlePage, setTitlePage] = React.useState("HarmonyPay - Gift Card");
        const [giftcardPaymentInfo, setGiftcardPaymentInfo] = React.useState(null);
        const [amount, setAmount] = React.useState("0.00");
        const [dueAmountGiftCardPayment, setDueAmountGiftCardPayment] = React.useState("0.00");
        const [isScanning, setScanning] = React.useState(true);

        const [checkGiftCardFail, setCheckGiftCardFail] = React.useState(false);
        const [checkConsumerCodeFail, setCheckConsumerCodeFail] =
            React.useState(false);

        const [cardType, setCardType] = React.useState(null);
        const [isLoadedConsumer, setIsLoadedConsumer] = React.useState(false);
        const [isLoadedGiftCard, setIsLoadedGiftCard] = React.useState(false);
        const [isCheck, setIsCheck] = React.useState(false);
        const [starNumberUse, setStarNumberUse] = React.useState(0);
        const [payStarAmount, setPayStarAmount] = React.useState(0);


        const { appointment: { groupAppointments } } = useSelector(state => state);

        /************************************* GỌI API SELECT METHOD PAY *************************************/
        const [, submitSelectConsumerMethod] = useAxiosMutation({
            ...selectPaymentMethod(),
            onSuccess: async (data, response) => {
                if (response?.codeNumber == 200) {
                    const params = {
                        amount: formatNumberFromCurrency(amount),
                        rewardStar: starNumberUse,
                        userCardId: 0,
                        merchantId: 0,
                    };
                    const body = await consumerPayment(data, serialNumber, params);
                    submitConsumerPayment(body.params);
                }
            }
        });

        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onChangeStarNumberUse = async (starUse = 0) => {
            //if(starUse > cardDetail?.star
            //   || starUse*100 > paymentDetailInfo?.dueAmount) return

            const { grandTotal = 0, dueAmount = 0 } = groupAppointments || {};
            const dueAmountNumber = formatNumberFromCurrency(dueAmount);

            let tempStar = parseInt(starUse);
            if (isNaN(tempStar)) {
                tempStar = 0;
            }

            let maxStart = giftcardPaymentInfo?.star ? parseInt(giftcardPaymentInfo?.star) : 0;
            if (isNaN(maxStart)) {
                maxStart = 0;
            }

            if (tempStar > maxStart) {
                tempStar = maxStart;
            } else if (tempStar <= 0) {
                tempStar = 0;
            }

            await setStarNumberUse(tempStar);
            const tempAmount = parseFloat(
                tempStar / giftcardPaymentInfo.rewardStarRate
            ).toFixed(2);
            await setPayStarAmount(tempAmount);

            const cardAmount = formatNumberFromCurrency(giftcardPaymentInfo?.amount);
            let paidValue = dueAmountNumber - formatNumberFromCurrency(tempAmount);

            if (cardAmount < paidValue) {
                paidValue = cardAmount;
            };

            setAmount(paidValue);
        };

        React.useEffect(() => {
            if (!isCheck) {
                if (payStarAmount > 0) {
                    const { dueAmount = 0 } = groupAppointments || {};

                    if (
                        formatNumberFromCurrency(groupAppointments?.dueAmount ?? 0) >= 0
                    ) {
                        onChangePaidAmount(groupAppointments?.dueAmount);
                    }
                }
                setPayStarAmount(0);
                setStarNumberUse(0);
            } else {
                const maxStart = giftcardPaymentInfo?.star ? parseInt(giftcardPaymentInfo?.star) : 0;
                const { dueAmount = 0 } = groupAppointments || {};
                const dueValue = formatNumberFromCurrency(dueAmount);

                if (maxStart > 0) {
                    const payStar = Math.min(
                        maxStart,
                        dueValue * giftcardPaymentInfo.rewardStarRate
                    );
                    onChangeStarNumberUse(payStar);
                }
            }
        }, [isCheck]);

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
                setSerialNumber("");
                setGiftcardPaymentInfo(null);
                setScanning(true);
                setAmount("0.00");
                setDueAmountGiftCardPayment("0.00");
                setTitlePage("HarmonyPay - Gift Card");
                setCheckConsumerCodeFail(false);
                setCheckGiftCardFail(false);
                setCardType(null);
                setIsLoadedConsumer(false);
                setIsLoadedGiftCard(false);
                setIsCheck(false);
                setPayStarAmount(0);
                setStarNumberUse(0);
            },
            hide: () => {
                setOpen(false);
            }
        }));

        const checkQRcode = (qrCode) => {
            if (qrCode) {
                checkSerialNumber(qrCode);
                checkPaytokenConsumer(qrCode);
            } else {
                checkSerialNumber();
                checkPaytokenConsumer();
            }
        }

        { /************************************* GỌI API CHECK SERIAL NUMBER SHOW POPUP GIFTCARD DETAIL LÊN *************************************/ }
        const checkSerialNumber = async (qrCode) => {
            const code_number = qrCode ?? serialNumber;
            try {
                if (!isEmpty(code_number)) {
                    setLoading(true);
                    const params = {
                        url: `giftcard/serialNumber/${code_number}?isActive=${true}`,
                        method: "GET",
                    }
                    const response = await axios(params);

                    if (response?.data?.codeNumber == 400) {
                        setCheckGiftCardFail(true);
                        // Alert.alert(response?.data?.message);
                    } else {
                        setTitlePage("Card Details");
                        setGiftcardPaymentInfo(response?.data?.data);
                        calcuLateDueAmount(response?.data?.data);
                        setCardType(CardType.GIFT_CARD);
                    }
                }
            } catch (err) {

            } finally {
                setIsLoadedGiftCard(true);
            }
        }

        const checkPaytokenConsumer = async (qrCode) => {
            const code_number = qrCode ?? serialNumber;
            try {
                if (!isEmpty(code_number)) {
                    setLoading(true);
                    const token = code_number;
                    const params = {
                        url: `/Consumer`,
                        method: "GET",
                        params: { token },
                    };

                    const response = await axios(params);
                    if (response?.data?.codeNumber == 400) {
                        if (response?.data?.message == "Your token invalid.") {
                            alert(response?.data?.message);
                            return;
                        }
                        setCheckConsumerCodeFail(true);

                        // Alert.alert(response?.data?.message);
                    } else {
                        setTitlePage("Card Details");
                        setGiftcardPaymentInfo(response?.data?.data);
                        calcuLateDueAmount(response?.data?.data);
                        setCardType(CardType.CUSTOMER_CARD);
                    }
                }

            } catch (err) {

            } finally {
                setIsLoadedConsumer(true);
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
            const dueAmount = groupAppointments.dueAmount ? groupAppointments.dueAmount : 0;
            const tempDueAmount = formatMoney(formatNumberFromCurrency(dueAmount) - getAmountEnter(giftCardInfo.amount));
            const tempAmount = tempDueAmount >= 0 ? giftCardInfo.amount : dueAmount;
            setAmount(tempAmount);
            setDueAmountGiftCardPayment(
                formatMoney(formatNumberFromCurrency(dueAmount) - formatNumberFromCurrency(tempAmount))
            )
        }

        { /************************************* GỌI API PAY GIFT CARD *************************************/ }
        const payGiftCard = () => {
            if (getAmountEnter(amount) > formatNumberFromCurrency(giftcardPaymentInfo.amount)) {
                alert("Enter amount is not bigger than the value of card!")
            } else if (getAmountEnter(amount) === 0) {
                alert("Pay amount is not equal 0!")
            } else {
                if (formatNumberFromCurrency(dueAmountGiftCardPayment) < 0) {
                    alert("Enter amount is not bigger than the charge amount!")
                } else {
                    const checkoutGroupId = groupAppointments?.checkoutGroupId || 0;
                    const giftCardId = giftcardPaymentInfo?.giftCardId || 0;
                    if (cardType == CardType.GIFT_CARD) {
                        onPayGiftCard(formatNumberFromCurrency(amount), giftCardId);
                    } else {
                        payByHarmonyPay();
                    }
                }
            }

            // if (payAmount < 0) {
            //     alert(t("Amount must greater than 0!"));
            //     return;
            //   }

            //   const cardAmount = formatNumberFromCurrency(cardDetail?.amount);
            //   if (payAmount > cardAmount) {
            //     alert(t(`Amount must less than ${cardAmount}`));
            //     return;
            //   }

            //   if (onSubmit && typeof onSubmit === "function") {
            //     onSubmit({
            //       amount: formatNumberFromCurrency(payAmount),
            //       rewardStar: starNumberUse,
            //       totalAmount:
            //         formatNumberFromCurrency(payAmount) +
            //         formatNumberFromCurrency(payStarAmount),
            //     });
            //   }
        }

        const payByHarmonyPay = async () => {
            const data = {
                method: "harmony",
                amount: formatNumberFromCurrency(amount) + formatNumberFromCurrency(payStarAmount),
                totalAmount: formatNumberFromCurrency(amount) + formatNumberFromCurrency(payStarAmount),
                giftCardId: 0,
                rewardStar: starNumberUse,
            };

            const body = await selectPaymentMethod(groupAppointments?.checkoutGroupId, data);

            submitSelectConsumerMethod(body.params);
            setTimeout(() => {
                hideModal();
            }, 200);
        }

        const onChangeAmount = (value) => {
            const dueAmount = groupAppointments.dueAmount ? groupAppointments.dueAmount : 0;
            setAmount(value);
            setDueAmountGiftCardPayment(
                formatMoney(formatNumberFromCurrency(dueAmount) - formatNumberFromCurrency(value))
            );
        }

        const openScanBarcode = () => {
            setScanning(true);
            setTitlePage("HarmonyPay - Gift Card");
        }

        const onReadBarcode = (result) => {
            if (!isEmpty(result)) {
                setSerialNumber(result);
            }
            checkQRcode(result);
            setTitlePage("HarmonyPay - Gift Card");
            setScanning(false)
        }

        React.useEffect(() => {
            if (checkGiftCardFail && checkConsumerCodeFail) {
                alert(`Code is invalid!!!`);
                setCheckGiftCardFail(false);
                setCheckConsumerCodeFail(false);
            }
        }, [checkGiftCardFail, checkConsumerCodeFail]);

        React.useEffect(() => {
            if (isLoadedConsumer && isLoadedGiftCard) {
                setLoading(false)
                setIsLoadedConsumer(false);
                setIsLoadedConsumer(false);
            }
        }, [isLoadedGiftCard, isLoadedConsumer]);

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn={'fadeIn'}
                animationOut='fadeOut'
            >
                {
                    isLoading ? <ActivityIndicator /> :
                        <KeyboardAwareScrollView
                            pointerEvents={isLoading ? "none" : "auto"}
                            contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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

                                {!giftcardPaymentInfo && !isScanning && <Text style={styles.txtTitle}>
                                    {title}
                                </Text>}
                                {
                                    isScanning ?
                                        <View style={{ width: scaleWidth(340), height: scaleWidth(350), justifyContent: "center", alignItems: "center" }}>
                                            <GiftCardScanner onReadBarcode={onReadBarcode} />
                                            <TouchableOpacity onPress={() => setScanning(false)} style={{ marginTop: scaleWidth(8) }}>
                                                <Text style={{ fontSize: scaleFont(17), fontFamily: fonts.MEDIUM }}>Enter Bar code</Text>
                                            </TouchableOpacity>
                                        </View> :
                                        giftcardPaymentInfo ?
                                            <View style={{ width: "100%", backgroundColor: "white", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                                { /************************************* SERIAL NUMBER *************************************/}
                                                {
                                                    cardType == CardType.GIFT_CARD ?
                                                        <View style={[styles.row, { justifyContent: "flex-start" }]}>
                                                            <Text style={[styles.txt, { width: scaleWidth(140) }]}>Serial number:</Text>
                                                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}># {giftcardPaymentInfo?.serialNumber}</Text>
                                                        </View> :
                                                        <View style={[styles.row, { justifyContent: "flex-start" }]}>
                                                            <Text style={[styles.txt, { width: scaleWidth(140) }]}>Customer:</Text>
                                                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}># {giftcardPaymentInfo?.userName}</Text>
                                                        </View>
                                                }

                                                { /************************************* Star avaiable *************************************/}
                                                <View style={[styles.row, { justifyContent: "flex-start" }]}>
                                                    <Text style={[styles.txt, { width: scaleWidth(140) }]}>Star avaiable:</Text>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Image source={images.star} style={{ width: scaleWidth(20), height: scaleWidth(20), marginRight: 5 }} />
                                                        <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>{`${giftcardPaymentInfo?.star}`}</Text>
                                                    </View>
                                                </View>

                                                { /************************************* AMOUNT *************************************/}
                                                <View style={[styles.row, styles.rowAmount]}>
                                                    <Text style={[styles.txt, { width: scaleWidth(140) }]}>Card balance:</Text>
                                                    <Text style={[styles.txt, { fontFamily: fonts.MEDIUM }]}>{`$ ${giftcardPaymentInfo?.amount}`}</Text>
                                                </View>


                                                <View style={styles.row}>
                                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD }]}>Payment details</Text>
                                                </View>
                                                { /************************************* CHARGE AMOUNT *************************************/}
                                                <View style={styles.row}>
                                                    <Text style={styles.txt}>Charge amount:</Text>
                                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD }]}>{`$ ${groupAppointments?.dueAmount}`}</Text>
                                                </View>

                                                { /************************************* PAYMENT AMOUNT *************************************/}
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

                                                { /************************************* USE HP STAR *************************************/}
                                                <View style={[styles.row, { marginTop: scaleHeight(24) }]}>
                                                    <TouchableOpacity
                                                        onPress={() => setIsCheck(!isCheck)}
                                                        style={{ flexDirection: "row" }}
                                                    >
                                                        <Image
                                                            source={isCheck ? images.checkBox : images.checkBoxEmpty}
                                                            style={{ width: scaleWidth(20), height: scaleWidth(20), marginRight: 5 }}
                                                        />
                                                        <Text style={styles.txt}>Use HP star:</Text>
                                                    </TouchableOpacity>

                                                    <TextInput
                                                        value={starNumberUse?.toString()}
                                                        onChangeText={onChangeStarNumberUse}
                                                        style={styles.inputPrice}
                                                        editable={isCheck}
                                                        keyboardType='numeric'
                                                    />
                                                </View>
                                                <View style={styles.row}>
                                                    <Text style={styles.txt}>Conversation value:</Text>
                                                    <Text style={styles.txt}>{`- ${formatMoney(payStarAmount)}`}</Text>
                                                </View>

                                                { /************************************* AMOUNUT DUE *************************************/}
                                                <View style={[styles.row, styles.rowAmountDue]}>
                                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: colors.red }]}>
                                                        Due amount:
                                                    </Text>
                                                    <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: colors.red }]}>
                                                        {`$ ${dueAmountGiftCardPayment}`}
                                                    </Text>
                                                </View>

                                                { /************************************* BUTTON *************************************/}
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
                                                { /************************************* INPUT SERIAL NUMBER *************************************/}
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
                                                        onPress={() => {
                                                            if (!isEmpty(serialNumber)) {
                                                                checkQRcode();
                                                            }
                                                        }}
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
                }
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    buttonScancode: {
        height: scaleHeight(42),
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
    containerInput: {
        width: scaleWidth(300),
        height: scaleHeight(42),
        marginTop: scaleHeight(12),
        flexDirection: "row"
    },
    textInput: {
        flex: 1,
        borderWidth: 2,
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        borderColor: "#f0dfdf",
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

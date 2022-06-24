import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import {
    IconButton,
    CustomInput,
    InputText,
    Button,
    DialogSuccess,
    PopupProcessingCredit,
    PopupProcessing,
    PopupErrorMessage,
    PopupPayCompleted,
    PopupInvoice,
    DialogConfirm,
} from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { ItemsPay } from "./ItemsPay";
import { PopupPaymentDetail, PopupChange, DialogActiveGiftCard } from "./widgets";
import { translate } from "@localize";


export const Layout = ({
    back,
    appointmentDetail,
    methodPay,
    onChangeMethodPay,
    onSubmitPayment,
    dialogSuccessRef,
    popupChangeRef,
    popupPaymentDetailRef,
    popupPayProcessingRef,
    popupErrorMessageRef,
    invoiceRef,
    popupConfirmDuplicateRef,
    errorMessageFromPax,
    dialogActiveGiftCard,
    onOK,
    onPayGiftCard,
    isCancelHarmony,
    cancelHarmonyPay,
    paymentDetail,
    printBill,
    donotPrintBill,
    merchant,
    groupAppointments,
    cancelInvoicePrint,
    confirmPaymentClover,
    rejectPaymentClover,
    submitConsumerPayment,
    consumerPayment,
}) => {

    const [t] = useTranslation();

    return (
        <>
            <View style={styles.container}>
                <SingleScreenLayout
                    pageTitle={translate('Check out')}
                    isLeft={true}
                    isRight={false}
                    isScrollLayout={false}
                    containerStyle={{ paddingVertical: 0 }}
                >
                    <View style={styles.content}>
                        <Text style={styles.txtTotal}>{translate("Total")}</Text>

                        <View style={styles.wrapPrice}>
                            <Text style={styles.priceTotal}>{`$ ${groupAppointments?.appointments[0].total}`}</Text>
                        </View>

                        <Text style={styles.txtSelectPayment}>
                            {translate("Select payment method")}
                        </Text>

                        <ItemsPay
                            methodPay={methodPay}
                            onChangeMethodPay={isCancelHarmony ? () => { } : onChangeMethodPay}
                        />
                    </View>

                    <View style={styles.bottom}>
                        <Button
                            label={isCancelHarmony ? translate("Cancel") : translate("Charge")}
                            onPress={isCancelHarmony ? cancelHarmonyPay : onSubmitPayment}
                            highlight={true}
                            width={'100%'}
                            disabled={methodPay == "" || !methodPay}
                        />
                    </View>

                    <DialogActiveGiftCard
                        ref={dialogActiveGiftCard}
                        title={translate("Enter gift card serial number")}
                        onConfirmYes={() => { }}
                        onModalHide={() => onChangeMethodPay("")}
                        onPayGiftCard={onPayGiftCard}
                        submitConsumerPayment={submitConsumerPayment}
                        consumerPayment={consumerPayment}
                    />
                    <PopupPaymentDetail
                        ref={popupPaymentDetailRef}
                        paymentDetail={paymentDetail}
                    />
                    <PopupChange
                        ref={popupChangeRef}
                        paymentDetail={paymentDetail}
                        onOK={onOK}
                    />
                </SingleScreenLayout>

                <PopupProcessing
                    ref={popupPayProcessingRef}
                />

                <PopupErrorMessage
                    ref={popupErrorMessageRef}
                    title={translate("Trasaction Fail")}
                    message={errorMessageFromPax}
                />

                <PopupPayCompleted
                    ref={dialogSuccessRef}
                    title={translate("Transaction completed")}
                    onConfirmYes={printBill}
                    onConfirmNo={donotPrintBill}
                />

                <PopupInvoice
                    ref={invoiceRef}
                    cancelInvoicePrint={cancelInvoicePrint}
                />

                <DialogConfirm
                    ref={popupConfirmDuplicateRef}
                    title={translate('Verify payment')}
                    titleContent={translate("This may be a duplicate, do you want to accept this payment")}
                    onConfirmYes={confirmPaymentClover}
                    onConfirmNo={rejectPaymentClover}
                />

            </View>
        </>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : "white",
        position: "relative",
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: scaleHeight(16),
        backgroundColor: "#FAFAFA"
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

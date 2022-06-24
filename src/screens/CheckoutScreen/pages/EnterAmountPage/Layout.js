import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, CustomInput, InputText, Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { translate } from "@localize";

const amountList = ["10", "20", "50", "100"];

export const Layout = ({
    form,
    errors,
    back,
    onSubmit,
    amount,
    formatNumberFromCurrency,
    appointmentDetail,
    groupAppointments,
    moneyGiveForStaff,
    exact,
    isTurnOff,
    onPressAmount
}) => {

    const [t] = useTranslation();

    const valueChange =
        formatNumberFromCurrency(groupAppointments?.dueAmount) - formatNumberFromCurrency(moneyGiveForStaff) < 0 ?
            formatNumberFromCurrency(groupAppointments?.dueAmount) - formatNumberFromCurrency(moneyGiveForStaff) : "0.00"


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Enter amount')}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.content}>

                        <Text style={styles.txtTotal}>{translate("Amount due")}</Text>

                        <View style={styles.wrapPrice}>
                            <Text style={styles.priceTotal}>{`$ ${groupAppointments?.dueAmount}`}</Text>
                        </View>

                        <CustomInput
                            label={translate("Amount")}
                            error={errors?.amount}
                            renderInput={() =>
                                <InputText
                                    form={form}
                                    name="amount"
                                    error={errors?.amount}
                                    defaultValue="0.00"
                                    defaultValueRemove="0.00"
                                    type="money"
                                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                                    style={{ alignItems: "center" }}
                                    renderLeft={() => <Text style={styles.dollar}>$</Text>}
                                />}
                        />

                        <View style={styles.containerPercent}>
                            {
                                amountList.map(p => (
                                    <TouchableOpacity
                                        key={p + "amount"}
                                        onPress={() => onPressAmount(p)}
                                        style={[styles.itemAmount, { backgroundColor:  "transparent" }]}
                                    >
                                        <Text style={[styles.txtAmount, { color:  "#0764B0" }]}>
                                            {`${p}`}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <TouchableOpacity onPress={exact} style={styles.buttonExact}>
                            <Text style={styles.txtExact}>{translate("Exact")}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: scaleHeight(16) }}>
                            <Text style={styles.txtChange}>{translate("Change")}:</Text>
                            <Text style={[styles.txtChange, styles.txtChangePrice]}>
                                {`$ ${formatMoney(valueChange).toString().replace("-", "")}`}
                            </Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.bottom}>
                    <Button
                        label={translate("Done")}
                        onPress={form.handleSubmit(onSubmit)}
                        highlight={true}
                        width={'100%'}
                        isTurnOff={isTurnOff}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    txtChangePrice: {
        fontFamily: fonts.BOLD,
        color: "#404040",
        marginLeft: scaleWidth(8)
    },
    txtChange: {
        color: "#7A98BB",
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR
    },
    buttonExact: {
        width: "100%",
        height: scaleHeight(45),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#4AD100",
        marginTop: scaleHeight(20)
    },
    txtExact: {
        color: colors.white,
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM
    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        padding: scaleWidth(16),
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
    dollar: {
        fontSize: scaleFont(17),
        color: "#404040",
        marginRight: scaleWidth(8)
    },
    containerPercent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemAmount: {
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: scaleHeight(7),
        borderWidth: 1,
        borderColor: "#dddddd",
        width: scaleWidth(375 / 4 - 12),
        borderRadius: 3
    },
    txtAmount: {
        color: "#0764B0",
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM
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
        marginBottom: scaleHeight(24),
        backgroundColor: "#FAFAFA"
    },
    priceTotal: {
        fontSize: scaleFont(19),
        color: "#4AD100",
        fontFamily: fonts.BOLD,
        textAlign: "center",
        color: "red"
    },
    txtSelectPayment: {
        textAlign: "center",
        fontSize: scaleFont(15),
        color: "#404040",
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20)
    },
    txtTotal: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.BOLD,
        textAlign: "center"
    },
});

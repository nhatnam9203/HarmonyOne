import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, CustomInput, InputText, Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";

const percents = ["15", "18", "20", "25", "50"];

export const Layout = ({
    form,
    back,
    onSubmit,
    selectPercent,
    percentSelected,
    formatNumberFromCurrency,
    removeTip,
    appointmentDetail,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('Add tip')}
                isLeft={false}
                isRight={true}
                headerRightComponent={() =>
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={styles.icon}
                        style={styles.button}
                        onPress={back}
                    />
                }
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.content}>
                        <CustomInput
                            label='Tip amount'
                            renderInput={() =>
                                <InputText
                                    form={form}
                                    name="tip"
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
                                percents.map(p => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        key={p + "percent"}
                                        onPress={() => selectPercent(p)}
                                        style={[styles.itemPercent, { backgroundColor: percentSelected == p ? "#0764B0" : "transparent" }]}
                                    >
                                        <Text style={[styles.txtPercent, { color: percentSelected == p ? "white" : "#0764B0" }]}>
                                            {`${p}%`}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        {parseFloat(formatNumberFromCurrency(appointmentDetail?.tipAmount)) > 0 &&
                            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={removeTip}>
                                <Text style={styles.txtRemoveTip}>Remove tip</Text>
                            </TouchableOpacity>}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.bottom}>
                    <Button
                        label="Save"
                        onPress={form.handleSubmit(onSubmit)}
                        highlight={true}
                        width={'100%'}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    txtRemoveTip: {
        marginTop: scaleHeight(16),
        color: colors.red,
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
    dollar: {
        fontSize: scaleFont(17),
        color: "#404040",
        marginRight: scaleWidth(8)
    },
    containerPercent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemPercent: {
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: scaleHeight(8),
        borderWidth: 1,
        borderColor: "#cccccc",
        width: scaleWidth(375 / 5 - 12),
        borderRadius: 3
    },
    txtPercent: {
        color: "#0764B0",
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },
});

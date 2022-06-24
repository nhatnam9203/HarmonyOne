import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, CustomInput, InputText, Button, Slider } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { DiscountType } from "./DiscountType";
import { formatNumberFromCurrency, roundNumber, guid } from "@shared/utils";
import { useWatch } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "@localize";


export const Layout = ({
    form,
    appointmentDetail,
    discountTypeRef,
    discountByOwner,
    moneyDiscountCustom,
    moneyDiscountFixedAmout,
    onChangeTextCustomDiscount,
    submitPromotion,
    back,
    handelSliderValue,
    promotionAppointment

}) => {

    const [t] = useTranslation();

    const valueDiscount = useWatch({
        control: form.control,
        name: 'valueDiscount'
    });

    const discount = promotionAppointment?.promotions || [];

    let total = 0;
    for (let i = 0; i < discount.length; i++) {
        total = formatNumberFromCurrency(total) + formatNumberFromCurrency(discount[i].discount);
    }

    const discountCustom = moneyDiscountFixedAmout > 0 ?
        `${valueDiscount}` :
        `${(formatNumberFromCurrency(valueDiscount) * formatNumberFromCurrency(appointmentDetail?.subTotal) / 100)}`;
    // total = formatNumberFromCurrency(total) +  parseFloat(discountCustom);
    total = formatNumberFromCurrency(total);

    total = roundNumber(total);

    const discountByStaff = (100 - discountByOwner)
    const manualDiscount = moneyDiscountCustom > 0
        ? moneyDiscountCustom
        : moneyDiscountFixedAmout
    const discountMoneyByStaff = roundNumber(formatNumberFromCurrency(discountByStaff) * formatNumberFromCurrency(manualDiscount) / 100);
    const discountMoneyByOwner = roundNumber(manualDiscount - discountMoneyByStaff);


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Apply discount')}
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
                <KeyboardAwareScrollView contentContainerStyle={styles.content}>

                    {
                        discount.length > 0 &&
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: scaleHeight(8) }}>
                                <Text style={styles.txtDiscount}>{translate("Discount Campaigns")}:</Text>
                                <Text style={styles.txtDiscount}>{translate("Apply value")}</Text>
                            </View>
                            {
                                discount.map((obj) => (
                                    <View key={guid()} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: scaleHeight(8) }}>
                                        <Text style={styles.txtDiscount}>{obj?.merchantPromotion?.name}</Text>
                                        <Text style={[styles.txtDiscount, { color: "#51CF26", fontFamily : fonts.MEDIUM }]}>{`$ ${obj?.discount}`}</Text>
                                    </View>
                                ))
                            }
                        </>
                    }

                    <View style={{ marginTop: scaleHeight(12) }}>
                        <DiscountType
                            form={form}
                            ref={discountTypeRef}
                            subTotal={appointmentDetail?.subTotal}
                            onChangeText={onChangeTextCustomDiscount}
                        />
                    </View>

                    <View style={[styles.viewRowContainer, { marginTop: scaleHeight(8) }]}>
                        <Text style={styles.textNormal}>{translate("Discount by Owner")}</Text>
                        <Text style={styles.textNormal}>{translate("Discount by Staff")}</Text>
                    </View>

                    <View style={[styles.viewRowContainer, { marginTop: scaleHeight(16) }]}>
                        <Text style={styles.textNormal}>{`$ ${discountMoneyByOwner}`}</Text>
                        <Text style={styles.textNormal}>{`$ ${discountMoneyByStaff}`}</Text>
                    </View>
                    <Slider
                        value={discountByOwner}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={(value) => handelSliderValue(value)}
                        trackStyle={{
                            height: scaleWidth(10),
                            backgroundColor: "#F1F1F1",
                            borderRadius: scaleWidth(6),
                        }}
                        thumbStyle={{
                            height: scaleWidth(24),
                            width: scaleWidth(24),
                            borderRadius: scaleWidth(12),
                            backgroundColor: "#fff",
                            ...Platform.select({
                                ios: {
                                    shadowColor: "rgba(0, 0, 0,0.3)",
                                    shadowOffset: { width: 1, height: 0 },
                                    shadowOpacity: 1,
                                },

                                android: {
                                    elevation: 2,
                                },
                            }),
                        }}

                        minimumTrackTintColor={colors.ocean_blue}
                        maximumTrackTintColor={"#fafafa"}
                        step={25}
                    />

                    <View style={styles.viewRowContainer}>
                        <Text style={styles.textNormal}>{discountByOwner} %</Text>
                        <Text style={styles.textNormal}>{discountByStaff} %</Text>
                    </View>

                    <CustomInput
                        label={translate('Note')}
                        style={{ marginTop: scaleHeight(20) }}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="note"
                                placeholder=""
                                style={{ height: scaleHeight(79), alignItems: 'flex-start', paddingTop: scaleHeight(8) }}
                                multiline={true}
                            />
                        }
                    />

                    <View style={styles.row}>
                        <Text style={[styles.text]}>{translate("Total Discount")}</Text>
                        <Text style={[styles.text, { color: "#4AD100" }]}>
                            {`$ -${discountCustom == "0" ? total : roundNumber(parseFloat(discountCustom))}`}
                        </Text>
                    </View>


                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label={translate("Apply")}
                        onPress={submitPromotion}
                        highlight={true}
                        width={'100%'}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    txtDiscount: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.REGULAR
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
        paddingVertical: scaleHeight(5),
        borderWidth: 1,
        borderColor: "#dddddd",
        width: scaleWidth(375 / 5 - 12),
        borderRadius: 3
    },
    txtPercent: {
        color: "#0764B0",
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: scaleHeight(8)
    },
    text: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.BOLD
    },
    slider: {
        flex: 1,
        marginTop: 10
    },
    viewRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textNormal: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#404040"
    }
});

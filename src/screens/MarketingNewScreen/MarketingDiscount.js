import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { useController } from "react-hook-form";
import { CustomInput, InputText } from "@shared/components";

const MarketingDiscount = ({
    form,
    errors,
    defaultMessage,
}) => {

    const discount_type = form.getValues("promotionType");

    const { field } = useController({
        control: form.control,
        defaultValue: "percent",
        name: "promotionType",
    });

    return (
        <CustomInput
            label='Discount Type'
            renderInput={() =>
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => field.onChange("percent")}
                        style={[styles.btnType, { borderColor: field.value == "percent" ? colors.ocean_blue : "#cccccc" }]}
                    >
                        <Text
                            style={[styles.txtType, { color: field.value == "percent" ? colors.ocean_blue : "#404040" }]}
                        >
                            %
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => field.onChange("fixed")}
                        style={[styles.btnType, { borderColor: field.value == "fixed" ? colors.ocean_blue : "#cccccc" }]}
                    >
                        <Text
                            style={[styles.txtType, { color: field.value == "fixed" ? colors.ocean_blue : "#404040" }]}
                        >
                            $
                        </Text>
                    </TouchableOpacity>
                    <InputText
                        form={form}
                        name="promotionValue"
                        placeholder="0.00"
                        defaultValue="0.00"
                        style={{ width: scaleWidth(235) }}
                        type="money"
                        options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                        onBlur={()=>form.setValue("message",defaultMessage())}
                    />
                </View>
            }
        />
    )
};
export default MarketingDiscount;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    row: {
        flexDirection: "row", justifyContent: "space-between"
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
    },

    buttonTreedot: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },

    treedot: {
        tintColor: colors.black,
        width: scaleHeight(20),
        height: scaleHeight(20),
    },

    btnType: {
        height: scaleWidth(42),
        width: scaleWidth(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#cccccc"
    },

    txtType: {
        fontSize: scaleFont(15),
        color: "#404040",
        fontFamily: fonts.MEDIUM
    }
});

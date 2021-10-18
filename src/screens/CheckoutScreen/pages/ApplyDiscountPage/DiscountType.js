import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { useWatch } from "react-hook-form";
import { CustomInput, InputText } from "@shared/components";
import { formatNumberFromCurrency, roundNumber } from "@shared/utils";

export const DiscountType = ({
    form,
    subTotal = 0,
    onChangeText = () =>{}
}) => {

    const [discount_type, setDiscountType] = React.useState("money");

    const onChangeDiscountType = (valueType) => {
        setDiscountType(valueType);
        if (valueType == "percent") {
            calculateDiscount();
        } else {

        }
    }

    const calculateDiscount = (textNumber) => {
        let discount = form.getValues("valueDiscount");
        if (discount_type == "percent") {
            discount = roundNumber((formatNumberFromCurrency(discount) * formatNumberFromCurrency(subTotal) / 100));

            // await this.setState({
            //     discount,
            //     percent: this.state.valueText,
            //     fixedAmount: 0,
            // });

            onChangeText(discount, 0);
        } else {
            // await this.setState({
            //     discount,
            //     fixedAmount: this.state.valueText,
            //     percent: 0,
            // });

            onChangeText(0, discount);
        }
    }

    const valueDiscount = useWatch({
        control: form.control,
    })

    return (
        <CustomInput
            label='Manual discount'
            renderInput={() =>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => onChangeDiscountType("percent")}
                        style={[styles.btnType, { borderColor: discount_type == "percent" ? colors.ocean_blue : "#cccccc" }]}
                    >
                        <Text
                            style={[styles.txtType, { color: discount_type == "percent" ? colors.ocean_blue : "#404040" }]}
                        >
                            %
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => onChangeDiscountType("money")}
                        style={[styles.btnType, { borderColor: discount_type == "money" ? colors.ocean_blue : "#cccccc" }]}
                    >
                        <Text
                            style={[styles.txtType, { color: discount_type == "money" ? colors.ocean_blue : "#404040" }]}
                        >
                            $
                        </Text>
                    </TouchableOpacity>
                    <InputText
                        form={form}
                        name="valueDiscount"
                        defaultValue="0.00"
                        defaultValueRemove="0.00"
                        type="money"
                        options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                        placeholder="0.00"
                        style={{ width: scaleWidth(235) }}
                    />
                </View>
            }
        />
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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

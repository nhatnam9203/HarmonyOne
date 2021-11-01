import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { useWatch } from "react-hook-form";
import { CustomInput, InputText } from "@shared/components";
import { formatNumberFromCurrency, roundNumber } from "@shared/utils";

export const DiscountType = React.forwardRef(({
    form,
    subTotal = 0,
    onChangeText = () => { },
    
}, ref) => {

    const [discount_type, setDiscountType] = React.useState("percent");

    const onChangeDiscountType = (valueType) => {
        setDiscountType(valueType);
        let discount = form.getValues("valueDiscount");
        if (valueType == "percent") {
            discount = roundNumber((formatNumberFromCurrency(discount) * formatNumberFromCurrency(subTotal) / 100));
            onChangeText(discount, 0);
        } else {
            onChangeText(0, discount);
        }
    }

    const calculateDiscount = () => {
        let discount = form.getValues("valueDiscount");
        if (discount_type == "percent") {
            discount = roundNumber((formatNumberFromCurrency(discount) * formatNumberFromCurrency(subTotal) / 100));
            console.log({ discount })
            onChangeText(discount, 0);
        } else {
            onChangeText(0, discount);
        }
    }

    const valueDiscount = useWatch({
        control: form.control,
        name: 'valueDiscount'
    });

    React.useImperativeHandle(ref, () => ({
        changeDiscountType: (type) => {
            setDiscountType(type);
        }
    }));

    React.useEffect(() => {
        calculateDiscount();
    }, [valueDiscount])

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
                        maxLength={6}
                        style={{ width: scaleWidth(235) }}
                        keyboardType={'numeric'}
                    />
                </View>
            }
        />
    )
});



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

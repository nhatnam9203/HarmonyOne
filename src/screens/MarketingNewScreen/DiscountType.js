import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { CustomInput, InputText } from "@shared/components";

const DiscountType = ({
    form,
    errors,
}) => {

    const [discount_type, setDiscountType] = React.useState("money");

    return (
        <CustomInput
            label='DiscountType'
            renderInput={() =>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setDiscountType("percent")}
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
                        onPress={() => setDiscountType("money")}
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
                        name="discountType"
                        placeholder="0.00"
                        style={{ width: scaleWidth(235) }}
                    />
                </View>
            }
        />
    )
};
export default DiscountType;


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

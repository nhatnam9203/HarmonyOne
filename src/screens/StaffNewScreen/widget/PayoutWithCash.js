import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { fonts, images, colors } from '@shared/themes';
import { InputText, CustomInput } from "@shared/components";
import { useForm } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";
import Title from "./Title"

const PayoutWithCash = React.forwardRef(({},ref) => {

    const form = useForm();
    const { errors } = form.formState;

    React.useImperativeHandle(ref,()=>({
        getValue :() =>{
            return form.getValues("cashPercent")
        }
    }));

    return (
        <View style={styles.container}>
            <Title text="Payout with cash" />
            <View style={styles.row}>
                <CheckBox
                    disabled={true}
                    value={true}
                    onValueChange={() => { }}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Cash percent</Text>
            </View>
            <InputText
                form={form}
                name="cashPercent"
                placeholder=""
                type="money"
                defaultValue="0.00"
                placeholder="0.00"
                error={errors?.cashPercent}
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() => <Text style={styles.dollar}>%</Text>}
            />
        </View>
    )
});


const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(24),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(16),
        marginBottom: scaleHeight(16)

    },
    txt: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        color: "#404040"
    },
    dollar: {
        fontSize: scaleFont(18),
        color: "#404040",
        marginRight: scaleWidth(8),
        fontFamily: fonts.LIGHT
    },
})

export default PayoutWithCash;
import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { fonts, images, colors } from '@shared/themes';
import { InputText, CustomInput } from "@shared/components";
import CheckBox from "@react-native-community/checkbox";
import {useForm} from "react-hook-form";
import Title from "./Title"

const ProductSalary = React.forwardRef(({},ref) => {

    const [ status , setStatus ] = React.useState(false);   

    const form = useForm();

    React.useImperativeHandle(ref,()=>({
        getStatus : () =>{
            return status;
        },
        getValue : () =>{
            return form.getValues("productValue");
        }
    }))

    return (
        <View style={styles.container}>
            <Title text="Product salary" />
            <View style={styles.row}>
                <CheckBox
                    disabled={false}
                    value={status}
                    onValueChange={() => { }}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Commission</Text>
            </View>
            <InputText
                form={form}
                name="productValue"
                defaultValue="0.00"
                defaultValueRemove="0.00"
                placeholder=""
                type="money"
                placeholder="0.00"
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() => <Text style={styles.dollar}>%</Text>}
            />
        </View>
    )
});


const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(8),
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

export default ProductSalary;
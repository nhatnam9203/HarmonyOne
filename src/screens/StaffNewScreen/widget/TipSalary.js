import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { fonts, images, colors } from '@shared/themes';
import { InputText, CustomInput } from "@shared/components";
import { useForm } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";
import Title from "./Title"

const TipSalary = React.forwardRef(({ }, ref) => {

    const form = useForm();
    const { errors } = form.formState;

    const [percentStatus, setPercentStatus] = React.useState(false);
    const [fixedAmountStatus, setFixedAmountStatus] = React.useState(false);


    React.useImperativeHandle(ref, () => ({
        getPercentStatus: () => {
            return percentStatus;
        },
        getPercentValue: () => {
            return form.getValues("percentValue");
        },
        getFixedAmountStatus: () => {
            return fixedAmountStatus;
        },
        getFixedAmountValue: () => {
            return form.getValues("fixedAmountValue");
        },
    }));

    const onChangeStatus = (status, statusType) => {
        if (statusType == "percent") {
            setPercentStatus(status);
            setFixedAmountStatus(false)
        } else {
            setFixedAmountStatus(status);
            setPercentStatus(false);
        }
    }

    return (
        <View style={styles.container}>
            <Title text="Tip" />
            {/************************* PERCENT *************************/}
            <View style={styles.row}>
                <CheckBox
                    disabled={false}
                    value={percentStatus}
                    onValueChange={status => onChangeStatus(status, "percent")}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Percent</Text>
            </View>
            <View pointerEvents={percentStatus ? "auto" : "none"}>
                <InputText
                    form={form}
                    name="percentValue"
                    placeholder=""
                    type="money"
                    placeholder="0.00"
                    defaultValue="0.00"
                    style={{ alignItems: 'center' }}
                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                    renderLeft={() => <Text style={styles.dollar}>%</Text>}
                />

            </View>


            {/************************* FIXED AMOUNT *************************/}
            <View style={styles.row}>
                <CheckBox
                    disabled={false}
                    value={fixedAmountStatus}
                    onValueChange={status => onChangeStatus(status, "fixedAmount")}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Fixed amount</Text>
            </View>
            <View pointerEvents={fixedAmountStatus ? "auto" : "none"}>
                <InputText
                    form={form}
                    name="fixedAmountValue"
                    placeholder=""
                    type="money"
                    placeholder="0.00"
                    defaultValue="0.00"
                    style={{ alignItems: 'center' }}
                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                    renderLeft={() => <Text style={styles.dollar}>$</Text>}
                />
            </View>
        </View>
    )
})


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

export default TipSalary;
import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { fonts, images, colors } from '@shared/themes';
import { InputText, CustomInput, IconButton } from "@shared/components";
import { useForm, useFieldArray, useController } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text"
import CheckBox from "@react-native-community/checkbox";
import Title from "./Title"


const ServiceSalary = React.forwardRef(({ }, ref) => {

    const [perHourStatus, setPerHourStatus] = React.useState(false);
    const [incomeStatus, setIncomeStatus] = React.useState(false);


    const form = useForm({
        defaultValues: {
            serviceSalary: [{ from: "0.00", to: "0.00", commission: "0.00" }],
        }
    });
    const { setValue, register, getValues } = form;
    const { errors } = form.formState;
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "serviceSalary"
    });

    React.useImperativeHandle(ref, () => ({
        getIncomeValues: () => {
            return getValues("serviceSalary");
        },
        getPerhourValue : () =>{
            return getValues("perHour");
        },
        getPerhourStatus: () => {
            return perHourStatus;
        },
        getIncomeStatus: () => {
            return incomeStatus;
        },

        setIncomeValue: (value) => {
            return setValue("serviceSalary",value);
        },
        setPerhourValue : (value) =>{
            return setValue("perHour",value);
        },
        setPerhourStatus: (status) => {
            return setPerHourStatus(status);
        },
        setIncomeStatus: (status) => {
            return setIncomeStatus(status);
        }
    }));

    const onChangeStatus = (status, statusType) => {
        if (statusType == "perHour") {
            setPerHourStatus(status);
            setIncomeStatus(false);
        } else {
            setIncomeStatus(status);
            setPerHourStatus(false);
        }
    }

    return (
        <View style={styles.container}>
            <Title text="Service Salary" />
            {/************************************  PER HOUR   ************************************/}
            <View style={styles.row}>
                <CheckBox
                    disabled={false}
                    value={perHourStatus}
                    onValueChange={(status) => { onChangeStatus(status, "perHour") }}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Per hour</Text>
            </View>
            <View pointerEvents={perHourStatus ? "auto" : "none"}>
                <InputText
                    form={form}
                    name="perHour"
                    defaultValue="0.00"
                    defaultValueRemove="0.00"
                    placeholder=""
                    type="money"
                    placeholder="0.00"
                    error={errors?.perHour}
                    style={{ alignItems: 'center' }}
                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                    renderLeft={() => <Text style={styles.dollar}>$</Text>}
                />

            </View>

            
            {/************************************  INCOME   ************************************/}
            <View style={[styles.row, { marginTop: scaleHeight(24) }]}>
                <CheckBox
                    disabled={false}
                    value={incomeStatus}
                    onValueChange={(status) => { onChangeStatus(status, "income") }}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                />
                <Text style={styles.txt}>Income</Text>
            </View>

            <View pointerEvents={incomeStatus ? "auto" : "none"}>

                {
                    fields.map((field, index) => {
                        return (
                            <>
                                <View key={field.id} style={styles.rowIncome}>
                                    <CustomInput
                                        label='From'
                                        style={{ width: scaleWidth(160) }}
                                        renderInput={() =>
                                            <InputText
                                                form={form}
                                                name={`serviceSalary.${index}.from`}
                                                defaultValue="0.00"
                                                defaultValueRemove="0.00"
                                                placeholder=""
                                                type="money"
                                                placeholder="0.00"
                                                style={{ alignItems: 'center' }}
                                                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                                                renderLeft={() => <Text style={styles.dollar}>$</Text>}
                                            />
                                        }
                                    />
                                    <CustomInput
                                        label='To'
                                        style={{ width: scaleWidth(160) }}
                                        renderInput={() =>
                                            <InputText
                                                form={form}
                                                name={`serviceSalary.${index}.to`}
                                                defaultValue="0.00"
                                                defaultValueRemove="0.00"
                                                placeholder=""
                                                type="money"
                                                placeholder="0.00"
                                                style={{ alignItems: 'center' }}
                                                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                                                renderLeft={() => <Text style={styles.dollar}>$</Text>}
                                            />
                                        }
                                    />
                                </View>
                                <CustomInput
                                    label='Salary percented'
                                    renderInput={() =>
                                        <InputText
                                            form={form}
                                            name={`serviceSalary.${index}.commission`}
                                            defaultValue="0.00"
                                            defaultValueRemove="0.00"
                                            placeholder=""
                                            type="money"
                                            placeholder="0.00"
                                            style={{ alignItems: 'center' }}
                                            options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                                            renderLeft={() => <Text style={styles.dollar}>%</Text>}
                                        />
                                    }
                                />
                                {
                                    fields.length > 1 &&
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <IconButton
                                            icon={images.iconTrash}
                                            iconStyle={styles.iconTrash}
                                            onPress={() => { remove(field.id) }}
                                        />
                                    </View>
                                }
                            </>
                        )
                    })
                }
            </View>

            {
                incomeStatus &&
                <IconButton
                    icon={images.iconAddMore}
                    iconStyle={styles.iconAdd}
                    style={styles.btnAddmore}
                    renderText={() => <Text style={styles.txtAddmore}>Add more</Text>}
                    onPress={() => { append({ from: "0.00", to: "0.00", commission: "0.00" }); }}
                />
            }
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
    rowIncome: {
        width: scaleWidth(375 - 32),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    iconAdd: {
        width: scaleWidth(16),
        height: scaleWidth(16)
    },
    iconTrash: {
        width: scaleWidth(23),
        height: scaleWidth(23)
    },
    txtAddmore: {
        marginLeft: scaleWidth(16),
        color: colors.ocean_blue,
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(16)
    },
    btnAddmore: {
        marginVertical: scaleHeight(16),
        marginBottom: scaleHeight(30)
    },
    wrapInput: {
        width: '100%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: colors.black,
    },
    iconClose: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    dollar: {
        fontSize: scaleFont(18),
        color: "#404040",
        marginRight: scaleWidth(8),
        fontFamily: fonts.LIGHT
    },
})

export default ServiceSalary;
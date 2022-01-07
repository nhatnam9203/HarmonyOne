import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { InputText } from "./InputText";
import { DropdownMenu } from "./DropdownMenu";
import { useForm } from "react-hook-form";
import { headerPhoneGroup } from "@shared/utils";
import { isEmpty } from "lodash";

export const InputPhone = ({
    form,
    error,
    name,
}) => {

    const inputPhoneHeadRef = React.useRef();

    const formInput = useForm({});

    const onblurInput = () => {
        const phoneHead = inputPhoneHeadRef?.current?.getValue()?.value;
        const phoneTail = formInput.getValues(name);
        const phone = `${phoneHead}${phoneTail}`;
        form.setValue(name, phone);
        if (isEmpty(phoneTail)) {
            form.setError(name, { message: 'required', type: 'required' });
        } else {
            form.clearErrors(name);
        }
    }

    return (
        <View style={styles.row}>
            <DropdownMenu
                ref={inputPhoneHeadRef}
                items={headerPhoneGroup}
                onChangeValue={() => { onblurInput() }}
                defaultIndex={0}
                width={scaleWidth(95)}
                height={scaleWidth(42)}
                styleDropDown={styles.styleDropDown}
            />
            <InputText
                style={styles.inputPhone}
                options={{ mask: "999-999-9999" }}
                keyboardType='numeric'
                form={formInput}
                name={name}
                placeholder=""
                error={error}
                onBlur={onblurInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    inputPhone: {
        width: scaleWidth(250),
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },
    styleDropDown: {
        backgroundColor: "#fafafa",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
    },
})

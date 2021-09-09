import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { InputText, InputDropDown, InputActionSheet } from "./widget";
import { fonts } from '@shared/themes';

const headerPhoneGroup = [
    { label: "+1", value: 1 },
    { label: "+84", value: 84 },
];

const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const customerGroup = [
    { label: "Normal", value: "0" },
    { label: "Vip", value: "1" },
];

export const Layout = ({
    inputFirstNameRef,
    inputLastNameRef,
    inputPhoneRef,
    inputEmailRef,
    inputAddressRef,
    inputReferrerPhoneRef,
    inputNoteRef,
    inputCustomerGroupRef,
    inputGenderRef,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('New customer')}
                isRight={false}
            >
                <View style={styles.content}>
                    <InputText
                        label='First name'
                        isRequired
                        ref={inputFirstNameRef}
                    />
                    <InputText
                        label='Last name'
                        isRequired
                        ref={inputLastNameRef}
                    />
                    <InputDropDown
                        label='Phone number'
                        isRequired
                        items={headerPhoneGroup}
                        ref={inputPhoneRef}
                    />
                    <InputActionSheet
                        label='Customer group'
                        items={customerGroup}
                        defaultActiveKey={'0'}
                        ref={inputCustomerGroupRef}
                    />
                    <InputText
                        label='Contact email'
                        ref={inputEmailRef}
                    />
                    <InputActionSheet
                        label='Gender'
                        items={genders}
                        defaultActiveKey={'female'}
                        ref={inputGenderRef}
                    />
                    <InputText
                        label='Address'
                        ref={inputAddressRef}
                    />
                    <InputDropDown
                        label='Referrer phone number'
                        items={headerPhoneGroup}
                        ref={inputReferrerPhoneRef}
                    />
                    <InputText
                        label='Customer note'
                        multiline={true}
                        style={{ height: scaleHeight(69) }}
                        ref={inputNoteRef}
                    />
                    <TouchableOpacity style={styles.buttonConfirm}>
                        <Text style={styles.textConfirm}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        paddingHorizontal: scaleWidth(15),
        position: 'relative',
    },
    flatList: {
        flex: 1,
    },
    buttonConfirm: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#0764B0',
        paddingVertical: scaleHeight(12)
    },
    textConfirm: {
        fontSize: scaleFont(18),
        color: "white",
        fontFamily: fonts.MEDIUM
    }
});

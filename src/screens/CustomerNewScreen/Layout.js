import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { InputText, InputDropDown } from "./widget";
import { fonts } from '@shared/themes';

const headerPhoneGroup = [
    { label: "+1", value: 1 },
    { label: "+84", value: 84 },
];

export const Layout = ({

}) => {

    const inputFirstNameRef = React.useRef();
    const inputLastNameRef = React.useRef();
    const inputPhoneRef = React.useRef();
    const inputEmailRef = React.useRef();
    const inputAddressRef = React.useRef();
    const inputReferrerPhoneRef = React.useRef();
    const inputNoteRef = React.useRef();
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
                    <InputText
                        label='Contact email'
                        ref={inputEmailRef}
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
    iconClose: {
        tintColor: "#333",
        width: scaleWidth(30),
        height: scaleHeight(30),
    },
    buttonClose: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor: "#eeeeee"
    },
    button_plus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(20)
    },
    icon_plus: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    txtNew: {
        fontSize: scaleFont(20),
        color: '#1366AE',
        marginLeft: scaleWidth(15)
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

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button } from "@shared/components";
import { InputText, Input, InputDate } from "./widget";
import { fonts } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    inputReferrerPhoneHeadRef,
    inputPhoneHeadRef,
    inputDateRef,
    onSubmit,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('New customer')}
                isRight={false}
                isScrollLayout={false}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <Input
                        label='First name'
                        isRequired
                        renderInput={() => <InputText ref={inputFirstNameRef} />}
                    />
                    <Input
                        label='Last name'
                        isRequired
                        renderInput={() => <InputText ref={inputLastNameRef} />}
                    />
                    <Input
                        label='Phone number'
                        renderInput={() =>
                            <View style={styles.row}>
                                <DropdownMenu
                                    ref={inputPhoneHeadRef}
                                    items={headerPhoneGroup}
                                    onChangeValue={() => { }}
                                    defaultIndex={0}
                                    width={scaleWidth(95)}
                                    height={scaleWidth(42)}
                                    styleDropDown={styles.styleDropDown}
                                />
                                <InputText
                                    ref={inputPhoneRef}
                                    style={styles.inputPhone}
                                />
                            </View>
                        }
                    />
                    <Input
                        label='Customer group'
                        renderInput={() =>
                            <DropdownMenu
                                ref={inputCustomerGroupRef}
                                items={customerGroup}
                                onChangeValue={() => { }}
                                defaultIndex={0}
                                width={scaleWidth(345)}
                                height={scaleWidth(42)}
                            />
                        }
                    />
                    <Input
                        label='Contact email'
                        renderInput={() => <InputText ref={inputEmailRef} />}
                    />
                    <Input
                        label='Gender'
                        renderInput={() =>
                            <DropdownMenu
                                ref={inputGenderRef}
                                items={genders}
                                onChangeValue={() => { }}
                                defaultIndex={0}
                                width={scaleWidth(345)}
                                height={scaleWidth(42)}
                            />
                        }
                    />
                    <Input
                        label='Birthday'
                        renderInput={() => <InputDate ref={inputDateRef} />}
                    />
                    <Input
                        label='Address'
                        renderInput={() => <InputText ref={inputAddressRef} />}
                    />
                    <Input
                        label='Referrer phone number'
                        renderInput={() =>
                            <View style={styles.row}>
                                <DropdownMenu
                                    ref={inputReferrerPhoneHeadRef}
                                    items={headerPhoneGroup}
                                    onChangeValue={() => { }}
                                    defaultIndex={0}
                                    width={scaleWidth(95)}
                                    height={scaleWidth(42)}
                                    styleDropDown={styles.styleDropDown}
                                />
                                <InputText
                                    ref={inputReferrerPhoneRef}
                                    style={styles.inputPhone}
                                />
                            </View>
                        }
                    />
                    <Input
                        label='Customer note'
                        multiline={true}
                        renderInput={() => <InputText ref={inputNoteRef} style={{ height: scaleHeight(69) }} />}
                    />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label="Save"
                        onPress={() => { }}
                        highlight={true}
                        width={'100%'}
                        onPress={onSubmit}
                    />
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
    row: {
        flexDirection: 'row'
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    }
});

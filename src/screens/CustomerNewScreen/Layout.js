import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText } from "@shared/components";
import { InputDate } from "./InputDate";
import { fonts } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const headerPhoneGroup = [
    { label: "+1", value: "+1" },
    { label: "+84", value: "+84" },
];

const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
];

const customerGroup = [
    { label: "Normal", value: "0" },
    { label: "Vip", value: "1" },
];

export const Layout = ({
    inputDateRef,
    onSubmit,
    form,
    errors,
    inputCustomerGroupRef,
    inputGenderRef,
    inputPhoneHeadRef,
    inputReferrerPhoneHeadRef,
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
                    <CustomInput
                        label='First name'
                        isRequired
                        error={errors?.firstName}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="firstName"
                                placeholder="First name"
                                error={errors?.firstName}
                            />}
                    />
                    <CustomInput
                        label='Last name'
                        isRequired
                        error={errors?.lastName}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="lastName"
                                placeholder="Last name"
                                error={errors?.lastName}
                            />}
                    />
                    <CustomInput
                        label='Phone number'
                        name="phone"
                        isRequired
                        error={errors?.phone}
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
                                    style={styles.inputPhone}
                                    options={{ mask: "999-999-9999" }}
                                    keyboardType='numeric'
                                    form={form}
                                    name="phone"
                                    placeholder="012-3456-789"
                                    error={errors?.phone}
                                />
                            </View>
                        }
                    />
                    <CustomInput
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
                    <CustomInput
                        label='Contact email'
                        error={errors?.email}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="email"
                                placeholder="Email address"
                                error={errors?.email}
                            />
                        }
                    />
                    <CustomInput
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
                    <CustomInput
                        label='Birthday'
                        renderInput={() => <InputDate ref={inputDateRef} />}
                    />
                    <CustomInput
                        label='Address'
                        renderInput={() =>
                            <View>
                                <InputText
                                    form={form}
                                    name="street"
                                    placeholder="Street"
                                />
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                    <InputText
                                        form={form}
                                        name="city"
                                        placeholder="City"
                                        style={{ width: scaleWidth(165) }}
                                    />
                                    <InputText
                                        form={form}
                                        name="zip"
                                        placeholder="Zip"
                                        options={{
                                            mask: "99999999999"
                                        }}
                                        keyboardType='numeric'
                                        style={{ width: scaleWidth(165) }}
                                    />
                                </View>
                                <View>
                                    <InputText
                                        form={form}
                                        name="state"
                                        placeholder="State"
                                        style={{ width: scaleWidth(165) }}
                                    />
                                </View>
                            </View>
                        }
                    />
                    <CustomInput
                        label='Referrer by'
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="referrerBy"
                                placeholder="Referrer by"
                            />
                        }
                    />
                    <CustomInput
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
                                    style={styles.inputPhone}
                                    options={{ mask: "999-999-9999" }}
                                    form={form}
                                    name="referrerPhone"
                                    keyboardType='numeric'
                                    placeholder="012-3456-789"
                                />
                            </View>
                        }
                    />
                    <CustomInput
                        label='Customer note'
                        renderInput={() =>
                            <InputText
                                style={{ height: scaleHeight(69) }}
                                form={form}
                                multiline={true}
                                name="note" />}
                    />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label="Save"
                        onPress={form.handleSubmit(onSubmit)}
                        highlight={true}
                        width={'100%'}
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

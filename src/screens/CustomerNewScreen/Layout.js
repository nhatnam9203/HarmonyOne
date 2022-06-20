import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputState } from "@shared/components";
import { InputDate } from "./InputDate"
import { fonts } from '@shared/themes';
import { headerPhoneGroup, genders, customerGroup } from "@shared/utils"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from "@localize";
// import { InputState } from "./InputState";


export const Layout = ({
    inputDateRef,
    onSubmit,
    form,
    errors,
    isEdit,
    customerDetail,
    inputCustomerGroupRef,
    inputGenderRef,
    inputPhoneHeadRef,
    inputReferrerPhoneHeadRef,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={isEdit ? translate('Edit customer') : translate('New customer')}
                isRight={false}
                isScrollLayout={false}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label={translate('First Name')}
                        isRequired
                        error={errors?.firstName}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="firstName"
                                placeholder={translate("First Name")}
                                error={errors?.firstName}
                            />}
                    />
                    <CustomInput
                        label={translate('Last Name')}
                        isRequired
                        error={errors?.lastName}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="lastName"
                                placeholder={translate("Last Name")}
                                error={errors?.lastName}
                            />}
                    />
                    <CustomInput
                        label={translate('Phone Number')}
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
                        label={translate('Customer Group')}
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
                        label={translate('Contact Email')}
                        error={errors?.email}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="email"
                                placeholder={translate('Contact Email')}
                                error={errors?.email}
                            />
                        }
                    />
                    <CustomInput
                        label={translate('Gender')}
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
                        label={translate('Birthday')}
                        renderInput={() => <InputDate ref={inputDateRef} />}
                    />
                    <CustomInput
                        label={translate('Address')}
                        renderInput={() =>
                            <View>
                                <InputText
                                    form={form}
                                    name="street"
                                    placeholder={translate("Street")}
                                />
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                    <InputText
                                        form={form}
                                        name="city"
                                        placeholder={translate("City")}
                                        style={{ width: scaleWidth(165) }}
                                    />
                                    <InputText
                                        form={form}
                                        name="zip"
                                        placeholder={translate("Zip")}
                                        options={{
                                            mask: "99999999999"
                                        }}
                                        keyboardType='numeric'
                                        style={{ width: scaleWidth(165) }}
                                    />
                                </View>
                                    <InputState
                                        form={form}
                                        name="state"
                                        placeholder={translate("State")}
                                        renderRight={()=>null}
                                    />
                            </View>
                        }
                    />
                    <CustomInput
                        label={translate('Referrer By')}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="referrerBy"
                                placeholder={translate("Referrer By")}
                            />
                        }
                    />
                    <CustomInput
                        label={translate('Referrer Phone Number')}
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
                        label={translate('Note')}
                        renderInput={() =>
                            <InputText
                                style={{ height: scaleHeight(69), alignItems: "flex-start" }}
                                form={form}
                                maxLength={1600}
                                multiline={true}
                                iconCloseStyle={{ marginTop: scaleHeight(5) }}
                                options={{
                                    mask: '**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************'
                                }}
                                name="note" />}
                    />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label={translate("txtSave")}
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
        paddingBottom : 0
    },

});

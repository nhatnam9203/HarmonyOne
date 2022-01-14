import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputState } from "@shared/components";
import { headerPhoneGroup } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources"
import { useWatch } from "react-hook-form";
import { fonts } from "@shared/themes";
import NavigationService from '@navigation/NavigationService'


const merchantTypeGroup = [
    { value: "SalonPos", label: "Salon POS" },
    { value: "Retailer", label: "Retailer" },
    { value: "Restaurant", label: "Table management" },
]


export const Layout = ({
    form,
    errors,
    merchantTYpeRef,
    inputPhoneHeadRef,
    inputPhoneBusinessHeadRef,
    isSameBusinessAddress,
    onChangeIsSameBusinessAddress,
    onSubmit,
}) => {

    const [t] = useTranslation();

    const streetBusinessAddress = useWatch({
        control: form.control,
        name: 'streetBusinessAddress'
    });

    const cityBusinessAddress = useWatch({
        control: form.control,
        name: 'cityBusinessAddress'
    });

    const zipBusinessAddress = useWatch({
        control: form.control,
        name: 'zipBusinessAddress'
    });

    const stateBusinessAddress = useWatch({
        control: form.control,
        name: 'stateBusinessAddress'
    });

    const onBlurStateBusinessAddress = () => {
        if (stateBusinessAddress && isSameBusinessAddress) {
            form.setValue("stateDbaAddress", stateBusinessAddress);
        }
    }


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('General Information')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label='Legal Business Name'
                        isRequired
                        error={errors?.businessName}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="businessName"
                                placeholder="Legal Business Names"
                                error={errors?.businessName}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label='Doing Business As(DBA)'
                        isRequired
                        blackLabel={true}
                        error={errors?.doingBusiness}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="doingBusiness"
                                placeholder="DBA"
                                error={errors?.doingBusiness}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label='Merchant type'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <DropdownMenu
                                ref={merchantTYpeRef}
                                items={merchantTypeGroup}
                                onChangeValue={() => { }}
                                defaultIndex={0}
                                height={scaleWidth(42)}
                            />
                        }
                    />

                    <CustomInput
                        label='Federal Tax ID'
                        isRequired
                        blackLabel={true}
                        error={errors.tax}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="tax"
                                placeholder="99-9999999"
                                error={errors?.tax}
                                options={{ mask: "99-9999999" }}
                                keyboardType='numeric'
                                renderRight={() => <View />}
                            />
                        }
                    />

                    <View style={{ marginTop: scaleHeight(16) }}>
                        <CustomInput
                            label='Business Address(no P.O.Boxes)'
                            isRequired
                            blackLabel={true}
                            renderInput={() =>
                                <View>
                                    <InputText
                                        form={form}
                                        name="streetBusinessAddress"
                                        placeholder="Street Address"
                                        error={errors?.streetBusinessAddress}
                                        renderRight={() => <View />}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                        <InputText
                                            form={form}
                                            name="cityBusinessAddress"
                                            placeholder="City"
                                            style={{ width: scaleWidth(165) }}
                                            error={errors?.cityBusinessAddress}
                                            renderRight={() => <View />}
                                        />
                                        <InputText
                                            form={form}
                                            name="zipBusinessAddress"
                                            placeholder="Zip Code"
                                            style={{ width: scaleWidth(165) }}
                                            error={errors?.zipBusinessAddress}
                                            renderRight={() => <View />}
                                        />
                                    </View>

                                    <InputState
                                        form={form}
                                        name="stateBusinessAddress"
                                        placeholder="State"
                                        renderRight={() => <View />}
                                        error={errors?.stateBusinessAddress}
                                        onBlurInput={onBlurStateBusinessAddress}
                                    />
                                    {
                                        errors?.stateBusinessAddress && errors?.stateBusinessAddress?.message !== "required" &&
                                        <Text style={{ color: "red", fontSize: scaleFont(16), fontFamily: fonts.MEDIUM, marginTop: scaleHeight(8) }}>
                                            {errors?.stateBusinessAddress?.message}
                                        </Text>
                                    }
                                </View>
                            }
                        />
                    </View>

                    <View style={{ marginVertical: scaleHeight(16) }}>
                        <CustomInput
                            label='DBA Address'
                            isRequired
                            blackLabel={true}
                            renderRight={() => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => onChangeIsSameBusinessAddress(!isSameBusinessAddress)}
                                    style={{ flexDirection: "row", alignItems: "center", marginTop: -8, marginLeft: scaleWidth(15) }}>
                                    <Image
                                        source={isSameBusinessAddress ? images.checkBox : images.checkBoxEmpty}
                                        style={{ width: scaleWidth(17), height: scaleWidth(17) }}
                                    />
                                    <Text style={{ fontSize: scaleFont(11), fontFamily: fonts.REGULAR, marginLeft: scaleWidth(8) }}>
                                        Same as Business Address
                                    </Text>
                                </TouchableOpacity>
                            )}
                            renderInput={() =>
                                <View>
                                    <InputText
                                        form={form}
                                        name="streetDbaAddress"
                                        placeholder="Street Address"
                                        error={(errors?.streetDbaAddress && !isSameBusinessAddress) || (errors.streetBusinessAddress && isSameBusinessAddress)}
                                        valueVisible={isSameBusinessAddress ? streetBusinessAddress : null}
                                        renderRight={() => <View />}
                                        editable={!isSameBusinessAddress}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                        <InputText
                                            form={form}
                                            name="cityDbaAddress"
                                            placeholder="City"
                                            style={{ width: scaleWidth(165) }}
                                            error={(errors?.cityDbaAddress && !isSameBusinessAddress) || (errors.cityBusinessAddress && isSameBusinessAddress)}
                                            valueVisible={isSameBusinessAddress ? cityBusinessAddress : null}
                                            renderRight={() => <View />}
                                            editable={!isSameBusinessAddress}
                                        />
                                        <InputText
                                            form={form}
                                            name="zipDbaAddress"
                                            placeholder="Zip Code"
                                            style={{ width: scaleWidth(165) }}
                                            error={(errors?.zipDbaAddress && !isSameBusinessAddress) || (errors.zipBusinessAddress && isSameBusinessAddress)}
                                            valueVisible={isSameBusinessAddress ? zipBusinessAddress : null}
                                            renderRight={() => <View />}
                                            editable={!isSameBusinessAddress}
                                        />
                                    </View>

                                    <InputState
                                        form={form}
                                        name="stateDbaAddress"
                                        placeholder="State"
                                        renderRight={() => <View />}
                                        error={(errors?.stateDbaAddress && !isSameBusinessAddress) || (errors.stateBusinessAddress && isSameBusinessAddress)}
                                        editable={!isSameBusinessAddress}
                                        valueVisible={isSameBusinessAddress ? stateBusinessAddress : null}
                                    />
                                    {
                                        errors?.stateDbaAddress && errors?.stateDbaAddress?.message !== "required" &&
                                        <Text style={{ color: "red", fontSize: scaleFont(16), fontFamily: fonts.MEDIUM, marginTop: scaleHeight(8) }}>
                                            {errors?.stateDbaAddress?.message}
                                        </Text>
                                    }
                                </View>
                            }
                        />
                    </View>

                    <CustomInput
                        label='Business Phone'
                        isRequired
                        blackLabel={true}
                        error={errors?.businessPhone}
                        renderInput={() =>
                            <View style={styles.row}>
                                <DropdownMenu
                                    ref={inputPhoneBusinessHeadRef}
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
                                    name="businessPhone"
                                    placeholder="012-3456-789"
                                    error={errors?.businessPhone}
                                    renderRight={() => <View />}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Contact Email Address'
                        isRequired
                        blackLabel={true}
                        error={errors?.email}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="email"
                                placeholder="example@gmail.com"
                                error={errors?.email}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label='Contact Name'
                        isRequired
                        blackLabel={true}
                        error={errors?.firstName || errors.lastName}
                        renderInput={() =>
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="firstName"
                                    placeholder="First Name"
                                    error={errors?.firstName}
                                    renderRight={() => <View />}
                                />
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="lastName"
                                    placeholder="Last Name"
                                    error={errors?.lastName}
                                    renderRight={() => <View />}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Title/Position'
                        isRequired
                        blackLabel={true}
                        error={errors.position}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="position"
                                placeholder="President/Manager/Owner"
                                error={errors?.position}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label='Contact Phone Number'
                        isRequired
                        blackLabel={true}
                        error={errors?.contactPhone}
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
                                    name="contactPhone"
                                    placeholder=""
                                    error={errors?.contactPhone}
                                    renderRight={() => <View />}
                                />
                            </View>
                        }
                    />

                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label="Next"
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
        padding: scaleWidth(16),
        paddingTop: scaleHeight(16),
    },

    inputName: {
        width: scaleWidth(165),
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },

    inputPhone: {
        width: scaleWidth(247),
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
    },
});

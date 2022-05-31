import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputState } from "@shared/components";
import { headerPhoneGroup } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources"
import { useWatch } from "react-hook-form";
import { fonts } from "@shared/themes";
import { translate } from "@localize";
import NavigationService from '@navigation/NavigationService';


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
                pageTitle={translate("txtGeneralInformation")}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label={translate("txtLegalBusinessName")}
                        isRequired
                        error={errors?.businessName}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="businessName"
                                placeholder={translate("txtLegalBusinessName")}
                                error={errors?.businessName}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate("txtDoingBusiness")}
                        isRequired
                        blackLabel={true}
                        error={errors?.doingBusiness}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="doingBusiness"
                                placeholder={translate("txtDoingBusiness")}
                                error={errors?.doingBusiness}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate("txtMerchantType")}
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
                        label={translate("txtFederalTaxID")}
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
                            label={translate("txtBusinessAddress")}
                            isRequired
                            blackLabel={true}
                            renderInput={() =>
                                <View>
                                    <InputText
                                        form={form}
                                        name="streetBusinessAddress"
                                        placeholder={translate("txtStreetAddress")}
                                        error={errors?.streetBusinessAddress}
                                        renderRight={() => <View />}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                        <InputText
                                            form={form}
                                            name="cityBusinessAddress"
                                            placeholder={translate("txtCity")}
                                            style={{ width: scaleWidth(165) }}
                                            error={errors?.cityBusinessAddress}
                                            renderRight={() => <View />}
                                        />
                                        <InputText
                                            form={form}
                                            name="zipBusinessAddress"
                                            placeholder={translate("txtZipcode")}
                                            style={{ width: scaleWidth(165) }}
                                            error={errors?.zipBusinessAddress}
                                            renderRight={() => <View />}
                                        />
                                    </View>

                                    <InputState
                                        form={form}
                                        name="stateBusinessAddress"
                                        placeholder={translate("txtState")}
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
                            label={translate("txtDbaAddress")}
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
                                        {translate("txtSameAsBusinessAddress")}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            renderInput={() =>
                                <View>
                                    <InputText
                                        form={form}
                                        name="streetDbaAddress"
                                        placeholder={translate("txtStreetAddress")}
                                        error={(errors?.streetDbaAddress && !isSameBusinessAddress) || (errors.streetBusinessAddress && isSameBusinessAddress)}
                                        valueVisible={isSameBusinessAddress ? streetBusinessAddress : null}
                                        renderRight={() => <View />}
                                        editable={!isSameBusinessAddress}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                        <InputText
                                            form={form}
                                            name="cityDbaAddress"
                                            placeholder={translate("txtCity")}
                                            style={{ width: scaleWidth(165) }}
                                            error={(errors?.cityDbaAddress && !isSameBusinessAddress) || (errors.cityBusinessAddress && isSameBusinessAddress)}
                                            valueVisible={isSameBusinessAddress ? cityBusinessAddress : null}
                                            renderRight={() => <View />}
                                            editable={!isSameBusinessAddress}
                                        />
                                        <InputText
                                            form={form}
                                            name="zipDbaAddress"
                                            placeholder={translate("txtZipcode")}
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
                                        placeholder={translate("txtState")}
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
                        label={translate("txtBusinessPhone")}
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
                        label={translate("txtContactEmailAddress")}
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
                        label={translate("txtContactName")}
                        isRequired
                        blackLabel={true}
                        error={errors?.firstName || errors.lastName}
                        renderInput={() =>
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="firstName"
                                    placeholder={translate("txtFirstName")}
                                    error={errors?.firstName}
                                    renderRight={() => <View />}
                                />
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="lastName"
                                    placeholder={translate("txtLastName")}
                                    error={errors?.lastName}
                                    renderRight={() => <View />}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label={`${translate("txtTitle")}/${translate("txtPosition")}`}
                        isRequired
                        blackLabel={true}
                        error={errors.position}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="position"
                                placeholder={`${translate("txtPresident")}/${translate("txtManager")}/${translate("txtOwner")}`}
                                error={errors?.position}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate("txtContactPhoneNumber")}
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
                        label={translate("txtNext")}
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

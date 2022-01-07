import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText } from "@shared/components";
import { headerPhoneGroup } from "@shared/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources"
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
    setIsSameBusinessAddress,
    onSubmit,

}) => {

    const [t] = useTranslation();

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
                        label='Legal Business Names'
                        isRequired
                        error={errors?.firstName}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="firstName"
                                placeholder="Legal Business Names*"
                                error={errors?.firstName}
                            />}
                    />

                    <CustomInput
                        label='Doing Business As(DBA)'
                        isRequired
                        blackLabel={true}
                        error={errors?.lastName}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="lastName"
                                placeholder="DBA"
                                error={errors?.lastName}
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
                                width={scaleWidth(345)}
                                height={scaleWidth(42)}
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
                                        name="street"
                                        placeholder="Street Address"
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
                                            placeholder="Zip Code"
                                            style={{ width: scaleWidth(165) }}
                                        />
                                    </View>

                                    <InputText
                                        form={form}
                                        name="state"
                                        placeholder="State"
                                    />
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
                                    onPress={() => setIsSameBusinessAddress(!isSameBusinessAddress)}
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
                                        name="street"
                                        placeholder="Street Address"
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
                                            name="state"
                                            placeholder="State"
                                            style={{ width: scaleWidth(165) }}
                                        />
                                    </View>
                                    <InputText
                                        form={form}
                                        name="zip"
                                        placeholder="Zip Code"
                                        style={{ width: scaleWidth(165) }}
                                    />
                                </View>
                            }
                        />
                    </View>

                    <CustomInput
                        label='Federal Tax ID'
                        isRequired
                        blackLabel={true}
                        error={errors?.federal}
                        renderInput={() =>
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <InputText
                                    style={[styles.inputName, { width: scaleWidth(95) }]}
                                    form={form}
                                    name="federal"
                                    placeholder=""
                                    error={errors?.federal}
                                />

                                <InputText
                                    style={[styles.inputName, { width: scaleWidth(240) }]}
                                    form={form}
                                    name="federal"
                                    placeholder=""
                                    error={errors?.federal}
                                />
                            </View>
                        }
                    />

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
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Contact Email Address'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="lastName"
                                placeholder="example@gmail.com"
                                error={errors?.lastName}
                            />}
                    />

                    <CustomInput
                        label='Contact Name'
                        isRequired
                        blackLabel={true}
                        error={errors?.contactName}
                        renderInput={() =>
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="phone"
                                    placeholder="First Name"
                                    error={errors?.firstName}
                                />
                                <InputText
                                    style={styles.inputName}
                                    form={form}
                                    name="phone"
                                    placeholder="Last Name"
                                    error={errors?.lastName}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Title/Position'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="position"
                                placeholder="President/Manager/Owner"
                                error={errors?.position}
                            />}
                    />

                    <CustomInput
                        label='Contact Phone Number'
                        isRequired
                        blackLabel={true}
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
    },
});

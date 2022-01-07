import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, DropdownMenu, InputDate } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources";
import { fonts } from "@shared/themes";
import { WithPopupUpload } from '@shared/HOC';
import { headerPhoneGroup } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

let ButtonUpload = ({ onResponseImagePicker, ...props }) => (
    <TouchableOpacity
        style={styles.containerUpload}
        onResponseImagePicker={onResponseImagePicker}
        {...props}
    >
        <Image
            source={images.camera}
            style={styles.iconCamera}
        />
        <Text style={styles.txtTakePhoto}>
            Take a photo
        </Text>
        <Text style={[styles.txtTakePhoto, styles.txtOr]}>
            Or
        </Text>
        <View style={styles.wrapBrowseFile}>
            <Text style={[styles.txtTakePhoto, styles.txtBrowFile]}>
                Browse File
            </Text>
        </View>
    </TouchableOpacity>
);

ButtonUpload = WithPopupUpload(ButtonUpload);

export const Layout = ({
    form,
    errors,
    onSubmit,
    onResponseImagePicker,
    inputHomePhoneHeadRef,
    inputmobilePhoneHeadRef,
    inputDateRef,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('Application')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label='Principal Name'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <InputText
                                    form={form}
                                    name="firstName"
                                    placeholder="First Name"
                                    style={{ width: scaleWidth(165) }}
                                />
                                <InputText
                                    form={form}
                                    name="lastName"
                                    placeholder="Last Name"
                                    style={{ width: scaleWidth(165) }}
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
                                isRequired
                            />
                        }
                    />

                    <CustomInput
                        label='Ownership(%)'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="ownerShip"
                                placeholder=""
                                isRequired
                                options={{ mask: "999999999999999999" }}
                                keyboardType='numeric'
                            />
                        }
                    />

                    <CustomInput
                        label='Home Phone'
                        isRequired
                        blackLabel={true}
                        error={errors?.businessPhone}
                        renderInput={() =>
                            <View style={styles.row}>
                                <DropdownMenu
                                    ref={inputHomePhoneHeadRef}
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
                                    name="homePhone"
                                    placeholder=""
                                    error={errors?.homePhone}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Mobile Phone'
                        isRequired
                        blackLabel={true}
                        error={errors?.mobilePhone}
                        renderInput={() =>
                            <View style={styles.row}>
                                <DropdownMenu
                                    ref={inputmobilePhoneHeadRef}
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
                                    name="mobilePhone"
                                    placeholder=""
                                    error={errors?.mobilePhone}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Address'
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

                    <CustomInput
                        label='Year at this address'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="year"
                                placeholder=""
                                isRequired
                                options={{ mask: "9999" }}
                                keyboardType='numeric'
                            />
                        }
                    />

                    <CustomInput
                        label='Social Security Number (SSN)'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="year"
                                placeholder="000-00-0000"
                                isRequired
                                options={{ mask: "999-99-9999" }}
                                keyboardType='numeric'
                            />
                        }
                    />

                    <CustomInput
                        label='Date of birth (mm/dd/yyyy)'
                        isRequired
                        blackLabel={true}
                        renderInput={() => <InputDate ref={inputDateRef} />}
                    />

                    <CustomInput
                        label='Email Address'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="email"
                                placeholder="example@gmail.com"
                                isRequired
                            />
                        }
                    />

                    <CustomInput
                        label='Driver License Number'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="drivenLicense"
                                placeholder=""
                                isRequired
                            />
                        }
                    />

                    <CustomInput
                        label='State Issued'
                        isRequired
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="stateIssued"
                                placeholder=""
                                isRequired
                            />
                        }
                    />

                    <Text style={styles.txtVoidCheck}>Please take or upload photos of Driver License*</Text>

                    <ButtonUpload
                        onResponseImagePicker={onResponseImagePicker}
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
    wrapBrowseFile: {
        paddingVertical: scaleHeight(5),
        paddingHorizontal: scaleWidth(20),
        borderWidth: 1,
        borderColor: "#dddddd",
        borderStyle: "solid",
        borderRadius: 3
    },
    txtBrowFile: {
        fontFamily: fonts.REGULAR,
    },
    txtOr: {
        fontFamily: fonts.REGULAR,
        marginVertical: scaleHeight(20)
    },
    txtTakePhoto: {
        fontSize: scaleFont(18),
        color: "#C4C4C4",
        fontFamily: fonts.BOLD
    },
    iconCamera: {
        width: scaleWidth(60),
        height: scaleWidth(60),
        resizeMode: 'contain'
    },
    containerUpload: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#dddddd",
        borderStyle: 'dashed',
        alignItems: "center",
        paddingVertical: scaleHeight(8),
        marginTop: scaleHeight(24)
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
        paddingTop: scaleHeight(16),
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },

    label: {
        fontSize: scaleFont(17),
        color: '#585858',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.MEDIUM
    },

    required: {
        color: 'red',
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18),
    },

    txtVoidCheck: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#585858"
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
        flexDirection: "row"
    },

    txtVoidCheck: {
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM,
        color: "#585858"
    }
});

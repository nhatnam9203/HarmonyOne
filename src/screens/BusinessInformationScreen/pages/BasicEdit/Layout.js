import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button, CustomInput, InputText, IconButton, DropdownMenu } from "@shared/components";
import { headerPhoneGroup } from "@shared/utils"
import { images } from "@shared/themes/resources";
import { useForm } from "react-hook-form";

export const Layout = ({
    merchantDetail,
    inputPhoneHeadRef
}) => {

    const [t] = useTranslation();

    const form = useForm();
    const { errors } = form.formState;


    React.useEffect(() => {
        form.setValue("businessName", merchantDetail?.businessName);
        form.setValue("email", merchantDetail?.email)
        form.setValue("webLink", merchantDetail?.webLink)
        let merchantPhone = merchantDetail?.cellPhone;
        let phone = '';
        if (merchantPhone.toString().includes("+84")) {
            phone = merchantPhone.toString().slice(3);
            form.setValue("phone", phone);
            inputPhoneHeadRef?.current?.changeValue({ label: "+84", value: "+84" });
        } else {
            phone = merchantPhone.toString().slice(2);
            form.setValue("phone", phone);
            inputPhoneHeadRef?.current?.changeValue({ label: "+1", value: "+1" });
        }


    }, []);

    const onSubmit = () => {

    }

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t("Basic Informations")}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}
            >
                <View style={styles.content}>
                    <CustomInput
                        label='Business name'
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="businessName"
                            />
                        }
                    />
                    <CustomInput
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
                                    style={styles.inputPhone}
                                    options={{ mask: "999-999-9999" }}
                                    form={form}
                                    name="phone"
                                    keyboardType='numeric'
                                    placeholder="012-3456-789"
                                />
                            </View>
                        }
                    />
                    <CustomInput
                        label='Contact email'
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="email"
                            />
                        }
                    />
                    <CustomInput
                        label='Website'
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="webLink"
                            />
                        }
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={form.handleSubmit(onSubmit)}
                        height={scaleHeight(48)}
                        width='100%'
                        label={t('Save')}
                        highlight={true}
                        disabled={errors?.categoryName}
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
        padding: scaleWidth(16)
    },

    bottom: {
        paddingHorizontal: scaleWidth(16),
        paddingBottom: scaleHeight(32)
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

});

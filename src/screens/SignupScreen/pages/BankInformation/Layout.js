import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, CustomImage } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources";
import { fonts } from "@shared/themes";
import { WithPopupUpload } from '@shared/HOC';
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

let ButtonUpload = ({ onResponseImagePicker, imageUrl ,...props }) => (
    <TouchableOpacity
        style={[styles.containerUpload,{ borderWidth : imageUrl ? 0 : 2 }]}
        onResponseImagePicker={onResponseImagePicker}
        {...props}
    >
        {
            imageUrl ?
                <CustomImage
                    source={{ uri: imageUrl }}
                    style={{ width: "100%", height: scaleHeight(300) }}
                /> :
                <>
                    <Image
                        source={images.camera}
                        style={styles.iconCamera}
                    />
                    <Text style={styles.txtTakePhoto}>
                        {translate("Take a photo")}
                    </Text>
                    <Text style={[styles.txtTakePhoto, styles.txtOr]}>
                        {translate("Or")}
                    </Text>
                    <View style={styles.wrapBrowseFile}>
                        <Text style={[styles.txtTakePhoto, styles.txtBrowFile]}>
                            {translate("Browse File")}
                        </Text>
                    </View>
                </>
        }
    </TouchableOpacity>
);

ButtonUpload = WithPopupUpload(ButtonUpload);

export const Layout = ({
    form,
    errors,
    onSubmit,
    onResponseImagePicker,
    imageUrl
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Bank Information')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label={translate('Account Holder Name')}
                        isRequired
                        error={errors?.accountHolderName}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="accountHolderName"
                                placeholder=""
                                error={errors?.accountHolderName}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate('Bank Name')}
                        isRequired
                        error={errors?.bankName}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="bankName"
                                placeholder=""
                                error={errors?.bankName}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate('Routing Number (ABA)')}
                        isRequired
                        error={errors?.routingNumber}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="routingNumber"
                                placeholder=""
                                error={errors?.routingNumber}
                                renderRight={() => <View />}
                            />}
                    />

                    <CustomInput
                        label={translate('Account Number (DDA)')}
                        isRequired
                        error={errors?.accountNumber}
                        blackLabel={true}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="accountNumber"
                                placeholder=""
                                error={errors?.accountNumber}
                                renderRight={() => <View />}
                            />}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.label}>
                            {translate("Void check")}
                        </Text>
                        <Text style={styles.required}>
                            *
                        </Text>
                    </View>

                    <Text style={styles.txtVoidCheck}>{translate("Please take or upload photos of void check")}</Text>

                    <ButtonUpload
                        onResponseImagePicker={onResponseImagePicker}
                        imageUrl={imageUrl}
                    />
                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label={("txtNext")}
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
    }
});

import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Button, CustomInput, InputText, InputDate, InputState, CustomImage, LazyImage, InputDateForm, InputPhone, } from "@shared/components";
import { images } from "@shared/themes/resources";
import { fonts } from "@shared/themes";
import { WithPopupUpload } from '@shared/HOC';
import { uploadAvatarStaff } from "@src/apis";
import { axios } from '@shared/services/axiosClient';
import { useWatch } from "react-hook-form";
import { createFormData } from '@shared/utils';
import { useDispatch } from "react-redux";
import { app } from "@redux/slices";


let ButtonUpload = ({ onResponseImagePicker, imageUrl, ...props }) => (
    <TouchableOpacity
        style={[styles.containerUpload, { borderWidth: imageUrl ? 0 : 2 }]}
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
                </>
        }
    </TouchableOpacity>
);

ButtonUpload = WithPopupUpload(ButtonUpload);

export const ItemPrincipal = ({
    form,
    index,
    errors,
    checkErrors
}) => {
    const dispatch = useDispatch();

    const [imageUrl, setImageUrl] = React.useState(null);

    const [isActive, setActive] = React.useState(true);

    const fileId = useWatch({
        control: form.control,
        name: `principalInfor.${index}.fileId`
    })

    React.useEffect(() => {
        if (index == 1) {
            setActive(false);
        }
    }, []);

    const uploadImage = async (body) => {
        try {
            dispatch(app.showLoading());
            const response = await axios(body);

            if (response?.data?.codeNumber == 200) {
                dispatch(app.hideLoading());
                form.setValue(`principalInfor.${index}.fileId`, response?.data?.data?.fileId?.toString() ?? 0)
                setImageUrl(response?.data?.data?.url);
                checkErrors();
            } else {
                dispatch(app.hideLoading());
            }
        } catch (err) {
            dispatch(app.hideLoading());
        } finally {

        }
    }

    const onResponseImagePicker = async (response) => {
        console.log('response image : ', { response })
        let files = response?.assets ?? [];
        files = createFormData(files);
        const body = await uploadAvatarStaff(files);
        uploadImage(body.params);
    }

    return (
        <View style={{ marginBottom: scaleHeight(15) }} key={index + "principalinfor"}>
            <ActiveButton isActive={isActive} setActive={setActive} index={index} />

            {
                isActive &&
                <>
                    <CustomInput
                        label='Principal Name'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.lastName || errors?.principalInfor?.[index]?.firstName}
                        renderInput={() =>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <InputText
                                    form={form}
                                    name={`principalInfor.${index}.firstName`}
                                    placeholder="First Name"
                                    error={errors?.principalInfor?.[index]?.firstName}
                                    style={{ width: scaleWidth(165) }}
                                    renderRight={() => <View />}
                                    onBlur={checkErrors}
                                />
                                <InputText
                                    form={form}
                                    name={`principalInfor.${index}.lastName`}
                                    placeholder="Last Name"
                                    error={errors?.principalInfor?.[index]?.lastName}
                                    style={{ width: scaleWidth(165) }}
                                    renderRight={() => <View />}
                                    onBlur={checkErrors}
                                />
                            </View>
                        }
                    />

                    <CustomInput
                        label='Title/Position'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.position}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name={`principalInfor.${index}.position`}
                                placeholder="President/Manager/Owner"
                                error={errors?.principalInfor?.[index]?.position}
                                isRequired
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Ownership(%)'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.ownership}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name="ownership"
                                name={`principalInfor.${index}.ownership`}
                                placeholder=""
                                isRequired
                                options={{ mask: "999999" }}
                                keyboardType='numeric'
                                error={errors?.principalInfor?.[index]?.ownership}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Home Phone'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.homePhone}
                        renderInput={() =>
                            <InputPhone
                                form={form}
                                name={`principalInfor.${index}.homePhone`}
                                error={errors?.principalInfor?.[index]?.homePhone}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Mobile Phone'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.mobilePhone}
                        renderInput={() =>
                            <View style={styles.row}>
                                <InputPhone
                                    form={form}
                                    name={`principalInfor.${index}.mobilePhone`}
                                    error={errors?.principalInfor?.[index]?.mobilePhone}
                                    renderRight={() => <View />}
                                    onBlur={checkErrors}
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
                                    name={`principalInfor.${index}.street`}
                                    placeholder="Street Address"
                                    error={errors?.principalInfor?.[index]?.street}
                                    renderRight={() => <View />}
                                    onBlur={checkErrors}
                                />
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                    <InputText
                                        form={form}
                                        name={`principalInfor.${index}.city`}
                                        placeholder="City"
                                        style={{ width: scaleWidth(165) }}
                                        error={errors?.principalInfor?.[index]?.city}
                                        renderRight={() => <View />}
                                        onBlur={checkErrors}
                                    />
                                    <InputText
                                        form={form}
                                        name={`principalInfor.${index}.zip`}
                                        placeholder="Zip Code"
                                        style={{ width: scaleWidth(165) }}
                                        error={errors?.principalInfor?.[index]?.zip}
                                        renderRight={() => <View />}
                                        onBlur={checkErrors}
                                    />
                                </View>

                                <InputState
                                    form={form}
                                    name="state"
                                    name={`principalInfor.${index}.state`}
                                    placeholder="State"
                                    error={errors?.principalInfor?.[index]?.state}
                                    renderRight={() => <View />}
                                    onBlur={checkErrors}
                                />
                                {
                                    errors?.principalInfor?.[index]?.state && errors?.principalInfor?.[index]?.state?.message !== "required" &&
                                    <Text style={{ color: "red", fontSize: scaleFont(16), fontFamily: fonts.MEDIUM, marginTop: scaleHeight(8) }}>
                                        {errors?.principalInfor?.[index]?.state?.message}
                                    </Text>
                                }
                            </View>
                        }
                    />

                    <CustomInput
                        label='Year at this address'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.yearAtThisAddress}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name={`principalInfor.${index}.yearAtThisAddress`}
                                placeholder=""
                                isRequired
                                options={{ mask: "9999" }}
                                keyboardType='numeric'
                                error={errors?.principalInfor?.[index]?.yearAtThisAddress}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Social Security Number (SSN)'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.ssn}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name={`principalInfor.${index}.ssn`}
                                placeholder="000-00-0000"
                                isRequired
                                options={{ mask: "999-99-9999" }}
                                keyboardType='numeric'
                                error={errors?.principalInfor?.[index]?.ssn}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Date of birth (mm/dd/yyyy)'
                        isRequired
                        blackLabel={true}
                        renderInput={() => <InputDateForm form={form} name={`principalInfor.${index}.dateOfBirth`} />}
                    />

                    <CustomInput
                        label='Email Address'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.email}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name={`principalInfor.${index}.email`}
                                placeholder="example@gmail.com"
                                isRequired
                                error={errors?.principalInfor?.[index]?.email}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='Driver License Number'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.driverLicense}
                        renderInput={() =>
                            <InputText
                                form={form}
                                name={`principalInfor.${index}.driverLicense`}
                                placeholder=""
                                isRequired
                                error={errors?.principalInfor?.[index]?.driverLicense}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />

                    <CustomInput
                        label='State Issued'
                        isRequired
                        blackLabel={true}
                        error={errors?.principalInfor?.[index]?.stateIssued}
                        renderInput={() =>
                            <InputState
                                form={form}
                                name={`principalInfor.${index}.stateIssued`}
                                placeholder=""
                                isRequired
                                error={errors?.principalInfor?.[index]?.stateIssued}
                                renderRight={() => <View />}
                                onBlur={checkErrors}
                            />
                        }
                    />



                    <Text style={styles.txtVoidCheck}>Please take or upload photos of Driver License*</Text>

                    {errors?.principalInfor?.[index]?.fileId && <Text style={styles.txtErrorImage}>Required</Text>}
                    <ButtonUpload
                        onResponseImagePicker={onResponseImagePicker}
                        imageUrl={imageUrl}
                    />
                </>}

        </View>
    )
}

const ActiveButton = ({ isActive, setActive, index }) => (
    <View style={styles.principalLine}>
        <Pressable
            onPress={() => setActive(!isActive)}
            style={{ flexDirection: "row", alignItems: "center" }}
        >
            <Text style={styles.txtTitle}>
                Principal {index + 1}:
            </Text>
            <Image
                source={images.top_scroll_active}
                style={[styles.iconArrow, { transform: [{ rotate: !isActive ? "270deg" : "0deg" }] }]}
            />
        </Pressable>
        <View style={styles.line} />
    </View>
)


const styles = StyleSheet.create({
    txtErrorImage: {
        textAlign: "right", color: "red", fontSize: scaleFont(16), fontFamily: fonts.MEDIUM, marginTop: scaleHeight(16)
    },
    txtTitle: {
        fontSize: scaleFont(16),
        color: "#000"
    },
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
    },
    iconArrow: {
        tintColor: "#000",
        marginHorizontal: scaleWidth(8)
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: "#404040"
    },
    principalLine: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: scaleHeight(16)
    }
});

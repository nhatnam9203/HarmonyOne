import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { Button, CustomInput, InputText, InputSelect, IconButton } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { translate } from "@localize";


const InputPincode = ({
    form,
    errors
}) => {

    const [isPassword, showPassword] = React.useState(true);

    const changeStatusPassword = () => {
        showPassword(status => !status);
    }

    return (
        <>
            <CustomInput
                label={translate('Pin code')}
                isRequired
                error={errors?.pin}
                renderInput={() =>
                    <InputText
                        form={form}
                        secureTextEntry={isPassword}
                        name="pin"
                        options={{
                            mask: "****"
                        }}
                        placeholder="****"
                        error={errors?.pin}
                        style={{ alignItems: 'center' }}
                        renderRight={() =>
                            <IconButton
                                icon={isPassword ? images.iconEye : images.iconHidden}
                                style={styles.iconEye}
                                onPress={changeStatusPassword}
                            />
                        }
                    />
                }
            />

            <CustomInput
                label={translate('Confirm Pin code')}
                isRequired
                error={errors?.confirmPin}
                renderInput={() =>
                    <InputText
                        form={form}
                        secureTextEntry={isPassword}
                        name="confirmPin"
                        options={{
                            mask: "****"
                        }}
                        placeholder="****"
                        error={errors?.confirmPin}
                        style={{ alignItems: 'center' }}
                        renderRight={() =>
                            <IconButton
                                icon={isPassword ? images.iconEye : images.iconHidden}
                                style={styles.iconEye}
                                onPress={changeStatusPassword}
                            />
                        }
                    />
                }
            />

        </>
    )
}

export default InputPincode;

const styles = StyleSheet.create({
    iconEye: {
        width: scaleWidth(18),
        height: scaleWidth(18),
        marginRight: scaleWidth(8)
    }
})
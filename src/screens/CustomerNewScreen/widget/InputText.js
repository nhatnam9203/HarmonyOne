import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { TextInputMask } from "react-native-masked-text"
import { useController } from "react-hook-form";

const InputText = React.forwardRef(({
    placeholder = '',
    style,
    inputStyle,
    multiline = false,
    type = "custom",
    options = {
        mask: "**************************************************"
    },
    name,
    form,
    error,
    keyboardType='default'
}, ref) => {

    const [isFocus, setFocus] = React.useState(false);

    const { field } = useController({
        control: form.control,
        defaultValue: "",
        name,
    })

    return (
        <View style={[styles.containerInput]}>
            <View style={[styles.wrapInput, style, {
                borderColor: isFocus ? colors.ocean_blue : error ? "red" : '#cccccc'
            }]}>
                <TextInputMask
                    type={type}
                    options={options}
                    onChangeText={field.onChange}
                    placeholder={placeholder}
                    value={field.value}
                    style={[styles.input, inputStyle]}
                    multiline={multiline}
                    textAlignVertical="top"
                    keyboardType={keyboardType}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                {
                    field.value.length > 0 &&
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={styles.iconClose}
                        onPress={() => field.onChange('')}
                    />
                }
            </View>
        </View>
    )
});



const styles = StyleSheet.create({
    containerInput: {
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    wrapInput: {
        width: '100%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
    },
    input: {
        flex: 1,
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: colors.black,
    },
    iconClose: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    }
});

export default InputText;
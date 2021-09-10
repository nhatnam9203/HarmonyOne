import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

const InputText = React.forwardRef(({
    placeholder = '',
    style,
    multiline = false,
    inputStyle
}, ref) => {

    const [value, setValue] = React.useState("");
    const [isFocus, setFocus] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        getValue: () => value,
        changeValue: (vl) => setValue(vl),
    }));

    return (
        <View style={[styles.containerInput]}>
            <View style={[styles.wrapInput, style,{ borderColor : isFocus ? colors.ocean_blue : '#cccccc' }]}>
                <TextInput
                    onChangeText={(vl) => setValue(vl)}
                    placeholder={placeholder}
                    value={value}
                    style={[styles.input, inputStyle]}
                    multiline={multiline}
                    textAlignVertical="top"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                {
                    value.length > 0 &&
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={styles.iconClose}
                        onPress={() => setValue('')}
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
        borderRadius: 5,
        paddingHorizontal: scaleWidth(10),
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40
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
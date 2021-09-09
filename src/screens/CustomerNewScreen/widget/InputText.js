import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts } from '@shared/themes';
import { slop } from "@shared/utils";
import { iconClose } from "@shared/themes/resources";

const InputText = React.forwardRef(({
    placeholder = '',
    style,
    label = '',
    isRequired = false,
    multiline = false,
    inputStyle
}, ref) => {

    const [value, setValue] = React.useState("");

    React.useImperativeHandle(ref, () => ({
        getValue: () => value,
        changeValue: (vl) => setValue(vl),
    }));

    return (
        <View style={styles.containerInput}>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>
                    {label}
                </Text>
                {isRequired && <Text style={styles.required}>*</Text>}
            </View>

            <View style={[styles.wrapInput, style]}>
                <TextInput
                    onChangeText={(vl) => setValue(vl)}
                    placeholder={placeholder}
                    value={value}
                    style={[styles.input, inputStyle]}
                    multiline={multiline}
                />
                {
                    value.length > 0 &&
                    <TouchableOpacity
                        hitSlop={slop(15)}
                        onPress={() => setValue('')}
                    >
                        <Image
                            source={iconClose}
                            style={styles.iconClose}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
});



const styles = StyleSheet.create({
    containerInput: {
        marginBottom: scaleHeight(15)
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.MEDIUM
    },
    wrapInput: {
        width: '100%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM
    },
    iconClose: {
        width: scaleWidth(20),
        height: scaleWidth(20),
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    }
});

export default InputText;
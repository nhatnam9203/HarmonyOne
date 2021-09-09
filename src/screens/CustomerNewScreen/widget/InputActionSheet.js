import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { CustomActionSheet } from "./CustomActionSheet";

/**
 * @deaultActiveKey : value
 */

const InputActionSheet = React.forwardRef(({
    placeholder = '',
    style,
    label = '',
    isRequired = false,
    textStyle,
    items = [],
    defaultActiveKey = '',
}, ref) => {

    const actionsheetRef = React.useRef();
    const [item, setItem] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const openActionSheet = () => {
        actionsheetRef?.current?.show();
        setOpen(true)
    }

    React.useImperativeHandle(ref, () => ({
        getItem: () => item,
    }));

    return (
        <View style={styles.containerInput}>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>
                    {label}
                </Text>
                {isRequired && <Text style={styles.required}>*</Text>}
            </View>

            <TouchableOpacity onPress={openActionSheet} style={[styles.wrapInput, style]}>
                <Text
                    placeholder={placeholder}
                    style={[styles.input, textStyle]}
                >
                    {item?.label || "Select"}
                </Text>
                <Image
                    source={images.dropdown}
                    style={[styles.iconClose, open && { transform: [{ rotate: "180deg" }] }]}
                    resizeMode='contain'
                />

            </TouchableOpacity>

            <CustomActionSheet
                ref={actionsheetRef}
                items={items}
                title={label}
                defaultActiveKey={defaultActiveKey}
                onChangeItem={item => {
                    item && setItem(item);
                    setOpen(false)
                }}
            />
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
        fontFamily: fonts.REGULAR
    },
    iconClose: {
        width: scaleWidth(12),
        height: scaleWidth(12),
        resizeMode: 'contain',
        tintColor: colors.greyish_brown_40
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    }
});

export default InputActionSheet;
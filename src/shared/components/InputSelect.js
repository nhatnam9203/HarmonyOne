import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { TextInputMask } from "react-native-masked-text"
import { useController } from "react-hook-form";
import { CustomActionSheet } from "./CustomActionSheet";

export const InputSelect = React.forwardRef(({
    style,
    items = [],
    title = "Status",
    defaultValue = '',
    form,
    name,
    error,
    onSelect = () =>{},
}, ref) => {

    const [isFocus, setFocus] = React.useState(false);
    const actionSheetRef = React.useRef();

    const { field } = useController({
        control: form.control,
        defaultValue: "",
        name,
    })

    React.useEffect(() => {
        const obj = items.find(item => item.value == defaultValue);
        if (obj) {
            field.onChange(obj)
        }
    }, []);

    React.useImperativeHandle(ref, () => ({
        changeItem : (value) =>{
            const obj = items.find(item => item.value == value);
            if (obj) {
                field.onChange(obj)
            }
        }
      }));

    const openActionSheet = () => {
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        field.onChange(it);
        onSelect(it);
        closeActionSheet();
    }

    return (
        <TouchableOpacity onPress={openActionSheet} style={[styles.containerInput]}>
            <View style={[styles.wrapInput, style, {
                borderColor: isFocus ? colors.ocean_blue : error ? "red" : '#cccccc'
            }]}>
                <Text style={[styles.value,{ fontSize : scaleFont(15) }]}>
                    {field?.value?.label || defaultValue}
                </Text>
                <Image
                    style={[styles.icon]}
                    source={images.dropdown}
                    resizeMode='contain'
                />
                <CustomActionSheet ref={actionSheetRef}>
                    <View style={styles.contentActionSheet}>
                        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#dddddd', paddingBottom: scaleHeight(12) }]}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                            <IconButton
                                iconStyle={styles.iconClose}
                                icon={images.iconClose}
                                onPress={closeActionSheet}
                            />
                        </View>
                        <ScrollView style={styles.scrollView}>
                            {
                                items.map((it) => (
                                    <TouchableOpacity key={it.value} onPress={() => selectValue(it)} style={[styles.row]}>
                                        <Text style={[
                                            styles.itemText, {
                                                color: field?.value?.value === it.value ? "#0764B0" : "#333",
                                                fontFamily :  field?.value?.value === it.value ? fonts.MEDIUM : fonts.REGULAR,
                                            }
                                        ]}>
                                            {it?.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                </CustomActionSheet>
            </View>
        </TouchableOpacity>
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
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scrollView: {
        maxHeight: scaleHeight(600)
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
        tintColor: '#333'
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    },
    icon: {
        width: scaleWidth(12),
        height: scaleWidth(12),
        resizeMode: 'contain'
    },
    contentActionSheet: {
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: scaleWidth(16),
        paddingBottom: scaleHeight(32)

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: scaleWidth(16),
    },
    title: {
        fontSize: scaleFont(18),
        fontFamily: fonts.MEDIUM
    },
    itemText: {
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(16)
    },
    value: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
    }
});


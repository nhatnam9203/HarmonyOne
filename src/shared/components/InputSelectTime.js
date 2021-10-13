import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { CustomActionSheet } from "./CustomActionSheet";
import { TimePicker } from "./TimePicker";
import moment from "moment";

let InputTime = React.forwardRef(({
    style,
}, ref) => {

    console.log('render input select time')

    const actionSheetRef = React.useRef();

    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return date;
        },
        changeValue: (vl) => setDate(vl),
    }));

    const openActionSheet = () => {
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const onApplyTime = (time) => {
        setDate(moment(time, ["hh:mm A"]));
        closeActionSheet();
    }

    return (
        <View style={[styles.containerInput]}>
            <TouchableOpacity onPress={openActionSheet} style={[styles.wrapInput, style]}>
                <Text style={styles.txtDate}>{moment(date).format("hh:mm A")}</Text>
                <Image
                    source={images.dropdown}
                    style={styles.icon}
                    resizeMode='contain'
                />
                <CustomActionSheet ref={actionSheetRef}>
                    <TimePicker
                        onApply={onApplyTime}
                        cancel={closeActionSheet}
                    />
                </CustomActionSheet>
            </TouchableOpacity>
        </View>
    )
});

export const InputSelectTime = React.memo(InputTime);

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
        width: scaleWidth(165),
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center',
        justifyContent: 'space-between'
},
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40
    },
    icon: {
        width: scaleWidth(13),
        height: scaleWidth(13),
    },
    txtDate: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.black
    }
});

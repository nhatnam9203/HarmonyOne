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
    apply,
    time = moment().format("hh:mm A"),
    renderInput = null,
    title = "Start time",
    minutesPicker 
}, ref) => {

    const actionSheetRef = React.useRef();
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
        apply(`${time}`);
        closeActionSheet();
    }

    return (
        <>
            {
                renderInput ?
                    <TouchableOpacity onPress={openActionSheet}>
                        {renderInput()}
                    </TouchableOpacity>
                    :
                    <View style={[styles.containerInput]}>
                        <TouchableOpacity onPress={openActionSheet} style={[styles.wrapInput, style]}>
                            <Text style={styles.txtDate}>{time}</Text>
                            <Image
                                source={images.dropdown}
                                style={styles.icon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
            }
            <CustomActionSheet ref={actionSheetRef}>
                <TimePicker
                    onApply={onApplyTime}
                    cancel={closeActionSheet}
                    startTime={moment(time, ["hh:mm A"])}
                    title={title}
                    minutesPicker={minutesPicker}
                />
            </CustomActionSheet>
        </>
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


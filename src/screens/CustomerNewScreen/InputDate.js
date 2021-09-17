import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import moment from "moment";
import DatePicker from 'react-native-date-picker'

export const InputDate = React.forwardRef(({
    style,
}, ref) => {

    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        getValue: () => date,
        changeValue: (vl) => setDate(vl),
    }));

    return (
        <View style={[styles.containerInput]}>
            <TouchableOpacity onPress={()=>setOpen(true)} style={[styles.wrapInput, style]}>
                <Text style={styles.txtDate}>{moment(date).format("MM/DD/YYYY")}</Text>
                <Image
                    source={images.iconCalendar}
                    style={styles.icon}
                    resizeMode='contain'
                />
            </TouchableOpacity>

            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

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
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    txtDate: {
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: colors.black
    }
});


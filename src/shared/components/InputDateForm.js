import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "./IconButton";
import moment from "moment";
import DatePicker from 'react-native-date-picker';
import { useWatch, useController } from "react-hook-form";

export const InputDateForm = ({
    style,
    mode = "date",
    icon = images.iconCalendar,
    iconStyle,
    textStyle,
    form,
    error,
    name
}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        form.setValue(name, new Date());
    }, []);

    const { field } = useController({
        control: form.control,
        name,
    });


    const date = useWatch({
        control: form.control,
        name,
    });

    return (
        <View style={[styles.containerInput]}>
            <TouchableOpacity onPress={() => setOpen(true)} style={[styles.wrapInput, style]}>
                <Text style={[styles.txtDate, textStyle]}>
                    {
                        mode === "time" ?
                            moment(date).utc().format("hh:mm A") :
                            moment(date).utc().format("YYYY-MM-DD")
                    }
                </Text>
                <Image
                    source={icon}
                    style={[styles.icon, iconStyle]}
                    resizeMode='contain'
                />
            </TouchableOpacity>

            <DatePicker
                modal
                open={open}
                date={field.value ?? new Date()}
                mode={mode}
                is24hourSource="device"
                androidVariant="iosClone"
                onConfirm={(value) => {
                    setOpen(false)
                    form.setValue(name, value);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

        </View>
    )
}


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


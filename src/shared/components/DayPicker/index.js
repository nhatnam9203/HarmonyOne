import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, Pressable } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { CustomActionSheet } from "../CustomActionSheet";
import { TimePicker } from "../TimePicker";
import { CalendarDay } from "./CalendarDay";
import moment from "moment";

export const DayPicker = React.forwardRef(({
    style,
    onApply = () => { },
    dayPicked = moment(),
    componentRender = null,
    maxDate,
    minDate,
}, ref) => {

    const actionSheetRef = React.useRef();
    const [open, setOpen] = React.useState(false);

    const [daySelected, selectDay] = React.useState(moment().clone());
    const selectedDay = moment(daySelected).format("YYYY-MM-DD").toString();

    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return date;
        },
        setValue: (day) => selectDay(day),
    }));

    const openActionSheet = () => {
        actionSheetRef?.current?.show();
        selectDay(dayPicked);
        setOpen(true);
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
        setOpen(false);
    }

    const apply = (day) => {
        onApply(day)
        closeActionSheet();
    }

    const applyDay = (day) =>{
        selectDay(day);
        apply(day);
    }

    const onHide = () => {
        setOpen(false);
    }

    return (
        <View style={[styles.containerInput]}>
            {
                componentRender ?
                    <TouchableOpacity onPress={openActionSheet}>
                        {componentRender()}
                    </TouchableOpacity> :
                    
                    <Pressable onPress={openActionSheet} style={[styles.wrapInput, style]}>
                        <Text style={styles.txtDate}>
                            {moment(dayPicked).format("MMMM DD, YYYY")}
                        </Text>
                        <Image
                            source={images.dropdown}
                            style={[styles.icon, { transform: [{ rotate: open ? "180deg" : "0deg" }] }]}
                            resizeMode='contain'
                        />
                    </Pressable>
            }
            <CustomActionSheet onHide={onHide} ref={actionSheetRef}>
                <CalendarDay
                    selectedDay={selectedDay}
                    selectDay={applyDay}
                    closeCalendarPicker={closeActionSheet}
                    apply={apply}
                    maxDate={maxDate}
                    minDate={minDate}
                />
            </CustomActionSheet>
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
        height: scaleWidth(42),
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
        tintColor: colors.black
    },
    txtDate: {
        fontSize: scaleFont(18),
        fontFamily: fonts.MEDIUM,
        color: colors.black,
        marginRight: 8
    }
});


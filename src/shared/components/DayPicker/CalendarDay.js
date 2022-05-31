import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { Calendar } from "react-native-calendars"
import { fonts } from "@shared/themes";
import { rightButton, leftButton } from '@assets'
import moment from 'moment'

export const CalendarDay = ({
    onPress,
    closeCalendarPicker,
    bottom = scaleHeight(30),
    onDayPress = () => { },
    selectedDay,
    selectDay,
    apply,
    maxDate,
    minDate,
}) => {

    const cancel = () => {
        closeCalendarPicker();
    }

    return (
        <View style={styles.container(bottom)}>
            <Calendar
                style={{ padding: 0 }}
                current={moment().format("YYYY-MM-DD")}
                onDayPress={(date) => selectDay(moment(date.dateString, ['YYYY-MM-DD']))}
                monthFormat={"MMMM yyyy"}
                firstDay={1}
                onPressArrowLeft={(substractMonth) => substractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                theme={theme}
                maxDate={maxDate}
                minDate={minDate}
                markedDates={{
                    [selectedDay]: {
                        startingDay: true,
                        selected: true,
                        customStyles: {
                            container: {
                                backgroundColor: "#0764B0",
                                borderRadius: 0,
                                zIndex: 1,
                                borderRadius: 300,
                            },
                            text: {
                                color: "white",
                            },
                        },
                    },
                }}
                markingType={"custom"}
                renderArrow={(direction) =>
                    direction === "left" ? (
                        <Image source={leftButton} style={styles.iconButton} resizeMode='contain' />
                    ) : (
                        <Image source={rightButton} style={styles.iconButton} resizeMode='contain' />
                    )
                }
            />
{/* 
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={cancel}
                    style={[styles.button, { borderRightWidth: 1, borderRightColor: '#dddddd' }]}
                >
                    <Text fontFamily='regular' style={styles.txtButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={apply} style={styles.button}>
                    <Text fontFamily='medium' style={[styles.txtButton, { color: '#1366AE', fontFamily: fonts.BOLD }]}>
                        Apply
                    </Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: (bottom) => {
        return {
            backgroundColor: 'white',
            width: scaleWidth(375),
            paddingBottom: bottom
        }
    },
    iconButton: {
        width: scaleWidth(13),
        height: scaleWidth(13),
        tintColor: 'white',
        marginHorizontal : scaleWidth(10)
    },
    row: {
        flexDirection: 'row',
        width: scaleWidth(375),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    },
    button: {
        width: scaleWidth(375/2),
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(55)
    },
    txtButton: {
        fontSize: scaleFont(17),
        color: '#404040',
        fontFamily: fonts.REGULAR
    }
});


const theme = {
    arrowColor: "#0764B0",
    "stylesheet.calendar.header": {
        header: {
            backgroundColor: "#1366AE",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: scaleHeight(8),
            paddingBottom: scaleHeight(4)
            // paddingHorizontal: scaleWidth(4),

        },
        monthText: {
            color: "white",
            fontWeight: "500",
            fontSize: scaleFont(18),
            fontFamily: fonts.MEDIUM
         },
        dayHeader: {
            width: scaleWidth(14),
            textAlign: "center",
            fontSize: scaleFont(16),
            fontFamily: fonts.REGULAR,
            color: "white",
            backgroundColor: "#1366AE",
            padding: scaleWidth(10),
            width: scaleWidth(375 / 7 + 17),
            marginTop: -scaleWidth(8),
        },
    },
    backgroundColor: "#2B2E33",
    calendarBackground: "white",
    selectedDayBackgroundColor: "#28AAE9",
    selectedDayTextColor: "#fff",
    todayTextColor: "#00adf5",
    dayTextColor: "#333",
    textDisabledColor: "#b5b1b1",
    textDayFontWeight: "400",
    textDayFontSize: scaleFont(15),
    padding: 0,
};
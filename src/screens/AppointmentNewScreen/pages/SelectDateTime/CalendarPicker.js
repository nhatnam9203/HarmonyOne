import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";

export const CalendarPicker = ({
}) => {
    return (
        <Calendar
            current={moment().format('YYYY-MM-DD')}
            minDate={moment().format('YYYY-MM-DD')}
            onDayPress={(date) => { }}
            monthFormat={"MMMM yyyy"}
            firstDay={1}
            onPressArrowLeft={() => { }}
            onPressArrowRight={() => { }}
            theme={theme}
            renderArrow={(direction) =>
                direction === "left" ? (
                    <AntDesign name="caretleft" size={12} color={"#0764B0"} />
                ) : (
                    <AntDesign name="caretright" size={12} color={"#0764B0"} />
                )
            }
        />
    );
};

const styles = StyleSheet.create({

});



const theme = {
    arrowColor: "#0764B0",
    "stylesheet.calendar.header": {
        header: {
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: scaleHeight(0.5),
            borderRadius: scaleWidth(20),
            paddingHorizontal: scaleWidth(4),
            marginBottom: scaleHeight(16)
        },
        monthText: {
            color: colors.black,
            fontSize: scaleFont(18),
            fontFamily: fonts.REGULAR,
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: scaleWidth(5),
            width: scaleWidth(14),
            textAlign: "center",
            fontSize: scaleFont(16),
            color: "#585858",
            fontFamily: fonts.REGULAR,
            marginBottom: scaleHeight(8)
        },
    },
    backgroundColor: "#2B2E33",
    calendarBackground: "white",
    selectedDayBackgroundColor: "#0764B0",
    selectedDayTextColor: "#fff",
    todayTextColor: "#404040",
    dayTextColor: "#404040",
    textDisabledColor: "grey",
    textDayFontWeight: "500",
    textDayFontSize: scaleFont(15),
    textDayFontFamily: fonts.REGULAR,

};


import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { staffGetAvaiableTime, useAxiosQuery, useAxiosMutation } from "@src/apis";
import { bookAppointment } from "@redux/slices";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment-timezone";

export const CalendarPicker = React.forwardRef(({
    staffSelected
}, ref) => {
    const dispatch = useDispatch();

    const {
        merchant: { merchantDetail },
        bookAppointment: { dayBooking },
        auth: { staff },
    } = useSelector(state => state);

    const [daySelect, setDaySelect] = React.useState(moment(dayBooking).format("YYYY-MM-DD"));

    React.useImperativeHandle(ref,()=>({
        getDaySelect : () =>{
            return daySelect
        }
    }));


    /****************************** GET TIME AVAIABLE BY STAFF  ******************************/
    const [, submitGetStaffAvailable] = useAxiosMutation({
        ...staffGetAvaiableTime(),
        onSuccess: (data, response) => {
            if (response.codeNumber == 200) {
                dispatch(bookAppointment.setTimesAvailable(data));
            }
        }
    });

    /******************************  SUBMIT GET TIME AVAIABLE BY STAFF  ******************************/
    const onChangeDay = async (date) => {
        setDaySelect(date?.dateString);
        const data = {
            date: date?.dateString,
            merchantId: staff?.merchantId,
            appointmentId: 0,
            timezone: new Date().getTimezoneOffset(),
        };
        const body = await staffGetAvaiableTime(staffSelected?.staffId, data);
        submitGetStaffAvailable(body.params);
    }


    let today =
        merchantDetail?.timezone && merchantDetail?.timezone !== "0"
            ? moment().tz(merchantDetail.timezone.substring(12)).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD");

    return (
        <Calendar
            current={today}
            minDate={today}
            onDayPress={onChangeDay}
            monthFormat={"MMMM yyyy"}
            
            firstDay={1}
            markedDates={{
                [moment(daySelect).format("YYYY-MM-DD")]: { selected: true },
            }}
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
});


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
    selectedDayBackgroundColor: "#28AAE9",
    selectedDayTextColor: "#fff",
    todayTextColor: "#404040",
    dayTextColor: "#404040",
    textDisabledColor: "grey",
    // textDayFontWeight: "400",
    textDayFontSize: scaleFont(15),
    textDayFontFamily: fonts.REGULAR,

};


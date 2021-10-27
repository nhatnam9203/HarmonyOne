import React from "react";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { View } from "react-native";

const stylesNode = {
    startingDay: true,
    selected: true,
    customStyles: {
        container: {
            backgroundColor: "#0764B0",
            zIndex: 999999,
            borderRadius: 300,
        },
        text: {
            color: "white",
        },
    },
};

const CalendarPicker = React.forwardRef(({
    startTime,
    endTime,
    setStartTime,
    setEndTime
}, ref) => {

    const refCalendar = React.useRef();

    let start = moment(startTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD").toString();
    let end = moment(endTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD").toString();

    const [optionSelect, setOptionSelect] = React.useState("selectStartTime");
    const [markedDates, setMarkedDates] = React.useState([]);

    const getMarkedDates = async () => {
        const diff = await moment(endTime, ["MM/DD/YYYY"]).diff(
            moment(startTime, ["MM/DD/YYYY"]),
            "days",
        );
        let arr = {};
        let posStart = 1;
        if (diff > 0) {
            for (let i = posStart; i <= diff; i++) {
                const day = moment(startTime).add(i, "days").format("YYYY-MM-DD").toString();
                const obj = {
                    selected: true,
                    customStyles: {
                        container: {
                            backgroundColor: "#EDFAFC",
                            borderRadius: 0,
                            width: "144%",
                            zIndex: -1,
                        },
                        text: {
                            color: "#404040",
                        },
                    },
                };
                arr[day] = obj;
            }
        }
        setMarkedDates(arr);
    };

    React.useEffect(() => {
        getMarkedDates();
    }, [startTime, endTime]);

    const countDiffStartTime = (day) => {
        const diff = moment(endTime, ["MM/DD/YYYY"]).diff(moment(day, ["MM/DD/YYYY"]), "days");
        return diff;
    };

    const countDiffEndTime = (day) => {
        const diff = moment(day, ["MM/DD/YYYY"]).diff(moment(startTime, ["MM/DD/YYYY"]), "days");
        return diff;
    };

    const selectDayCalendar = (dayPicker) => {
        const day = moment(dayPicker, ["YYYY-MM-DD"]).format("MM/DD/YYYY");
        if (optionSelect == "selectStartTime") {
            const diff = countDiffStartTime(day);
            if (diff < 0) {
                setStartTime(endTime);
                setEndTime(day);
                setOptionSelect("selectStartTime");
            } else {
                setStartTime(day);
                setOptionSelect("selectEndTime");
            }
        } else {
            const diff = countDiffEndTime(day);
            if (diff < 0) {
                setEndTime(startTime);
                setStartTime(day);
                setOptionSelect("selectStartTime");
            } else {
                setEndTime(day);
                setOptionSelect("selectStartTime");
            }
        }
    };

    React.useImperativeHandle(ref, () => ({
        setCurrentMonthCalendar: (time) => {
            let currentMonth = refCalendar.current.header.props.month;
            currentMonth = moment(currentMonth[0]).format("MM/DD/YYYY");
            const diff = moment(time, ["MM/DD/YYYY"]).diff(moment(currentMonth), "months");
            if (diff !== 0) {
                refCalendar.current.addMonth(diff);
            }
        }
    }));


    return (
        <View style={{ flex: 1, width: "100%", height: scaleHeight(210) }}>
            <Calendar
                ref={refCalendar}
                current={moment(endTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD")}
                onDayPress={(date) => selectDayCalendar(date.dateString)}
                monthFormat={"MMMM yyyy"}
                firstDay={1}
                onPressArrowLeft={(substractMonth) => substractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                markedDates={{
                    ...markedDates,
                    [start]: stylesNode,
                    [end]: stylesNode,
                }}
                markingType={"custom"}
                theme={theme}
                renderArrow={(direction) =>
                    direction === "left" ? (
                        <AntDesign name="caretleft" size={15} color={"#0764B0"} />
                    ) : (
                        <AntDesign name="caretright" size={15} color={"#0764B0"} />
                    )
                }
            />
        </View>
    );
});

export default CalendarPicker;

const theme = {
    arrowColor: "#0764B0",
    "stylesheet.calendar.header": {
        header: {
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: scaleHeight(8),
            borderRadius: scaleWidth(50),
            paddingHorizontal: scaleWidth(16),
        },
        monthText: {
            color: "#404040",
            fontWeight: "500",
            fontSize: scaleWidth(17),
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: scaleWidth(5),
            width: scaleWidth(40),
            textAlign: "center",
            fontSize: scaleFont(17),
            color: "#404040",
            backgroundColor: "#F8F8F8",
            paddingVertical: scaleWidth(16),
            width: scaleWidth(375 / 7),
        },
    },
    backgroundColor: "#2B2E33",
    calendarBackground: "white",
    selectedDayBackgroundColor: "#0764B0",
    selectedDayTextColor: "#fff",
    todayTextColor: "#00adf5",
    dayTextColor: "#404040",
    textDisabledColor: "#666666",
    textDayFontWeight: "400",
    textDayFontSize: scaleFont(16)
};

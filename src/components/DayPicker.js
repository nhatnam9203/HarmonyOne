import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Text from './Text'
import { scaleWidth, scaleHeight } from '@utils'
import { Calendar } from './react-native-calendars'
import { rightButton, leftButton } from '@assets'
import moment from 'moment'

const DayPicker = ({
    onPress,
    closeCalendarPicker,
    bottom = 0,
    onDayPress = () => { },
}) => {

    const [daySelected,selectDay] = React.useState(moment().clone());

    const selectedDay = moment(daySelected).format("YYYY-MM-DD").toString();

    const cancel = () => {
        closeCalendarPicker();
    }

    const apply = () =>{
        onDayPress(daySelected);
        closeCalendarPicker();
    }

    return (
        <View style={styles.container(bottom)}>
            <Calendar
                style={{ padding: 0 }}
                current={moment().format("YYYY-MM-DD")}
                onDayPress={(date)=>selectDay(moment(date.dateString,['YYYY-MM-DD']))}
                monthFormat={"MMMM yyyy"}
                firstDay={1}
                onPressArrowLeft={(substractMonth) => substractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                theme={theme}
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

            <View style={styles.row}>
                <TouchableOpacity
                    onPress={cancel}
                    style={[styles.button, { borderRightWidth: 1, borderRightColor: '#dddddd' }]}
                >
                    <Text fontFamily='regular' style={styles.txtButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={apply} style={styles.button}>
                    <Text fontFamily='medium' style={[styles.txtButton, { color: '#1366AE', fontWeight: '600' }]}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DayPicker;

const styles = StyleSheet.create({
    container: (bottom) => {
        return {
            backgroundColor: 'white',
            width: scaleWidth(100),
            paddingBottom: bottom
        }
    },
    iconButton: {
        width: scaleWidth(4),
        height: scaleWidth(4),
        tintColor: 'white'
    },
    row: {
        flexDirection: 'row',
        width: scaleWidth(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    },
    button: {
        width: scaleWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(5.5)
    },
    txtButton: {
        fontSize: scaleWidth(4.2),
        color: '#404040'
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
            paddingTop: scaleHeight(1),
            paddingBottom: scaleHeight(0.7)
            // paddingHorizontal: scaleWidth(4),

        },
        monthText: {
            color: "white",
            fontWeight: "500",
            fontSize: scaleWidth(4.7),
        },
        dayHeader: {
            width: scaleWidth(14),
            textAlign: "center",
            fontSize: scaleWidth(4),
            color: "white",
            backgroundColor: "#1366AE",
            padding: scaleWidth(2.5),
            width: scaleWidth(100 / 7 + 5),
            marginTop: -scaleWidth(2),
        },
    },
    backgroundColor: "#2B2E33",
    calendarBackground: "white",
    selectedDayBackgroundColor: "blue",
    selectedDayTextColor: "red",
    todayTextColor: "#00adf5",
    dayTextColor: "#404040",
    textDisabledColor: "#666666",
    textDayFontWeight: "400",
    textDayFontSize: scaleWidth(3.7),
    padding: 0,
};
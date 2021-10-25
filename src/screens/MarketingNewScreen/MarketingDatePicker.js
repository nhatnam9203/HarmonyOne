import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelectTime, DayPicker } from "@shared/components";
import { Switch } from "react-native-paper";
import moment from "moment";

const MarketingDatePicker = React.forwardRef(({

}, ref) => {
    const startDateRef = React.useRef();
    const startTimeRef = React.useRef();
    const endDateRef = React.useRef();
    const endTimeRef = React.useRef();

    const [visibleEndDate, setVisibleEndDate] = React.useState(true);
    const [startDay, setStartDay] = React.useState(moment());
    const [endDay, setEndDay] = React.useState(moment());
    const [startTime, setStartTime] = React.useState(moment().format("hh:mm A"));
    const [endTime, setEndTime] = React.useState(moment().format("hh:mm A"));


    React.useImperativeHandle(ref, () => ({
        getValueDatePicker : () =>{
            return{
                visibleEndDate,
                startDay,
                endDay,
                startTime,
                endTime,
            }
        }
    }));

    return (
        <>
            <CustomInput
                label='Start date'
                renderInput={() =>
                    <View style={{ flexDirection: "row" }}>
                        <DayPicker
                            dayPicked={startDay}
                            onApply={(day) => { 
                                setStartDay(day)
                            }}
                            componentRender={() =>
                                <View style={styles.inputSelectTime}>
                                    <Text style={styles.txtTime}>
                                        {moment(startDay).format("MM-DD-YYYY")}
                                    </Text>
                                    <Image
                                        source={images.iconCalendar}
                                        style={styles.iconCalendar}
                                        resizeMode='contain'
                                    />
                                </View>
                            }
                        />
                        <InputSelectTime
                            apply={(time) => { 
                               setStartTime(time);
                            }}
                            time={startTime}
                            renderInput={() => (
                                <View style={[styles.inputSelectTime, { marginLeft: scaleWidth(16) }]}>
                                    <Text style={styles.txtTime}>
                                        {startTime}
                                    </Text>
                                    <Image
                                        source={images.dropdown}
                                        style={styles.iconTimeSelect}
                                        resizeMode='contain'
                                    />
                                </View>
                            )}
                        />
                    </View>
                }
            />

            <CustomInput
                label='End date'
                style={{ width: scaleWidth(375 - 32), alignItems: 'center', justifyContent: "space-between" }}
                renderRight={() => <SwitchButton isVisible={visibleEndDate} onChange={setVisibleEndDate} />}
                renderInput={() =>
                    visibleEndDate ?
                        <View style={{ flexDirection: "row" }}>
                            <DayPicker
                                dayPicked={endDay}
                                onApply={(day) => { setEndDay(day) }}
                                componentRender={() =>
                                    <View style={styles.inputSelectTime}>
                                        <Text style={styles.txtTime}>
                                            {moment(endDay).format("MM-DD-YYYY")}
                                        </Text>
                                        <Image
                                            source={images.iconCalendar}
                                            style={styles.iconCalendar}
                                            resizeMode='contain'
                                        />
                                    </View>
                                }
                            />
                            <InputSelectTime
                                apply={(time) => setEndTime(time)}
                                time={endTime}
                                renderInput={() => (
                                    <View style={[styles.inputSelectTime, { marginLeft: scaleWidth(16) }]}>
                                        <Text style={styles.txtTime}>
                                            {endTime}
                                        </Text>
                                        <Image
                                            source={images.dropdown}
                                            style={styles.iconTimeSelect}
                                            resizeMode='contain'
                                        />
                                    </View>
                                )}
                            />
                        </View> : null
                }
            />
        </>
    );

});

export default MarketingDatePicker;


const SwitchButton = ({
    isVisible = false, onChange
}) => {
    return (
        <Switch
            value={isVisible}
            onValueChange={onChange}
            color={colors.ocean_blue}
        />
    )
}


const styles = StyleSheet.create({
    iconTimeSelect: {
        width: scaleWidth(12),
        height: scaleWidth(12),
        tintColor: "#404040"
    },
    txtTime: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#000"
    },
    inputSelectTime: {
        width: scaleWidth(135),
        height: scaleHeight(40),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#cccccc",
        paddingHorizontal: scaleWidth(8)
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
    },

    buttonTreedot: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },

    treedot: {
        tintColor: colors.black,
        width: scaleHeight(20),
        height: scaleHeight(20),
    },

    rowReverse: {
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        marginBottom: scaleHeight(16)
    },

    txtItem: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: '#809DBD',
    },

    messageLimit: {
        fontSize: scaleFont(13),
        marginTop: -scaleHeight(12),
        fontFamily: fonts.LIGHT,
        marginBottom: scaleHeight(16)
    },

    textDate: {
        fontSize: scaleFont(15),
    },

    iconCalendar: {
        width: scaleWidth(20), height: scaleWidth(20)
    },

    iconTime: {
        width: scaleWidth(12), height: scaleWidth(12)
    }
});

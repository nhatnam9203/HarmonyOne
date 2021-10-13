import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { InputSelectTime } from "@shared/components";
import { fonts, images, colors } from '@shared/themes';
import { isEmpty } from "lodash";
import { guid, workingTimesData } from "@shared/utils";
import CheckBox from "@react-native-community/checkbox";
import Title from "./Title"
import moment from 'moment';

const WorkingTime = () => {

    const [data, setData] = React.useState(workingTimesData);
    const [elRefs, setElRefs] = React.useState([]);

    React.useEffect(() => {
        setElRefs((elRefs) =>
            Array(7)
                .fill()
                .map((_, i) => elRefs[i] || React.createRef())
        );
    }, []);

    const setAllChecked = () => {
        for (let i = 0; i < elRefs.length; i++) {
            elRefs[i]?.current?.onChangeChecked(true);
        }
    }

    return (
        <View style={{ marginBottom: scaleHeight(16), marginTop: scaleHeight(12) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: scaleHeight(24) }}>
                    <Title text="Working time" />
                </View>
                <TouchableOpacity onPress={setAllChecked}>
                    <Text style={styles.applyToAll}>Apply to all</Text>
                </TouchableOpacity>
            </View>

            {
                Object.entries(data).map((item, index) => (
                    <ItemInputTime
                        ref={elRefs[index]}
                        item={item}
                        index={index}
                        key={item[0]}
                    />
                ))
            }
        </View>
    )
}


const ItemInputTime = React.forwardRef(({ item, index }, ref) => {

    const [isCheck, setChecked] = React.useState(true);
    const [fromTime, setFromTime] = React.useState(moment().format("hh:mm A"))
    const [toTime, setToTime] = React.useState("10:30 PM");

    const nearestFutureMinutes = (interval, someMoment) => {
        const roundedMinutes = Math.ceil(someMoment.minute() / interval) * interval;
        return someMoment.clone().minute(roundedMinutes).second(0);
    }

    const onChangeChecked = React.useCallback((status) => {
        setChecked(status)
    }, []);

    React.useEffect(() => {
        const now = moment();
        let nearestFuturemin = nearestFutureMinutes(30, now);
        nearestFuturemin = moment(nearestFuturemin).format("hh:mm A");
        setFromTime(nearestFuturemin);
        setChecked(item[1]?.isCheck);
    }, []);

    React.useImperativeHandle(ref, () => ({
        onChangeChecked,
    }));

    return (
        <View key={item[0] + guid()} style={styles.rowItem}>
            <View style={[styles.row, { width: scaleWidth(80) }]}>
                <CheckBox
                    disabled={false}
                    value={isCheck}
                    onValueChange={onChangeChecked}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(12) }}
                />
                <Text style={styles.txtDayName}>{(item[0].slice(0, 3))}</Text>
            </View>
            <InputSelectTime
                time={fromTime}
                apply={time => setFromTime(time)}
                style={{ width: scaleWidth(120) }}
            />
            <InputSelectTime
                time={toTime}
                apply={time => setToTime(time)}
                style={{ width: scaleWidth(120) }}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    txtDayName: {
        fontSize: scaleFont(17),
        color: "#809DBD",
        fontFamily: fonts.MEDIUM,
        marginRight: scaleWidth(16)
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: scaleHeight(18)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    applyToAll: {
        fontSize: scaleFont(16),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM
    }
})

export default WorkingTime;
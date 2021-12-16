import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { InputSelectTime } from "./InputSelectTime";
import { fonts, images, colors } from '@shared/themes';
import { isEmpty } from "lodash";
import { guid, workingTimesData } from "@shared/utils";
import moment from 'moment';


export const WorkingTime = React.forwardRef(({ renderTitle = null }, ref) => {

    const [data, setData] = React.useState(workingTimesData);
    const [elRefs, setElRefs] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);

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

    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            let tempValue = {};
            for (const items of elRefs) {
                const el = items?.current?.getItems();
                tempValue = {
                    ...tempValue,
                    [el[0]]: el[1],
                }
            };
            return tempValue;
        },
        setValue: (dataWorkinigTime) => {
            setData(dataWorkinigTime);
            setIsEdit(true);
        }
    }))


    return (
        <View style={{ marginBottom: scaleHeight(16), marginTop: scaleHeight(12) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginBottom: scaleHeight(24) }}>
                    {renderTitle ? renderTitle() : <View />}
                </View>
                <TouchableOpacity onPress={setAllChecked}>
                    <Text style={styles.applyToAll}>Apply to all</Text>
                </TouchableOpacity>
            </View>

            {
                data && Object.entries(data).map((item, index) => (
                    <ItemInputTime
                        ref={elRefs[index]}
                        item={item}
                        index={index}
                        key={item[0]}
                        isEdit={isEdit}
                    />
                ))
            }
        </View>
    )
});


const ItemInputTime = React.forwardRef(({ item, index, isEdit }, ref) => {

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
        if (!isEdit) {
            const now = moment();
            let nearestFuturemin = nearestFutureMinutes(30, now);
            nearestFuturemin = moment(nearestFuturemin).format("hh:mm A");
            setFromTime(nearestFuturemin);
            setChecked(item[1]?.isCheck);
        } else {
            setFromTime(item[1]?.timeStart);
            setToTime(item[1]?.timeEnd)
            setChecked(item[1]?.isCheck);
        }
    }, [isEdit]);

    React.useImperativeHandle(ref, () => ({
        onChangeChecked,
        getItems: () => {
            let tempItem = [
                ...item
            ];
            tempItem[1] = {
                timeStart: fromTime,
                timeEnd: toTime,
                isCheck
            };
            return tempItem;
        }
    }));

    return (
        <View key={item[0] + guid()} style={styles.rowItem}>
            <TouchableOpacity activeOpacity={1} onPress={() => onChangeChecked(!isCheck)} style={[styles.row, { width: scaleWidth(80) }]}>
                <Image
                    source={isCheck ? images.checkBox : images.checkBoxEmpty}
                    style={{ width: scaleWidth(22), height: scaleWidth(22), resizeMode: 'cover', marginRight : scaleWidth(8) }}
                    resizeMode='cover'
                />
                <Text style={styles.txtDayName}>{(item[0].slice(0, 3))}</Text>
            </TouchableOpacity>
            <InputSelectTime
                time={fromTime}
                apply={time => setFromTime(time)}
                style={{ width: scaleWidth(120) }}
            />
            <InputSelectTime
                time={toTime}
                apply={time => setToTime(time)}
                style={{ width: scaleWidth(120) }}
                title={'End time'}
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


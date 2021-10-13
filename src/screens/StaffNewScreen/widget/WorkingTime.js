import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { InputSelectTime } from "@shared/components";
import { fonts, images, colors } from '@shared/themes';
import { isEmpty } from "lodash";
import { guid } from "@shared/utils";
import { workingTimesData } from "./workingTimeData";
import CheckBox from "@react-native-community/checkbox";
import Title from "./Title"

const WorkingTime = () => {

    const [data, setData] = React.useState(workingTimesData);


    const setChecked = React.useCallback((checked, item, index) => {

        let tempData = { ...data };
        Object.values(tempData)[index].isCheck = checked;
        setData(tempData);
    }, []);

    const setAllChecked = () => {
        let tempData = { ...data };
        for (const el of Object.values(tempData)) {
            el.isCheck = true;
        }
        setData(tempData);
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
                        item={item}
                        index={index}
                        key={item[0]}
                        setChecked={setChecked}
                    />
                ))
            }
        </View>
    )
}

const ItemInputTime = React.memo(({ item, index, setChecked }) => {
    return (
        <View key={item[0] + guid()} style={styles.rowItem}>
            <View style={[styles.row, { width: scaleWidth(80) }]}>
                <CheckBox
                    disabled={false}
                    value={item[1]?.isCheck}
                    // onValueChange={() => { }}
                    onValueChange={checked => setChecked(checked, item, index)}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    style={{ width: 24, height: 24, marginRight: scaleWidth(12) }}
                />
                <Text style={styles.txtDayName}>{(item[0].slice(0, 3))}</Text>
            </View>
            <InputSelectTime style={{ width: scaleWidth(120) }} />
            <InputSelectTime style={{ width: scaleWidth(120) }} />
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
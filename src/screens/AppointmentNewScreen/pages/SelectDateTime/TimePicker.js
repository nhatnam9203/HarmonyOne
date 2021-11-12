import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "@redux/slices";
import { getTimeAvaible } from "@shared/utils";
import { ColumnTime } from "./ColumnTime";
import { ListEmptyComponent } from "@shared/components";
import { isElement, isEmpty } from "lodash";
import moment from "moment";

export const TimePicker = React.forwardRef(({
    timesAvailable = []
}, ref) => {

    console.log({ timesAvailable })

    const [timePicker, setTimePicker] = React.useState("");

    React.useImperativeHandle(ref, () => ({
        getTimePicker: () => {
            return timePicker;
        }
    }));

    const checkAvaiable = () =>{
        let count = 0;
        for(let i = 0; i < timesAvailable.length ; i++){
            if(timesAvailable[i].isBooked){
                count += 1;
            }
        }
        if(count == timesAvailable.length) return false;
        return true
    }

    if (!checkAvaiable()){
        return (
            <ListEmptyComponent
                description={'The staff is not available on this day.'}
                image={images.iconNotFound}
                textStyle={{ fontSize : scaleFont(14) }}
            />
        )
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleHeight(20) }}>
            <ColumnTime
                title="Morning"
                data={getTimeAvaible(timesAvailable).morning}
                setTimePicker={setTimePicker}
                timePicker={timePicker}
            />
            <ColumnTime
                title="Afternoon"
                data={getTimeAvaible(timesAvailable).afternoon}
                setTimePicker={setTimePicker}
                timePicker={timePicker}
            />
            <ColumnTime
                title="Evening"
                data={getTimeAvaible(timesAvailable).evening}
                setTimePicker={setTimePicker}
                timePicker={timePicker}
            />
        </View>

    );

});


const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(15),
    },
    itemTitle: {
        width: scaleWidth(100),
        height: scaleHeight(37),
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: scaleWidth(100),
        height: scaleHeight(37),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#dddddd",
        borderRadius: 3,
        marginBottom: scaleWidth(13)
    },
    txtItem: {

    }
});



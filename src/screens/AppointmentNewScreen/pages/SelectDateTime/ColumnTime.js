import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "@redux/slices";
import moment from "moment";

export const ColumnTime = ({
    title = "Morning",
    data = [],
    setTimePicker,
    timePicker,
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.itemTitle}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {
                data.length > 0 ? data.map((item) => (
                    <Pressable
                        onPress={() => setTimePicker(item?.time)}
                        key={item?.id?.toString() + "itemTime"}
                        style={[
                            styles.item,
                            {
                                backgroundColor: timePicker == item?.time ? "#D5F8FC" : "transparent",
                                borderColor: timePicker == item?.time ? "#28AAE9" : "#dddddd"
                            }
                        ]}
                    >
                        <Text style={[styles.txtItem, { fontFamily: timePicker == item?.time ? fonts.MEDIUM : fonts.REGULAR }]}>
                            {moment(item?.time, "HH:mm").format("hh:mm A")}
                        </Text>
                    </Pressable>
                )) :
                    <View style={[styles.item,{ borderWidth: 0 }]}>
                        <Text style={[styles.txtItem, { fontFamily: fonts.REGULAR }]}>
                            ...
                        </Text>
                    </View>
            }
        </View>
    );
};

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
        fontSize: scaleFont(13)
    }
});



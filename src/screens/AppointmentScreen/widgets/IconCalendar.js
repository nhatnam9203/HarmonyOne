
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { fonts, colors } from '@shared/themes';
import { dateToFormat } from "@shared/utils";
import moment from "moment";

const IconCalendar = ({
    onPress = () =>{}
}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.wrap}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerDot}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={styles.txtDate}>{moment().format("DD")}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default IconCalendar;


const styles = StyleSheet.create({
    wrap: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.ocean_blue,
    },
    header: {
        width: scaleWidth(25),
        height: scaleWidth(5),
        borderTopLeftRadius: Platform.OS == "ios" ? 5 : 0,
        borderTopRightRadius: Platform.OS == "ios" ? 5 : 0,
        backgroundColor: colors.ocean_blue,
        position: 'relative'
    },
    headerDot: {
        position: 'absolute',
        height: 10,
        width: '100%',
        top: -scaleWidth(9),
        paddingHorizontal: scaleWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 300,
        backgroundColor: colors.ocean_blue
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "white",
    },
    txtDate: {
        color: colors.ocean_blue,
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(14),
    }
});

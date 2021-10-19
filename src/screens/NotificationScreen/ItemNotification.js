import React from 'react';
import { View, StyleSheet, Text, FlatList, Image, Pressable } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import moment from "moment";

export const ItemNotification = ({
    item,
    onPressItem,
}) => {

    const getIcon = (notiType) => {
        let icon = images.schedule_updateAppointment;
        switch (notiType) {
            case 'appointment_checkin':
                icon = images.schedule_checkinAppointment
                break;
            case 'appointment_add':
                icon = images.schedule_newAppointment;
                break;
            case 'appointment_schedule_changes':
                icon = images.schedule_updateAppointment;
                break;
            case 'appointment_confirm':
                icon = images.schedule_confirmAppointment;
                break;
            case 'appointment_cancel':
                icon = images.schedule_deleteAppointment;
                break;
        }

        return icon
    }

    return (
        <Pressable onPress={onPressItem} style={styles.container}>
            <View>
                <Image
                    source={getIcon(item?.type)}
                    style={styles.iconNotification(item?.view, item?.type)}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.right}>
                <Text style={styles.title(item?.view)}>
                    {item.title}
                </Text>
                <Text style={[styles.content, { marginTop: scaleHeight(8) }]}>
                    {`${item?.message} `}
                    <Text style={{ fontFamily: fonts.MEDIUM }}>{`${item?.customerName}`}</Text>
                </Text>
                <Text style={styles.content}>
                    {`${item?.customerPhone} `}
                </Text>
                <Text style={[styles.content, { marginTop: scaleHeight(8), fontSize: scaleFont(15) }]}>
                    {`${moment(item?.createdDate).format("YYYY-MM-DD")} ${moment(item?.createdDate).format("hh:mm A")}`}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingVertical: scaleHeight(12),
        paddingHorizontal: scaleWidth(16),
        flexDirection: "row"
    },
    right: {
        marginLeft: scaleWidth(16)
    },

    content: {
        flex: 1,
    },
    flatList: {
        flex: 1
    },
    title: view => {
        return {
            fontSize: scaleFont(17),
            fontFamily: fonts.BOLD,
            color: view == 1 ? "#757474" : colors.ocean_blue
        }
    },
    content: {
        fontSize: scaleFont(17),
        fontFamily: fonts.LIGHT,
        color: "#404040",
    },
    iconNotification: (view, notiType) => {
        return {
            width: scaleWidth(40),
            height: scaleWidth(40),
            tintColor:  view == 1 ? "#b5b1b1" : notiType == "appointment_cancel" ? "red" : colors.ocean_blue
        }
    }

});

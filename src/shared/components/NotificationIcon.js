import React from 'react'
import { View, StyleSheet, TextInput, Platform, Image, Text, Pressable } from 'react-native';
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { CustomImage } from "./CustomImage";
import { useSelector } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const NotificationIcon = ({

}) => {

    const { notification: { countUnread = 0 } } = useSelector(state => state);
    let count = parseInt(countUnread) > 99 ? "+99" : countUnread;

    const goToNotificationPage = () => {
        NavigationService.navigate(screenNames.NotificationScreen);
    }

    return (
        <Pressable onPress={goToNotificationPage} style={styles.button}>
            <View style={{ position: "relative" }}>
                {
                    parseInt(countUnread) > 0 &&
                    <View style={styles.wrapCount}>
                        <Text style={styles.countUnread}>{count}</Text>
                    </View>
                }
                <Image source={images.iconBell} style={styles.icon} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        tintColor: "#7B99BA"
    },

    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapCount: {
        justifyContent: "center",
        alignItems: 'center',
        width: scaleWidth(20),
        height: scaleWidth(20),
        backgroundColor: "#ED1C24",
        borderRadius: 3000,
        position: 'absolute',
        top: -scaleWidth(8),
        left: 7,
        zIndex: 9,
        borderWidth: 1,
        borderColor: "white",

    },

    countUnread: {
        color: "white",
        fontSize: 11
    }
})
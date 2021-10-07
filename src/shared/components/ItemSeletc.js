import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { IconButton } from "@shared/components";
import { fonts, colors, images } from "@shared/themes";

export const ItemSelect = ({ title = '', icon, onPress, iconRight, iconRightStyle, iconLeftStyle , textStyle}) => {
    return (
        <TouchableOpacity onPress={() => onPress()} activeOpacity={1} style={styles.item}>
            <IconButton
                icon={icon}
                iconStyle={[styles.iconReport, iconLeftStyle]}
                onPress={() => onPress()}
                renderText={() => <Text style={[styles.text,textStyle]}>{title}</Text>}
            />
            <Image
                source={iconRight ? iconRight : images.iconArrow}
                style={[styles.arrow, iconRightStyle]}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: scaleWidth(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee"
    },

    iconReport: {
        width: scaleHeight(24),
        height: scaleHeight(24),
    },

    text: {
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(16),
        color: colors.greyish_brown_40,
    },

    arrow: {
        width: scaleWidth(6),
        height: scaleHeight(10),
    },
});

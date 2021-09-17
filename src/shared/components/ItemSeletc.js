import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { IconButton } from "@shared/components";
import { fonts, colors, images } from "@shared/themes";

export const ItemSelect = ({ title = '', icon }) => (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
        <IconButton
            icon={icon}
            iconStyle={styles.iconReport}
            onPress={() => { }}
            renderText={() => <Text style={styles.text}>{title}</Text>}
        />
        <Image
            source={images.iconArrow}
            style={styles.arrow}
            resizeMode='contain'
        />
    </TouchableOpacity>
)

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

import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { images } from "@shared/themes/resources";
import { slop } from "@shared/utils";

export const IconButton = ({
    icon = images.iconClose,
    onPress = () => { },
    style,
    iconStyle,
    renderText = null,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, style]}
            hitSlop={slop(20)}
        >
            <Image
                source={icon}
                style={[styles.icon, iconStyle]}
                resizeMode='contain'
            />
            {renderText && renderText()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        resizeMode: 'contain'
    }
});
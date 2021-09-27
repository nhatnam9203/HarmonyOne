import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { images } from "@shared/themes/resources";

export const IconButton = ({
    icon = images.iconClose,
    iconComponent = null,
    onPress = () => { },
    style,
    iconStyle,
    renderText = null,
    slop = { top: 20, left: 20, right: 20, bottom: 20 },
    activeOpacity = 1
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, style]}
            hitSlop={slop}
            activeOpacity={activeOpacity}
        >
            {
                iconComponent ? iconComponent() : <Image
                    source={icon}
                    style={[styles.icon, iconStyle]}
                    resizeMode='contain'
                />
            }
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
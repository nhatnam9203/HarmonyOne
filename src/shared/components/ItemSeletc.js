import React from 'react';
import { StyleSheet, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import { IconButton } from "@shared/components";
import { fonts, colors, images } from "@shared/themes";
import { View } from 'react-native-animatable';

export const ItemSelect = ({ title = '', icon, onPress, iconRight, iconRightStyle, iconLeftStyle, textStyle, style }) => {

    const [isFocus, setFocus] = React.useState(false);

    return (
        <TouchableOpacity
            onLongPress={() => {
                setFocus(true);
                onPress();
            }}
            onPressOut={() => setFocus(false)}
            activeOpacity={1} onPress={() => onPress()}
        >
            <View style={[styles.item, { backgroundColor: isFocus ? colors.ocean_blue : "transparent" }, style]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {icon && <Image
                        resizeMode='contain'
                        source={icon}
                        style={[
                            styles.iconReport, iconLeftStyle,
                            { tintColor: isFocus ? colors.white : "#7C9AB9" }
                        ]}
                    />}

                    <Text style={[styles.text, textStyle, { color: isFocus ? colors.white : "#404040" }]}>
                        {title}
                    </Text>

                </View>

                <Image
                    source={iconRight ? iconRight : images.iconArrow}
                    style={[
                        styles.arrow, iconRightStyle,
                        { tintColor: isFocus ? colors.white : "#404040" }
                    ]}
                    resizeMode='contain'
                />
            </View>
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
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(16),
        color: "#000",
    },

    arrow: {
        width: scaleWidth(6),
        height: scaleHeight(10),
    },
});

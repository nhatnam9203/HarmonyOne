import React from 'react';
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { IconButton } from "@shared/components";
import { fonts, colors, images } from "@shared/themes";
import { View } from 'react-native-animatable';

export const ItemSelect = ({ title = '', icon, onPress, iconRight, iconRightStyle, iconLeftStyle, textStyle }) => {
    return (
        <Pressable onPress={() => onPress()}>
            {
                ({ pressed }) => (
                    <View style={[styles.item, { backgroundColor: pressed ? colors.ocean_blue : "transparent" }]}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                resizeMode='contain'
                                source={icon}
                                style={[
                                    styles.iconReport, iconLeftStyle,
                                    { tintColor: pressed ? colors.white : "#7C9AB9" }
                                ]}
                            />

                            <Text style={[styles.text, textStyle, { color: pressed ? colors.white : "#404040" }]}>
                                {title}
                            </Text>

                        </View>

                        <Image
                            source={iconRight ? iconRight : images.iconArrow}
                            style={[
                                styles.arrow, iconRightStyle,
                                { tintColor: pressed ? colors.white : "#404040" }
                            ]}
                            resizeMode='contain'
                        />
                    </View>
                )
            }
        </Pressable>
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

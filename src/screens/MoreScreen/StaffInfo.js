import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { ProgressiveImage } from "@shared/components";
import { items } from "./Items";
import { useSelector } from "react-redux";
import { translate } from "@localize";


export const StaffInfo = ({
    onEditProfile,
    scroll
}) => {

    const opacity = scroll.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const scale = scroll.interpolate({
        inputRange: [85, 150],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const opacityAvatar = scroll.interpolate({
        inputRange: [85, 150],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const translateText = scroll.interpolate({
        inputRange: [0, 80],
        outputRange: [0, -40],
        extrapolate: "clamp"
    });

    const { staff } = useSelector((state) => state.auth);

    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.wrapAvatar,
                {
                    transform: [{ scale }],
                    opacity: opacityAvatar
                }
            ]}>
                <ProgressiveImage
                    style={styles.avatar}
                    url={staff?.imageUrl}
                    resizeMode='cover'
                    width={'100%'}
                    height={'100%'}
                    cirle={true}
                />
            </Animated.View>
            <Animated.View style={[
                styles.containerInfo,
                {
                    opacity,
                    transform: [{ translateY: translateText }]
                }
            ]}>
                <Text style={styles.txtStaff}>{staff?.displayName}</Text>
                <TouchableOpacity
                    onPress={onEditProfile}
                    hitSlop={slop(30)}
                >
                    <Text style={styles.txtEdit}>{translate("txtEditProfile")}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        zIndex: 99999999999999999,
        transform: [{ translateY: -scaleWidth(375 / 3.5 / 2) }],
        position: "absolute",
        left: "30%",
        height: scaleHeight(190)

    },
    wrapAvatar: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 3,
        borderColor: "white",
        width: scaleWidth(375 / 3.5),
        height: scaleWidth(375 / 3.5),
        borderRadius: 1000,
        zIndex: 9999999999,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 1000,
    },
    containerInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtStaff: {
        marginTop: scaleHeight(24),
        fontSize: scaleFont(20),
        color: colors.black,
        fontFamily: fonts.MEDIUM
    },
    txtEdit: {
        color: "#0764B0",
        marginTop: scaleHeight(10),
        fontSize: scaleFont(14),
        fontFamily: fonts.REGULAR
    }
});

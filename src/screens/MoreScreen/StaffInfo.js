import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { ProgressiveImage } from "@shared/components";
import { items } from "./Items";
import { useSelector } from "react-redux";


export const StaffInfo = ({
    onEditProfile,
}) => {

    const { staff } = useSelector((state) => state.auth);

    return (
        <View style={styles.container}>
            <View style={styles.wrapAvatar}>
                <ProgressiveImage
                    style={styles.avatar}
                    url={staff?.imageUrl}
                    resizeMode='cover'
                    width={'100%'}
                    height={'100%'}
                    cirle={true}
                />
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.txtStaff}>{staff?.displayName}</Text>
                <TouchableOpacity
                    onPress={onEditProfile}
                    hitSlop={slop(30)}
                >
                    <Text style={styles.txtEdit}>Edit profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        zIndex: 2,
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
        transform: [{ translateY: -scaleWidth(375 / 3.5 / 2) }],
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 1000,
    },
    containerInfo: {
        transform: [{ translateY: -scaleWidth(375 / 3.5 / 2) }],
        justifyContent: 'center',
        alignItems: 'center'
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

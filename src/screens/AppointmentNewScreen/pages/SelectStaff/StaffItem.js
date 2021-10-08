import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { CustomImage } from "@shared/components";

export const StaffItem = ({
    item
}) => {
    return (
        <Pressable style={styles.container}>
            <CustomImage
                source={{ uri: item?.imageUrl }}
                resizeMode='cover'
                style={styles.avatarStaff}
            />
            <Text style={styles.displayName}>{item?.displayName}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: 'relative',
        padding: scaleWidth(16),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarStaff: {
        width: scaleWidth(55),
        height: scaleWidth(55),
        borderRadius: 300,
    },
    displayName: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.REGULAR,
        marginLeft: scaleWidth(16)
    }
});

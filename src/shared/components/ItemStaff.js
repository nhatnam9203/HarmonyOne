import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage } from "@shared/components";
import { isEmpty } from "lodash";

export const ItemStaff = ({
    item,
    onPress = () => { },
}) => {

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.row}>
                {
                    isEmpty(item?.imageUrl) ?
                        <CustomImage
                            source={images.staff_default}
                            resizeMode='cover'
                            style={styles.avatarStaff}
                        /> :
                        <CustomImage
                            source={{ uri: item?.imageUrl }}
                            resizeMode='cover'
                            style={styles.avatarStaff}
                        />
                }
                <View style={styles.containerRight}>
                    <Text style={styles.displayName}>
                        {item?.displayName}
                    </Text>
                    <Text style={styles.roleName}>
                        {item?.roleName}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    container: {
        width: "100%",
        position: 'relative',
        padding: scaleWidth(16),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatarStaff: {
        width: scaleWidth(60),
        height: scaleWidth(60),
        borderRadius: 300,
    },
    displayName: {
        fontSize: scaleFont(20),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
    },
    roleName: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.LIGHT,
    },
    containerRight: {
        marginLeft: scaleWidth(16),
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingVertical: scaleHeight(4)
    }
});
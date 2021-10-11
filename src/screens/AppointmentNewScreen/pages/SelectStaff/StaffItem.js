import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage } from "@shared/components";
import { isEmpty } from "lodash";
import AntDesign from "react-native-vector-icons/AntDesign";

export const StaffItem = ({
    item,
    selectStaff,
}) => {
    return (
        <Pressable
            onPress={selectStaff}
            style={styles.container(item?.checked)}
        >
            <View style={styles.row}>
                {
                    isEmpty(item?.imageUrl)? 
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
                <Text style={styles.displayName(item?.checked)}>
                    {item?.displayName}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: checked => {
        return {
            width: "100%",
            position: 'relative',
            padding: scaleWidth(16),
            borderBottomWidth: 1,
            borderBottomColor: '#eeeeee',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: checked ? colors.ocean_blue : "transparent"
        }
    },
    avatarStaff: {
        width: scaleWidth(55),
        height: scaleWidth(55),
        borderRadius: 300,
    },
    displayName: checked => {
        return {
            fontSize: scaleFont(17),
            color: checked ? "white" : "#404040",
            fontFamily: fonts.REGULAR,
            marginLeft: scaleWidth(16)
        }
    }
});

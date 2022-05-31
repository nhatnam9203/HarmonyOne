import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, ProgressiveImage } from "@shared/components";
import Ionicons from "react-native-vector-icons/Ionicons";

export const StaffItem = ({
    item,
    selectStaff = () => { },
}) => {
    return (
        <Pressable
            onPress={selectStaff}
            style={styles.container(item?.checked)}
        >
            <View style={styles.containerRow}>
                <View style={styles.row}>
                    <ProgressiveImage
                        url={item?.imageUrl}
                        defaultSource={images.staff_default}
                        resizeMode='cover'
                        width={scaleWidth(55)}
                        height={scaleWidth(55)}
                        style={styles.avatarStaff}
                    />
                    <Text style={styles.displayName(item?.checked)}>
                        {item?.displayName}
                    </Text>
                </View>
                {
                    item?.checked &&
                    <Ionicons
                        name={"md-radio-button-on"}
                        size={27}
                        color="#2B62AB"
                    />
                }
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: scaleWidth(340)
    },
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
            color: "#404040",
            fontFamily: fonts.REGULAR,
            marginLeft: scaleWidth(16)
        }
    }
});

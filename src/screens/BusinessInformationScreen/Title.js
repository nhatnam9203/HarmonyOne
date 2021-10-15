import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';

export const Title = ({
    text = "Personal Info",
    onEdit = () => { }
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>
            <TouchableOpacity hitSlop={slop(20)} onPress={onEdit}>
                <Text style={styles.txtEdit}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: fonts.BOLD,
        color: colors.ocean_blue,
        fontSize: scaleFont(19),
        marginBottom: scaleHeight(8)
    },
    txtEdit: {
        color: colors.ocean_blue,
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR
    }
});

export default Title;
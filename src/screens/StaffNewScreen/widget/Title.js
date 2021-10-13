import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { images, colors, fonts } from "@shared/themes";

export const Title = ({
    text = "Personal Info"
}) => {
    return (
        <Text style={styles.title}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    title : {
        fontFamily: fonts.BOLD,
        color : colors.ocean_blue,
        fontSize : scaleFont(19),
        marginBottom : scaleHeight(8)
    }
});

export default Title;
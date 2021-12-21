import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, SectionList, Alert, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";

export const AddGiftCard = ({
    onPress = () => { },
    data
}) => {

    const {

    } = useSelector(state => state);

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container]}>
            <Image source={images.iconReportGiftcard} style={styles.iconGiftCard} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent : "center",
        height : "100%"
    },
    iconGiftCard: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        tintColor : "#404040"
    },
    txtAddGiftCard: {
        fontSize: scaleFont(17),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(16),
    },
})
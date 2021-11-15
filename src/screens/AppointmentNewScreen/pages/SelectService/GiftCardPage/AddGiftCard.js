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
        <TouchableOpacity onPress={onPress} style={[styles.container, { marginTop: data?.length > 0 ? scaleHeight(32) : 0 }]}>
            <Image source={images.iconReportGiftcard} style={styles.iconGiftCard} />
            <Text style={styles.txtAddGiftCard}>Add gift card</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: scaleWidth(16),
        marginTop: scaleHeight(32),
        alignSelf: 'flex-start'
    },
    iconGiftCard: {
        width: scaleWidth(35),
        height: scaleWidth(35),
    },
    txtAddGiftCard: {
        fontSize: scaleFont(16),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(16)
    },
})
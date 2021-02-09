import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back } from '@assets'
import NavigationService from '@navigation/NavigationService';

const ButtonSave = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text fontFamily='medium' style={styles.text}>
                    Save
            </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonSave;

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        paddingBottom : scaleHeight(4),
        width : scaleWidth(100),
        paddingTop : scaleHeight(2),
        paddingHorizontal: scaleWidth(5)
    },
    button: {
        width : scaleWidth(90),
        height : scaleHeight(6),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 6,
        backgroundColor : '#1366AE'
    },
    text: {
        color: 'white',
        fontSize : scaleWidth(4.5),
    }
})
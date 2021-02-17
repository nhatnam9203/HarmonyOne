import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back } from '@assets'
import NavigationService from '@navigation/NavigationService';

const Header = ({ status = 'checkin' }) => {

    const back = () => {
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <Text fontFamily='medium' style={styles.title}>
                Check out
            </Text>
            <ButtonBack onPress={back} />
        </View>
    )
}

const ButtonBack = ({ onPress = () => { } }) => (
    <TouchableOpacity hitSlop={slop} activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image source={back} style={styles.iconBack} resizeMode='contain' />
    </TouchableOpacity>
)

export default Header;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
        paddingTop: scaleHeight(8),
        paddingBottom: scaleHeight(1.5),
        backgroundColor: '#1366AE',
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        fontSize: scaleWidth(5),
        color: 'white'
    },
    iconBack: {
        tintColor: 'white',
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    btnBack: {
        position: 'absolute',
        top: scaleHeight(8.2),
        left: scaleWidth(5),
    }
})
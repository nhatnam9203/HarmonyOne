import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back } from '@assets'
import NavigationService from '@navigation/NavigationService';

const Header = ({ status = 'checkin' }) => {

    const back = () =>{
        NavigationService.back();
    }

    return (
        <View style={styles.container(status)}>
            <Text fontFamily='medium' style={styles.title(status)}>
                Appointment details
            </Text>
            <ButtonBack onPress={back} />
        </View>
    )
}

const ButtonBack = ({ onPress = () => { } }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image source={back} style={styles.iconBack} resizeMode='contain' />
    </TouchableOpacity>
)

export default Header;

const styles = StyleSheet.create({
    container: status => {
        let backgroundColor = '#FFFD88';
        switch (status) {
            case 'unconfirm':
                backgroundColor = '#FFFD88'
                break;
            case 'confirm':
                backgroundColor = '#D5F8FC'
                break;
            case 'checkin':
                backgroundColor = '#28AAE9'
                break;
            case 'paid':
                backgroundColor = '#50CF25'
                break;

            default:
                break;
        }
        return {
            width: scaleWidth(100),
            paddingTop: scaleHeight(8),
            paddingBottom: scaleHeight(1.5),
            backgroundColor,
            position: 'relative'
        }
    },
    title: status => {
        return {
            textAlign: 'center',
            fontSize: scaleWidth(5),
            color: 'white'
        }
    },
    iconBack: {
        tintColor: 'white',
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    btnBack: {
        position: 'absolute',
        top: scaleHeight(8.2),
        left: scaleWidth(3),
    }
})
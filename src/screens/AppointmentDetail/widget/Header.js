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
            <ButtonBack onPress={back} status={status} />
        </View>
    )
}

const ButtonBack = ({ onPress = () => { } , status}) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image source={back} style={styles.iconBack(status)} resizeMode='contain' />
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
        let color = '#000000';
        if(status == 'checkin' || status == 'paid') color = 'white';
        return {
            textAlign: 'center',
            fontSize: scaleWidth(5),
            color,
        }
    },
    iconBack: status => {
        let tintColor = '#000000';
        if(status == 'checkin' || status == 'paid') tintColor = 'white';
        return{
            tintColor,
            width: scaleWidth(5),
            height: scaleWidth(5)
        }
    },
    btnBack: {
        position: 'absolute',
        top: scaleHeight(8.2),
        left: scaleWidth(5),
    }
})
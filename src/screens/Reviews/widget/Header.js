import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back, clear } from '@assets'
import NavigationService from '@navigation/NavigationService';

const Header = ({ status = 'checkin', openPopupFilter }) => {

    const back = () => {
        NavigationService.back();
    }

    const openFilter = () => {
        openPopupFilter();
    }

    return (
        <View style={styles.container(status)}>
            <Text fontFamily='medium' style={styles.title(status)}>
                Reviews
            </Text>
            <ButtonBack onPress={back} />
            <ButtonClear onPress={openFilter} />
        </View>
    )
}

const ButtonBack = ({ onPress = () => { } }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image source={back} style={styles.iconBack} resizeMode='contain' />
    </TouchableOpacity>
)
const ButtonClear = ({ onPress = () => { } }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnClear}>
        <View style={styles.align} />
        <View style={[styles.align,{ width : scaleWidth(3.5) }]} />
        <View style={[styles.align,{ width : scaleWidth(1.5) }]} />
    </TouchableOpacity>
)

export default Header;

const styles = StyleSheet.create({
    container: status => {
        return {
            width: scaleWidth(100),
            paddingTop: scaleHeight(8),
            paddingBottom: scaleHeight(1.5),
            backgroundColor: 'white',
            position: 'relative',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 1.04,
            elevation: 3,
        }
    },
    title: status => {
        return {
            textAlign: 'center',
            fontSize: scaleWidth(5),
            color: '#000000'
        }
    },
    iconBack: {
        tintColor: '#000000',
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    btnBack: {
        position: 'absolute',
        top: scaleHeight(8.2),
        left: scaleWidth(5),
    },
    btnClear: {
        position: 'absolute',
        top: scaleHeight(8.2),
        right: scaleWidth(5),
        justifyContent : 'center',
        alignItems : 'center'
    },
    align : {
        height : 2.4,
        width : scaleWidth(5),
        backgroundColor : '#000000',
        marginBottom : scaleHeight(0.4)
    }
})
import React from 'react'
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { Text } from '@components'
import { backgroundHeader, bell } from '@assets'
import NavigationService from '@navigation/NavigationService'

const Header = () => {

    const navigateNotification = () => {
        NavigationService.navigate('Notification');
    }

    return (
        <ImageBackground source={backgroundHeader} style={styles.header}>
            <Text fontFamily='medium' style={styles.title}>
                Statistics
           </Text>
           <IconBell onPress={navigateNotification} />
        </ImageBackground>
    )
}

const IconBell = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.btnBell} onPress={onPress}>
            <Image source={bell} style={styles.bell} />
        </TouchableOpacity>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: scaleWidth(100),
        height: scaleHeight(14),
        marginTop: -6,
        paddingTop: scaleHeight(8)
    },
    title: {
        textAlign: 'center',
        fontSize: scaleWidth(5.6),
        color: 'white'
    },
    btnBell : {
        position: 'absolute',
        right: scaleWidth(5),
        top : scaleHeight(6.5)
    },

    bell: {
        width: scaleWidth(5.3),
        height: scaleWidth(5.3),
        marginTop: scaleWidth(1.5)
    },

})
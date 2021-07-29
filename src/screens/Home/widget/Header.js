import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { Text } from '@components'
import { backgroundHeader, avatarUser, bell, email } from '@assets'
import NavigationService from '@navigation/NavigationService'
import { useSelector } from 'react-redux'

const Header = ({ txtHeader }) => {

    const { staffInfo } = useSelector(state => state.authReducer);

    const navigateNotification = () => {
        NavigationService.navigate('Notification');
    }

    const avatar = staffInfo.imageUrl ? { uri : staffInfo.imageUrl } : avatarUser;

    return (
        <ImageBackground source={backgroundHeader} style={styles.header}>
            <View style={styles.rowHeader}>
                <View style={styles.rowLeft}>
                    <Image source={avatar} style={styles.avatar} />
                    <View style={{ marginLeft: scaleWidth(3) }}>
                        <Text fontFamily='medium' style={styles.txtUser}>
                            {`Welcome ${staffInfo?.displayName || ''}!`}
                        </Text>
                        <View style={[styles.rowLeft, { marginTop: scaleWidth(1) }]}>
                            <Image source={email} style={styles.email} />
                            <Text style={styles.txtEmail}>
                                {`${staffInfo?.email || ''}!`}
                            </Text>
                        </View>
                    </View>
                </View>
                <IconBell onPress={navigateNotification} />
            </View>
        </ImageBackground>
    )
}

const IconBell = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
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
        paddingTop: scaleHeight(6.5)
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(5)
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: scaleWidth(13),
        height: scaleWidth(13),
        borderRadius: scaleWidth(50)
    },
    bell: {
        width: scaleWidth(5.3),
        height: scaleWidth(5.3),
        marginTop: scaleWidth(1.5)
    },
    email: {
        width: scaleWidth(4),
        height: scaleWidth(4)
    },
    txtUser: {
        fontSize: scaleWidth(4.7),
        color: 'white'
    },
    txtEmail: {
        fontSize: scaleWidth(3.5),
        color: 'white',
        marginLeft: scaleWidth(1)
    }
})
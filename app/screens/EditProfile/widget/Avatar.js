import React from 'react'
import { View, StyleSheet, Image , TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { avatarUser, camera } from '@assets'

const Avatar = () => {
    return (
        <TouchableOpacity style={styles.wrapAvatar}>
            <View style={{ position: 'relative' }}>
                <Image source={avatarUser} style={styles.avatar} />
                <Image source={camera} style={styles.camera} resizeMode='contain' />
            </View>
        </TouchableOpacity>
    )
}

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        borderRadius: scaleWidth(80)
    },
    wrapAvatar: {
        width: scaleWidth(32),
        height: scaleWidth(32),
        borderRadius: scaleWidth(80),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        top: scaleHeight(21) - scaleWidth(16),
        left: scaleWidth(50 - 16),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    camera : {
        width : scaleWidth(7),
        height : scaleWidth(7),
        position: 'absolute',
        bottom : scaleWidth(3),
        left : scaleWidth(11.5)
    }
})
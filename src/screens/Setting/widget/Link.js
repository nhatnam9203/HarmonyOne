import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'
import { rightButton } from '@assets'
import { scaleWidth, scaleHeight } from '@utils'

const Link = ({ text , onPress = () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <Text style={styles.content}>{text}</Text>
            <Image source={rightButton} style={styles.icon} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export default Link;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1.5),
    },
    content: {
        fontSize : scaleWidth(4.3),
        color : '#404040',
    },
    icon: {
        width: scaleWidth(2.7),
        height: scaleWidth(2.7),
        tintColor: '#404040',
    }
})

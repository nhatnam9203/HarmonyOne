import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { back } from '@assets'
import { Text } from '@components'
import styles from '../styles';

const ButtonBack = ({
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonBack}
            hitSlop={{
                top : 30,
                bottom: 30,
                left: 30,
                right: 30
            }}
        >
            <Image source={back} style={styles.iconBack} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export default ButtonBack;
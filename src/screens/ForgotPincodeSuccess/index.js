import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { logoHarmony, back } from '@assets'
import { slop } from '@utils'
import NavigationService from '@navigation/NavigationService'
import styles from './styles'

const index = () => {

    const back = () => {
        NavigationService.back();
    }

    const backSignIn = () => {
        NavigationService.navigate('LoginMID');
    }

    return (
        <View style={styles.container}>
            <ButtonBack onPress={back} />
            <Text
                fontFamily='medium'
                style={styles.title}
            >
                Forgot PIN code
            </Text>
            <Image
                style={styles.logo}
                source={logoHarmony}
                resizeMode='contain'
            />
            <Text fontFamily='medium' style={[styles.title, { marginTop: 0 }]}>
                Email sent!
            </Text>
            <Text style={styles.content}>
                We've sent you an email with your ID. Check your email to know your Merchant ID.
            </Text>
            <TouchableOpacity
                onPress={backSignIn}
                hitSlop={slop}
                style={styles.btnBottom}
            >
                <Text fontFamily='medium' style={styles.txtBottom}>
                    Back to Sign In
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const ButtonBack = ({
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonBack}
            hitSlop={{
                top: 30,
                bottom: 30,
                left: 30,
                right: 30
            }}
        >
            <Image source={back} style={styles.iconBack} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export default index;
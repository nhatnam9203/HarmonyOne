import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back, checked, avatarUser } from '@assets'
import NavigationService from '@navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient'

const Header = ({ onSubmit }) => {

    const back = () => {
        NavigationService.back();
    }

    return (
        <LinearGradient colors={['#0A70BB', '#17A4EC']} style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity slop={slop} onPress={back}>
                    <Image
                        source={require('../../../assets/auth/back.png')}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text fontFamily='medium' style={styles.title}>
                    Edit profile
                </Text>
                <TouchableOpacity hitSlop={slop}>
                    <Image
                        source={checked}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
        height: scaleHeight(21),
        paddingTop: scaleHeight(7)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(5)
    },
    icon: {
        width: scaleWidth(5),
        height: scaleWidth(5),
        tintColor: 'white',
    },
    title: {
        color: 'white',
        fontSize: scaleWidth(5.5)
    },
})
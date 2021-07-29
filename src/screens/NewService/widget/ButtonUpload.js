import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { icon_addImage } from '@assets'
import NavigationService from '@navigation/NavigationService';

const ButtonUpload = ({ onPress = () => { } }) => (
    <View style={styles.container}>
        <Text style={styles.text}>Image</Text>
        <TouchableOpacity style={styles.btnIcon} onPress={onPress}>
            <Image style={styles.icon} source={icon_addImage} />
        </TouchableOpacity>
    </View>
)

export default ButtonUpload;

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(2)
    },
    text: {
        color: '#7B99BA',
        fontSize: scaleWidth(4.5)
    },
    btnIcon : {
        width: scaleWidth(30),
        height: scaleWidth(30),
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        backgroundColor : '#FAFAFA',
        marginTop : scaleHeight(2)
    },
    icon: {
        width: scaleWidth(17),
        height: scaleWidth(17)
    }
})
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back, checked } from '@assets'
import NavigationService from '@navigation/NavigationService';

const ImageUpload = ({ status = 'checkin' }) => {

    const back = () => {
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <ButtonBack onPress={back} />
            <Text fontFamily='medium' style={styles.title}>
                New Service
            </Text>
            <ButtonChecked onPress={()=>{}} />
        </View>
    )
}

const ButtonBack = ({ onPress = () => { } }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image source={back} style={styles.iconBack} resizeMode='contain' />
    </TouchableOpacity>
)

const ButtonChecked = ({ onPress = () => { } }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btnBack}>
        <Image
            source={checked}
            style={[styles.iconBack, { tintColor: '#50CF25' }]}
            resizeMode='contain'
        />
    </TouchableOpacity>
)

export default ImageUpload;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
        paddingTop: scaleHeight(8),
        paddingBottom: scaleHeight(1.5),
        paddingHorizontal: scaleWidth(5),
        backgroundColor: 'white',
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 1.04,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: scaleWidth(5),
        color: '#000000'
    },
    iconBack: {
        tintColor: '#000000',
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    btnBack: {

    }
})
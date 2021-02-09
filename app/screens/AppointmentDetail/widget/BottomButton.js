import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { treedot } from '@assets'

const BottomButton = ({ openModal }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openModal} hitSlop={slop} style={styles.btnTreedot}>
                <Image source={treedot} style={styles.treedot} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={slop} style={styles.btnConfirm}>
                <Text fontFamily='medium' style={styles.txtConfirm}>Confirm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: scaleHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(5),
        paddingBottom: scaleHeight(4),
        backgroundColor: 'white'
    },
    treedot: {
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    btnTreedot: {
        height: scaleHeight(6),
        width: scaleHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    btnConfirm: {
        width: scaleWidth(74),
        height: scaleHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#1366AE',
        marginLeft: scaleWidth(3)
    },
    txtConfirm: {
        color: 'white',
        fontSize: scaleWidth(4.5)
    }
})
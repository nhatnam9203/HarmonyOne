import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'

const ButtonApply = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text fontFamily='bold' style={styles.text}>
                    Apply
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonApply;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingBottom: scaleHeight(4),
        width: scaleWidth(100),
        paddingTop: scaleHeight(2),
        paddingHorizontal: scaleWidth(5),
        position: 'absolute',
        bottom: 0,
    },
    button: {
        width: scaleWidth(90),
        height: scaleHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#1366AE'
    },
    text: {
        color: 'white',
        fontSize: scaleWidth(4.5),
    }
})
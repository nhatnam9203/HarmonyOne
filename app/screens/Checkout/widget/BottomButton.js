import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'

const BottomButton = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                hitSlop={slop}
                style={styles.btnConfirm}
            >
                <Text fontFamily='bold' style={styles.txtConfirm}>
                    {'Charge'}
                </Text>
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
    btnConfirm: {
        width: scaleWidth(85),
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
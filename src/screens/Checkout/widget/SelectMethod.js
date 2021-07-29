import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { rightButton } from '@assets'

const TotalInfo = ({ onPress , methodPay }) => {
    return (
        <View>
            <Text fontFamily='bold' style={[styles.titleMethod,{ marginTop: scaleHeight(3) }]}>
                Payment method
            </Text>
            <TouchableOpacity onPress={onPress} style={[styles.row,{ marginTop: scaleHeight(2) }]}>
                <Text fontFamily='bold' style={[styles.titleMethod,{ color: '#000000' }]}>
                    {methodPay}
                </Text>
                <Image style={styles.iconRight} source={rightButton} resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default TotalInfo;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(0.8)
    },
    titleMethod: {
        fontSize : scaleWidth(5),
        color: '#1366AE'
    },
    iconRight: {
        width : scaleWidth(4),
        height : scaleWidth(4),
        tintColor : '#000000'
    }
})
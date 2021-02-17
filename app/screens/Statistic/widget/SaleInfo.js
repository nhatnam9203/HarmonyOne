import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { icon_sales } from '@assets'

const SaleInfo = ({}) => {
    return (
        <View style={styles.item}>
            <Text fontFamily='medium' style={styles.title}>Total Sales</Text>
            <Text fontFamily='bold' style={styles.qty}>$ 25,00.00</Text>
            <Text>
                <Text style={[styles.content,{ color: '#404040' }]}>Cash</Text>
                <Text fontFamily='medium' style={styles.content}>{` 1500.00 (60%)`}</Text>
            </Text>
            <Text style={{ marginTop: scaleHeight(1) }}>
                <Text style={[styles.content,{ color: '#404040' }]}>HarmonyPay</Text>
                <Text fontFamily='medium' style={styles.content}>{` 500.00 (20%)`}</Text>
            </Text>
            <Text style={{ marginTop: scaleHeight(1) }}>
                <Text style={[styles.content,{ color: '#404040' }]}>Credit card</Text>
                <Text fontFamily='medium' style={styles.content}>{` 500.00 (20%)`}</Text>
            </Text>

            <Image source={icon_sales} style={styles.icon} />
        </View>
    )
}

export default SaleInfo;

const styles = StyleSheet.create({
    item: {
        padding: scaleWidth(5),
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: scaleHeight(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.11,
        shadowRadius: 1.84,

        elevation: 3,

    },
    title : {
        fontSize: scaleWidth(4.7),
        color: '#000000',
    },
    qty : {
        fontSize: scaleWidth(8),
        color: '#1366AE',
        marginVertical : scaleHeight(2)
    },
    content : {
        fontSize: scaleWidth(4),
        color: '#000000'
    },
    icon : {
        position: 'absolute',
        top : scaleWidth(5),
        right: scaleWidth(5),
        height : scaleWidth(3),
        width : scaleWidth(13),
        height : scaleWidth(13)
    }
})

import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TouchableOpacityComponent } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, convertMinsToHrsMins } from '@utils'
import { defaultService } from '@assets'

const ItemService = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.row, styles.item]}
        >
            <Image
                style={styles.iconService}
                source={defaultService}
            />
            <View style={styles.containerRight}>
                <Text
                    fontFamily='medium'
                    style={styles.serviceName}
                >
                    {item.serviceName}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.duration}>
                        {convertMinsToHrsMins(item.duration)}
                    </Text>
                    <Text fontFamily='medsium' style={styles.price}>
                        {`$ ${item.price}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemService;

const styles = StyleSheet.create({
    item: {
        marginTop: scaleHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom: scaleHeight(2)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerRight: {
        marginLeft: scaleWidth(3),
        width: scaleWidth(67),
        height: scaleWidth(20),
        justifyContent: 'space-between',
    },
    serviceName: {
        fontSize: scaleWidth(5),
        color: '#1366AE'
    },
    duration: {
        color: '#6A6A6A',
        fontSize: scaleWidth(4.3)
    },
    price: {
        fontSize: scaleWidth(4.3),
        color: '#404040'
    },
    iconService: {
        borderRadius: 5,
        height: scaleWidth(20),
        width: scaleWidth(20),
    }
})
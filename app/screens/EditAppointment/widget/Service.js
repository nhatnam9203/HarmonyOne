import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'

const Service = ({ }) => {
    return (
        <React.Fragment>
            <Text style={styles.title} fontFamily='medium'>
                Services
            </Text>
            <ItemService />
            <ItemService />
        </React.Fragment>
    )
}

const ItemService = () => {
    return (
        <View style={styles.itemService}>
            <Text style={styles.time} fontFamily='bold'>
                10:00 AM
            </Text>
            <View style={styles.row}>
                <Text fontFamily='medium' style={styles.serviceName}>
                    Spa pedi - Artwork & Gel color
                </Text>
                <Text fontFamily='medium' style={styles.price}>
                    $ 50.00
                </Text>
            </View>
            <Text style={styles.duration}>
                60 min
            </Text>
        </View>
    )
}

export default Service;

const styles = StyleSheet.create({
    title: {
        fontSize: scaleWidth(4),
        color: '#404040',
        marginVertical: scaleHeight(2)
    },
    time: {
        color: '#000000',
        fontSize: scaleWidth(4.5)
    },
    serviceName: {
        fontSize: scaleWidth(4),
        color: '#1366AE'
    },
    price: {
        fontSize: scaleWidth(4),
        color: '#000000'
    },
    duration: {
        color: '#585858',
        fontSize: scaleWidth(3.7),
        marginTop: scaleHeight(0.8)
    },
    itemService: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom: scaleHeight(1),
        marginBottom: scaleHeight(1)
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
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
            <TotalInfo />
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

const TotalInfo = () => {
    return (
        <View>
            <Text style={styles.totalDuration}>
                Total Duration : 90 min
            </Text>
            <View style={[styles.row,{ marginTop : scaleHeight(2) }]}>
                <Text
                    fontFamily='bold'
                    fontSize={scaleWidth(4)}
                    style={{ color: '#7B99BA' }}
                >
                    Total
                </Text>
                <Text
                    fontFamily='bold'
                    fontSize={scaleWidth(5)}
                    style={{ color: '#50CF25' }}
                >
                    $ 100.00
                </Text>
            </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(0.8)
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
    totalDuration: {
        color: '#7B99BA',
        fontSize: scaleWidth(3.8),
        alignSelf: 'flex-end',
        marginTop: scaleHeight(0.5)
    }
})
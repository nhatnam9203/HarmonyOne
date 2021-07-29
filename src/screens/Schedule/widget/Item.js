import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, statusConvert } from '@utils'
import { barTimeLine, personHome } from '@assets';

const Item = ({ item }) => {
    return (
        <View style={styles.containerItem}>
            <View>
                <Image source={barTimeLine} style={styles.barTimeLine} resizeMode='contain' />
            </View>
            <View style={styles.item}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <View style={styles.row}>
                        <Text style={styles.time}>{item.toTime}</Text>
                        <Text fontFamily='medium' style={styles.userName}>
                            {item.userName}
                        </Text>
                    </View>
                    <View style={styles.wrapStatus(item.status)}>
                        <Text style={styles.txtStatus(item.status)}>{statusConvert[item.status]}</Text>
                    </View>
                </View>

                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <View style={styles.row}>
                        <Text style={styles.time}>{item.fromTime}</Text>
                        <Text style={styles.phone}>
                            {item.phone}
                        </Text>
                    </View>
                    {item.status == 'unconfirm' && <Image style={styles.iconPersonHome} source={personHome} />}
                </View>
            </View>
        </View>
    )
}

export default Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    date: {
        fontSize: scaleWidth(4.35),
        marginVertical: scaleHeight(1.6),
        marginLeft: scaleWidth(3),
        color: '#404040'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        fontSize: scaleWidth(3.5),
        color: '#404040'
    },
    userName: {
        fontSize: scaleWidth(4.5),
        color: '#1366AE',
        marginLeft: scaleWidth(7)
    },
    containerItem: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingLeft: scaleWidth(3),
        backgroundColor: 'white',
        marginBottom: scaleHeight(0.4),
    },
    item: {
        marginBottom: scaleHeight(0.4),
        backgroundColor: 'white',
        paddingRight: scaleWidth(3),
        paddingVertical: scaleWidth(2),
        paddingLeft: scaleWidth(1),
        width: scaleWidth(91),
        height: scaleWidth(6) + scaleHeight(7),
        justifyContent: 'space-between',

    },
    phone: {
        marginLeft: scaleHeight(3),
        fontSize: scaleWidth(3.5),
        color: '#7B99BA'
    },
    wrapStatus: status => {
        let backgroundColor = '#FFFD88';
        switch (status) {
            case 'unconfirm':
                backgroundColor = '#FFFD88'
                break;
            case 'confirm':
                backgroundColor = '#D5F8FC'
                break;
            case 'checkin':
                backgroundColor = '#28AAE9'
                break;
            case 'paid':
                backgroundColor = '#50CF25'
                break;
            case 'cancel':
                backgroundColor = '#CCCCCC'
                break;

            default:
                break;
        }
        return {
            backgroundColor,
            width: scaleWidth(23),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: scaleWidth(1.1),
            borderRadius: 300
        }

    },
    txtStatus: status => {
        let color = 'white';
        if (status == 'unconfirm' || status == 'confirm' || status == 'cancel') {
            color = '#404040';
        }
        return {
            fontSize: scaleWidth(3.3),
            color,
        }
    },
    barTimeLine: {
        height: scaleHeight(7)
    },
    iconPersonHome: {
        width: scaleWidth(5),
        height: scaleWidth(5),
        tintColor: '#7B99BA',
    }
})
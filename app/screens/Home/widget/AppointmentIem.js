import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { Text } from '@components'
import { personHome } from '@assets'

const AppointmentItem = ({ item }) => {

    return (
        <View style={styles.item(item.status)}>
            {item.status == 'unconfirm' && <IconPerson />}

            <Text fontFamily='bold' style={styles.time(item.status)}>
                {`${item.fromTime} - ${item.toTime}`}
            </Text>

            <Text
                fontFamily='medium'
                style={[styles.time(item.status), { fontSize: scaleWidth(4.7), marginTop: scaleWidth(1) }]}
            >
                {`${item.name}`}
            </Text>

            <Text
                style={[styles.time(item.status), { fontSize: scaleWidth(3.2), marginTop: scaleWidth(0.5) }]}
            >
                {`${item.phone}`}
            </Text>

            <View style={{ marginTop: scaleWidth(2) }}>
                {
                    item.services.map((obj) => (
                        <Text style={[styles.time(item.status), { fontSize: scaleWidth(3.2) }]}>
                            {obj.name}
                        </Text>
                    ))
                }
            </View>
        </View>
    )
}

const IconPerson = () => {
    return (
        <TouchableOpacity
            hitSlop={{
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            }}
            style={styles.btnPeronHome}>
            <Image
                source={personHome}
                style={styles.personHome}
            />
        </TouchableOpacity>
    )
}

export default AppointmentItem;

const styles = StyleSheet.create({
    item: status => {
        let backgroundColor = '#50CF25'
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

            default:
                break;
        }
        return {
            width: scaleWidth(90),
            borderRadius: 8,
            padding: scaleWidth(5),
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.11,
            shadowRadius: 2.24,
            elevation: 3,
            backgroundColor,
            marginTop: scaleHeight(1.5),
            marginHorizontal: scaleWidth(5),
            position: 'relative'
        }
    },
    time: status => {
        let color = 'white';
        if (status == 'confirm' || status == 'unconfirm') {
            color = '#000000'
        }
        return {
            fontSize: scaleWidth(4.8),
            color,
        }
    },
    personHome: {
        width: scaleWidth(5.5),
        height: scaleWidth(5.5),
        tintColor: 'black'
    },
    btnPeronHome: {
        position: 'absolute',
        top: scaleWidth(5),
        right: scaleWidth(5),
    }
})
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { Text } from '@components'
import { personHome } from '@assets'
import NavigationService from '@navigation/NavigationService'
import styles from './styles'

const AppointmentItem = ({ item }) => {
    const navigateDetail = () => {
        NavigationService.navigate('AppointmentDetail')
    }

    return (

        <TouchableOpacity onPress={navigateDetail} style={styles.item(item.status)}>
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
                        <Text fontFamily={'light'} style={[styles.time(item.status), { fontSize: scaleWidth(3.2) }]}>
                            {obj.name}
                        </Text>
                    ))
                }
            </View>
        </TouchableOpacity>
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
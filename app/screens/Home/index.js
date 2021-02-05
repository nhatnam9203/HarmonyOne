import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, HeaderCalendar , AppointmentList } from './widget'
import styles from './styles'

const index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <HeaderCalendar />
                <AppointmentList />
            </View>
        </View>
    )
}

export default index;
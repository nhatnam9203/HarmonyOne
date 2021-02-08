import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, HeaderCalendar , AppointmentList } from './widget'
import HomeStack from './HomeStack'
import styles from './styles'

const index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <HeaderCalendar />
                <HomeStack />
            </View>
        </View>
    )
}

export default index;
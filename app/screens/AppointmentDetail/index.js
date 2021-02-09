import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { Header, UserInfo, Time, Service, HomeService } from './widget'
import styles from './styles'

const index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <UserInfo />
                <HomeService />
                <Time />
                <Service />
            </View>
        </View>
    )
}

export default index;

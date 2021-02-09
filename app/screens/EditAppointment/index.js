import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '@components'
import { scaleHeight } from '@utils'
import { Header, UserInfo, Time, Service, HomeService, ButtonSave, TotalInfo } from './widget'
import styles from './styles'

const index = () => {

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.body}>
                <UserInfo />
                <HomeService />
                <Time />
                <Service />
                <TotalInfo />
                <View style={{ height: scaleHeight(40) }} />
            </ScrollView>
            <ButtonSave />
        </View>
    )
}

export default index;

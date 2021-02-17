import React, { Component } from 'react'
import { View ,Text} from 'react-native'
import { Header } from './widget'
import Navigation from './navigation'
import styles from './styles'

const index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <Navigation />
            </View>
        </View>
    )
}

export default index;
import React from 'react'
import { View, ScrollView } from 'react-native'
import styles from './styles'
import { scaleHeight } from '@utils'
import { Header, Avatar, InputProfile } from './widget'

const index = () => {

    const onSubmit = () => {

    }

    return (
        <ScrollView bounces={false} style={styles.container}>
            <Header onSubmit={onSubmit} />
            <Avatar />
            <View style={styles.body}>
                <InputProfile title='Full name' />
                <InputProfile title='Display name' />
                <InputProfile title='Cell phone' />
                <InputProfile title='Email' />
                <InputProfile title='Address' />
                <View style={{ height: scaleHeight(40) }} />
            </View>
        </ScrollView>
    )
}

export default index;
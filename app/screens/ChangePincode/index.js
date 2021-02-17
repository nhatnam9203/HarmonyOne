import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import PincodeNavigation from './navigation'
import { Header } from './widget'
import styles from './styles'

const index = () => {

    return (
        <View style={styles.container}>
            <Header />
            <PincodeNavigation />
        </View>
    )
}

export default index;

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'

const Time = ({ }) => {
    return (
        <Text style={styles.time} fontFamily='medium'>
            Date : Thursday, 20 Feb 2020
        </Text>
    )
}

export default Time;

const styles = StyleSheet.create({
    time: {
        fontSize: scaleWidth(4.3),
        color: '#7B99BA',
        marginTop : scaleHeight(2)
    }
})
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'

const StartTime = ({ startTime, openTimePicker }) => {
    return (
        <TouchableOpacity onPress={openTimePicker}>
            <Text fontFamily='medium' style={styles.title}>
                {'Start time'}
            </Text>
            <View style={styles.wrapTime}>
                <Text fontFamily='bold' style={styles.time}>{startTime}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default StartTime;

const styles = StyleSheet.create({
    title: {
        fontSize: scaleWidth(4),
        color: '#7B99BA',
    },
    wrapTime: {
        width: scaleWidth(90),
        height: scaleHeight(5),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dddddd',
        marginTop: scaleHeight(1),
        marginBottom: scaleHeight(3),
    },
    time: {
        color: '#000000',
        fontSize: scaleWidth(4.2),
    }
})
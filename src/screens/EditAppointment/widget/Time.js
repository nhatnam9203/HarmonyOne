import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { rightButton } from '@assets';

const Time = ({ openCalendarPicker = () => { } }) => {
    return (
        <TouchableOpacity
            hitSlop={slop}
            onPress={openCalendarPicker}
            style={styles.row}
        >
            <Text style={styles.time} fontFamily='medium'>
                Thursday, 20 Feb 2020
            </Text>
            <Image
                resizeMode='contain'
                source={rightButton} style={styles.rightButton}
            />
        </TouchableOpacity>
    )
}

export default Time;

const styles = StyleSheet.create({
    time: {
        fontSize: scaleWidth(4.8),
        color: '#1366AE',
    },
    rightButton: {
        width: scaleWidth(3.5),
        height: scaleWidth(3.5)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(2)

    }
})
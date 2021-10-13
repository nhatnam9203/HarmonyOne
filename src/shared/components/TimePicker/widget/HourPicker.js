import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import styles from '../styles'

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HourPicker = ({ hour, selectHour }) => {
    return (
        <View style={styles.hourPickerContainer}>
            <Text fontFamily='medium' style={styles.txtSelect}>Select Hour</Text>
            <View style={[styles.row, { flexWrap: 'wrap', justifyContent: 'center' }]}>
                {
                    hours.map(h => (
                        <TouchableOpacity
                            onPress={() => selectHour(h)}
                            style={styles.btnPicker(hour, h)}
                            key={h.toString()}
                        >
                            <View style={styles.wrapHourText(hour, h)}>
                                <Text
                                    fontFamily='medium'
                                    style={styles.txtPicker(hour, h)}
                                >
                                    {h}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default HourPicker;
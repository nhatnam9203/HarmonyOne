import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../../Text';
import { scaleWidth, scaleHeight } from '@utils'
import styles from '../styles'

const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

const MinutePicker = ({ minute, selectMinute }) => {
    return (
        <View style={[styles.hourPickerContainer, { borderRightWidth: 0, marginLeft: scaleWidth(3) }]}>
            <Text fontFamily='medium' style={styles.txtSelect}>Select Minutes</Text>
            <View style={[styles.row, { flexWrap: 'wrap', justifyContent: 'center' }]}>
                {
                    minutes.map(m => (
                        <TouchableOpacity
                            onPress={() => selectMinute(m)}
                            style={styles.btnPicker(minute, m)}
                            key={m.toString()}
                        >
                            <View style={styles.wrapHourText(minute, m)}>
                                <Text fontFamily='medium' style={styles.txtPicker(minute, m)}>
                                    {m}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default MinutePicker;
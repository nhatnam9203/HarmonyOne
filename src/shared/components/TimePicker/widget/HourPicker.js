import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import styles from '../styles';
import { translate } from "@localize";

const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const HourPicker = ({ hour, selectHour }) => {
    return (
        <View style={styles.hourPickerContainer}>
            <Text fontFamily='medium' style={styles.txtSelect}>{translate('Select Hour')}</Text>
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
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../../Text';
import { scaleWidth, scaleHeight } from '@utils'
import styles from '../styles'

const BottomButton = ({ cancel, onClickOK }) => {
    return (
        <View style={[styles.row, styles.containerBottom]}>
            <TouchableOpacity
                onPress={cancel}
                style={[styles.btnBottom, { borderRightWidth: 1, borderRightColor: '#eeeeee' }]}
            >
                <Text style={styles.txtBottom}>
                    Cancel
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={onClickOK}
                style={styles.btnBottom}
            >
                <Text
                    fontFamily='bold'
                    style={[styles.txtBottom, { color: '#1366AE' }]}
                >
                    OK
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomButton;

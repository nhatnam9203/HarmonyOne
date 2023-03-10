import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import styles from '../styles';
import { translate } from "@localize";

const BottomButton = ({ cancel, onClickOK }) => {
    return (
        <View style={[styles.row, styles.containerBottom]}>
            <TouchableOpacity
                onPress={cancel}
                style={[styles.btnBottom, { borderRightWidth: 1, borderRightColor: '#eeeeee' }]}
            >
                <Text style={styles.txtBottom}>
                    {translate('Cancel')}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={onClickOK}
                style={styles.btnBottom}
            >
                <Text
                    fontFamily='bold'
                    style={[styles.txtBottom, { color: '#1366AE', fontFamily : fonts.BOLD }]}
                >
                    {translate('Apply')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomButton;

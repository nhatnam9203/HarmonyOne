import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import styles from '../styles';
import { translate } from "@localize";

const ButtonContinue = ({
    onPress = () => { },
    isActive = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonContinue(isActive)}
            disabled={!isActive}
        >
            <Text fontFamily='medium' style={styles.txtContinue(isActive)}>
                {translate("txtSubmit")}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonContinue;
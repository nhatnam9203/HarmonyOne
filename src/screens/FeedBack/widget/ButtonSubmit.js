import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import styles from '../styles'

const ButtonSubmit = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonSubmit}>
            <Text style={styles.txtSubmit} fontFamily='medium'>
                Send feedback
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonSubmit;


import React from 'react'
import { View, TextInput } from 'react-native'
import styles from '../styles'

const Input = ({ value,onChange }) => {
    return (
        <TextInput
            multiline={true}
            placeholder='Type a comment'
            placeholderTextColor='#7B99BA'
            textAlignVertical='top'
            value={value}
            onChangeText={onChange}
            style={styles.input}
        />
    )
}

export default Input;


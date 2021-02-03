import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components';
import { slop } from '@utils'
import styles from '../styles';

const WhatIsMerchant = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={slop}
            style={styles.buttonWhat}
        >
            <Text style={styles.txtWhatIsMerchant}>What is Merchant ID ?</Text>
        </TouchableOpacity>
    )
}

export default WhatIsMerchant;
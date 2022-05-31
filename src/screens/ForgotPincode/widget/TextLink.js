import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components';
import { slop } from '@utils'
import styles from '../styles';
import { translate } from "@localize";

const TextLink = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={slop}
            style={styles.buttonWhat}
        >
            <Text style={styles.txtWhatIsMerchant}>
                {translate("txtBackToSignin")}
            </Text>
        </TouchableOpacity>
    )
}

export default TextLink;
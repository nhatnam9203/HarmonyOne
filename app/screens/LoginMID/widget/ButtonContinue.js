import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text } from '@components'
import { useSelector } from 'react-redux'
import styles from '../styles';

const ButtonContinue = ({
    onPress = () => { },
    isActive = false
}) => {

    const { isLoadingButton } = useSelector(state => state.loadingReducer);
    console.log({
        isLoadingButton
    })

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonContinue(isActive)}
            disabled={!isActive}
        >
            {
                isLoadingButton ?
                    <ActivityIndicator size={'small'} color='white' />
                    :
                    <Text fontFamily='medium' style={styles.txtContinue(isActive)}>
                        Continue
                    </Text>
            }
        </TouchableOpacity>
    )
}

export default ButtonContinue;
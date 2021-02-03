import React, { Component } from 'react'
import { View, TextInput, Image, TouchableOpacity, Animated } from 'react-native'
import { icon_mid } from '@assets';
import { Text } from '@components';
import { slop } from '@utils';
import * as Animatable from 'react-native-animatable';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import styles from '../styles';

const Input = ({
    value,
    onChange
}) => {
    const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

    const onPressInput = () => {
        onPress();
    }

    return (
        <View style={[styles.containerInput]}>
            <SmoothPinCodeInput
                placeholder={<View style={styles.dotInput}></View>}
                mask={<View style={styles.maskInput}></View>}
                maskDelay={1000}
                password={true}
                cellStyle={null}
                cellStyleFocused={null}
                value={value}
                onTextChange={onChange}
            />
        </View>
    )
}

export default Input;
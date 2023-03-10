import React, { Component } from 'react'
import { View, TextInput, Image, TouchableOpacity, Animated } from 'react-native'
import { icon_email } from '@assets';
import { Text } from '@components';
import { slop } from '@utils';
import * as Animatable from 'react-native-animatable';
import styles from '../styles';
import { translate } from "@localize";

const Input = ({
    onPress,
    isOpenInput,
    bottomAnimated,
    fontSizeAnimated,
    leftAnimated,
    valueMID,
    onChangeMID,
}) => {
    const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

    const onPressInput = () =>{
        onPress();
    }
    
    return (
        <View style={[styles.containerInput]}>
            <Image source={icon_email} style={styles.icon_mid} />
            {
                isOpenInput &&
                <TextInput
                    value={valueMID}
                    autoFocus={true}
                    onChangeText={onChangeMID}
                    style={[styles.textInput,{ padding : 0 }]}
                    autoCapitalize='none'
                />
            }
            <AnimatedButton
                onPress={onPressInput}
                hitSlop={slop}
                style={[
                    styles.btnEnterYourMID,
                    { bottom: bottomAnimated, left: leftAnimated }
                ]}
            >
                <Animated.Text
                    fontFamily='medium'
                    style={[
                        styles.content,
                        {
                            fontSize: fontSizeAnimated,
                        }
                    ]}>
                    {translate("txtEnterEmail")}
                </Animated.Text>
            </AnimatedButton>
        </View>
    )
}

export default Input;
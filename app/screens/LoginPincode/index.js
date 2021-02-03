import React, { Component } from 'react'
import { View, Image, Animated } from 'react-native'
import { Text } from '@components';
import { icon_signin } from '@assets';
import { Input, ButtonContinue, TextLink } from './widget'
import { animatedHook, logicLogin } from './customHook'
import NavigationService from '@navigation/NavigationService';
import styles from './styles'

const index = () => {
    const [isOpenInput, setOpenInput] = React.useState(false);

    const [
        animatedInput,
        bottomAnimated,
        fontSizeAnimated,
        leftAnimated
    ] = animatedHook();

    const [valuePincode, onChangePincode] = logicLogin();

    const openInput = () => {
        setOpenInput(true);
        animatedInput();
    }

    const forgotPincode = () =>{
        NavigationService.navigate('ForgotPincode');
    }

    const back = () =>{
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <Text fontFamily='medium' style={styles.title}> Sign In </Text>
            <Image
                source={icon_signin}
                style={styles.logo}
                resizeMode='contain'
            />
            <Text style={styles.content}>
                Enter your PIN code
            </Text>
            <Input
                value={valuePincode}
                onChange={onChangePincode}
            />
            <ButtonContinue
                isActive={valuePincode.toString().length == 4}
            />
            <TextLink onPress={forgotPincode} text='Forgot PIN code?' />
            <TextLink onPress={back} text='Use another MID' />
        </View>
    )
}

export default index;

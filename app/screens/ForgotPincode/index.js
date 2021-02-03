import React, { Component } from 'react'
import { View, Image, Animated } from 'react-native'
import { Text } from '@components';
import { icon_forgot } from '@assets';
import { Input, ButtonContinue, TextLink, ButtonBack } from './widget'
import { animatedHook, logic } from './customHook'
import NavigationService from '@navigation/NavigationService'
import styles from './styles'

const index = () => {
    const [isOpenInput, setOpenInput] = React.useState(false);

    const [
        animatedInput,
        bottomAnimated,
        fontSizeAnimated,
        leftAnimated
    ] = animatedHook();

    const [valueMID, onChangeMID, onPressContinue] = logic();

    const openInput = () => {
        setOpenInput(true);
        animatedInput();
    }

    const back = () => {
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <ButtonBack onPress={back} />
            <Text fontFamily='medium' style={styles.title}> Forgot PIN code </Text>
            <Image
                source={icon_forgot}
                style={styles.logo}
                resizeMode='contain'
            />
            <Text fontFamily='regular' style={styles.txtSub}>  
                Enter your email address, we'll send you a reset link
            </Text>


            <Input
                onPress={openInput}
                isOpenInput={isOpenInput}
                bottomAnimated={bottomAnimated}
                fontSizeAnimated={fontSizeAnimated}
                leftAnimated={leftAnimated}
                valueMID={valueMID}
                onChangeMID={onChangeMID}
            />
            <ButtonContinue
                isActive={valueMID.toString().length > 0}
                onPress={onPressContinue}
            />
            <TextLink onPress={back} />
        </View>
    )
}

export default index;

import React, { Component } from 'react'
import { View, Image, Animated } from 'react-native'
import { Text } from '@components';
import { FocusBar } from "@shared/components";
import { icon_forgot } from '@assets';
import { Input, ButtonContinue, TextLink, ButtonBack } from './widget'
import { animatedHook, logic } from './customHook'
import { translate } from "@localize";
import NavigationService from '@navigation/NavigationService';
import styles from './styles';

const index = (props) => {
    const [isOpenInput, setOpenInput] = React.useState(false);

    const [
        animatedInput,
        bottomAnimated,
        fontSizeAnimated,
        leftAnimated
    ] = animatedHook();

    const [valueMID, onChangeMID, onPressContinue] = logic();

    const isMain = props?.route?.params?.isMain;

    const openInput = () => {
        setOpenInput(true);
        animatedInput();
    }

    const back = () => {
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <FocusBar barStyle={"dark-content"} />
            <ButtonBack onPress={back} />
            <Text fontFamily='medium' style={styles.title}>{translate("txtForgotPincode")}</Text>
            <Image
                source={icon_forgot}
                style={styles.logo}
                resizeMode='contain'
            />
            <Text fontFamily='regular' style={styles.txtSub}>
                {translate("txtEmailAddress")}
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
            {!isMain && <TextLink onPress={back} />}
        </View>
    )
}

export default index;

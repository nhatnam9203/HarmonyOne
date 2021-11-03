import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Animated } from 'react-native'
import { Text } from '@components'
import { logoHarmony, back } from '@assets'
import { slop , scaleHeight } from '@utils'
import NavigationService from '@navigation/NavigationService'
import styles from './styles'

const index = () => {

    const TextAnimated = Animated.createAnimatedComponent(Text);
    const translateY = React.useRef(new Animated.Value(scaleHeight(30))).current;
    const scale = React.useRef(new Animated.Value(1.2)).current;

    React.useEffect(()=>{
        Animated.parallel([
            Animated.timing(translateY,{
                toValue : 0,
                duration : 700,
                useNativeDriver : true
            }),
            Animated.timing(scale,{
                toValue : 1,
                duration : 700,
                useNativeDriver : true
            }),
        ]).start();
    },[]);

    const back = () => {
        NavigationService.back();
    }
    const backSignIn = () => {
        NavigationService.back();
    }

    return (
        <View style={styles.container}>
            <ButtonBack onPress={back} />
            <Text
                fontFamily='medium'
                style={styles.title}
            >
                {' '}
            </Text>
            <Image
                style={styles.logo}
                source={logoHarmony}
                resizeMode='contain'
            />
            <TextAnimated
                fontFamily='medium'
                style={[
                    styles.title, {
                        marginTop: 0,
                        transform: [{ translateY },{ scale }]
                    }
                ]}
            >
                What is Merchant ID ?
            </TextAnimated>
            <Text style={styles.content}>
                Merchant ID is confidential information provided to the owner when registering on the system of the Harmony Pay. It is used to identify the store you are working in. If you have any questions please contact the owner for more details.
            </Text>
            <TouchableOpacity
                onPress={backSignIn}
                hitSlop={slop}
                style={styles.btnBottom}
            >
                <Text fontFamily='medium' style={styles.txtBottom}>
                    Back to Sign In
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const ButtonBack = ({
    onPress = () => { },
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonBack}
            hitSlop={{
                top: 30,
                bottom: 30,
                left: 30,
                right: 30
            }}
        >
            <Image source={back} style={styles.iconBack} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export default index;
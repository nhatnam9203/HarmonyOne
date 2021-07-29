import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { buttonAddMore } from '@assets'
import NavigationService from '@navigation/NavigationService'

const GroupButtonAdd = ({ onPressAdd = () => { } }) => {

    const animatedStatus = React.useRef(new Animated.Value(0)).current;
    const ImageAnimated = Animated.createAnimatedComponent(Image);
    const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

    const [isOpenButtonGroup, setButtonGroup] = React.useState(false);

    React.useEffect(() => {
        Animated.timing(animatedStatus, {
            toValue: isOpenButtonGroup ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isOpenButtonGroup]);

    const toggleButtonGroup = () => {
        setButtonGroup(status => !status);
    }

    const onPressPlus = () => {

    }

    const newCategory = () => {
        NavigationService.navigate('NewCategory');
    }

    const newService = () => {
        NavigationService.navigate('NewService');
    }

    const rotate = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const translateY = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: [0, scaleHeight(10)]
    });

    const translateY2 = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: [0, scaleHeight(6)]
    });

    const scale = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    return (
        <View style={styles.group}>

            <ButtonAnimated
                onPress={newCategory}
                style={[
                    styles.btnAdd,
                    { transform: [{ translateY }, { scale }] }
                ]}
            >
                <Text fontFamily='medium' style={styles.txtAdd}>New Category</Text>
            </ButtonAnimated>

            <ButtonAnimated
                onPress={newService}
                style={[
                    styles.btnAdd,
                    { transform: [{ translateY: translateY2 }, { scale }] }
                ]}
            >
                <Text fontFamily='medium' style={styles.txtAdd}>New Service</Text>
            </ButtonAnimated>

            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleButtonGroup}
                style={styles.buttonPlus}
            >
                <ImageAnimated
                    source={buttonAddMore}
                    style={[styles.iconPlus, { transform: [{ rotate }] }]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default GroupButtonAdd;

const styles = StyleSheet.create({
    group: {
        position: 'absolute',
        bottom: scaleHeight(6),
        right: scaleWidth(5),
        alignItems: 'flex-end'
    },
    buttonPlus: {
        width: scaleWidth(13),
        height: scaleWidth(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        backgroundColor: '#0764B0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 5,
    },
    iconPlus: {
        width: scaleWidth(4),
        height: scaleWidth(4),
        tintColor: 'white',
    },
    btnAdd: {
        paddingVertical: scaleWidth(1.5),
        paddingHorizontal: scaleWidth(3),
        backgroundColor: '#0764B0',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: scaleHeight(1)

    },
    txtAdd: {
        color: 'white',
        fontSize: scaleWidth(4.2)
    }
})
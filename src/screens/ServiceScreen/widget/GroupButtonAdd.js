import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Animated, Text } from 'react-native'
import { images } from "@shared/themes"
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
                    source={images.iconAdd}
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
        bottom: 50,
        right: 20,
        alignItems: 'flex-end'
    },
    buttonPlus: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
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
        width: 25,
        height: 25,
        tintColor: 'white',
    },
    btnAdd: {
        paddingVertical: scaleWidth(8),
        paddingHorizontal: scaleWidth(16),
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
        marginBottom: scaleHeight(8)

    },
    txtAdd: {
        color: 'white',
        fontSize: scaleFont(17),
        fontFamily : fonts.MEDIUM
    }
})
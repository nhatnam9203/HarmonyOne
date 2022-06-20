import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Animated, Text } from 'react-native'
import { images, fonts } from "@shared/themes";
import { translate } from "@localize";

export const GroupButtonAdd = ({ onPressAdd = () => { }, newCategory, newService , titleButton2 = translate("New Service") }) => {

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
    const rotate = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const translateY = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: [0, scaleHeight(100)]
    });

    const translateX = animatedStatus.interpolate({
        inputRange: [0, 1],
        outputRange: [0, scaleHeight(100)]
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
        <>
            <Animated.View pointerEvents={isOpenButtonGroup ? "auto" : "none"} style={[styles.group, {
            }]}>
                <ButtonAnimated
                    pointerEvents={isOpenButtonGroup ? "auto" : "none"}
                    onPress={() => {
                        if (isOpenButtonGroup) {
                            newCategory();
                            setButtonGroup(false);
                        }
                    }}
                    style={[
                        styles.btnAdd,
                        { transform: [{ translateY: translateY2 }, { scale }] }
                    ]}
                >
                    <Text fontFamily='medium' style={styles.txtAdd}>{translate("New Category")}</Text>
                </ButtonAnimated>

                <ButtonAnimated
                    pointerEvents={isOpenButtonGroup ? "auto" : "none"}
                    onPress={() => {
                        if (isOpenButtonGroup) {
                            newService();
                            setButtonGroup(false);
                        }
                    }}
                    style={[
                        styles.btnAdd,
                        { transform: [{ translateY: translateY2 }, { scale }] }
                    ]}
                >
                    <Text fontFamily='medium' style={styles.txtAdd}>{titleButton2}</Text>
                </ButtonAnimated>

                <View
                    activeOpacity={1}
                    style={[styles.buttonPlus, { opacity: 0, zIndex: -1 }]}
                >
                    <ImageAnimated
                        source={images.iconAdd}
                        style={[styles.iconPlus, { transform: [{ rotate }] }]}
                    />
                </View>
            </Animated.View>

            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleButtonGroup}
                style={[styles.buttonPlus, {
                    position: 'absolute',
                    bottom: 50,
                    right: 20,
                    zIndex: 99
                }]}
            >
                <ImageAnimated
                    source={images.iconAdd}
                    style={[styles.iconPlus, { transform: [{ rotate }] }]}
                />
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    group: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        alignItems: 'flex-end',
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
        width: scaleWidth(48),
        height: scaleWidth(48)
    },
    iconPlus: {
        width: 18,
        height: 18,
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
        fontFamily: fonts.MEDIUM
    }
})
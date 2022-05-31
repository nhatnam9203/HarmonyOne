import { colors, fonts, layouts, images } from '@shared/themes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Platform, ImageBackground,
    PlatformColor, TouchableWithoutFeedback, Keyboard,
    Animated,
    Pressable
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FocusBar } from "@shared/components";
import NavigationService from '@navigation/NavigationService';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const ContainerMoreScreen = ({
    children,
    pageTitle = '',
    bounces = false,
    headerColor = colors.white,
    headerTintColor = colors.black,
    headerRightComponent = null,
    headerCenterComponent = null,
    headerLeftComponent = null,
    isLeft = true,
    isRight = true,
    isScrollLayout = true,
    imageBackground = null,
    containerStyle,
    onPressLeft,
    headerStyle,
    barStyle = "dark-content",
    staff,
    scroll,
    onPressHeader = () => { }
}) => {
    const [t] = useTranslation();
    const insets = useSafeAreaInsets();


    const onGoBack = () => {
        if (onPressLeft) {
            onPressLeft();
        } else {
            NavigationService.back();
        }
    };

    const opacity = scroll.interpolate({
        inputRange: [120, 180],
        outputRange: [0, 1],
        extrapolate: "clamp"
    });

    const translateY = scroll.interpolate({
        inputRange: [120, 180],
        outputRange: [20, 0],
        extrapolate: "clamp"
    });

    const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

    return (
        <View style={layouts.fill}>
            <FocusBar barStyle={barStyle} />
            <ImageBackground
                source={imageBackground}
                style={[
                    styles.headContent,
                    { paddingTop: Math.max(insets.top, scaleHeight(20)) },
                    { backgroundColor: headerColor },
                    headerStyle,
                ]}>
                {
                    isLeft ?
                        headerLeftComponent ? headerLeftComponent() :
                            <View style={styles.headerLeftContent}>
                                <TouchableOpacity style={styles.button} onPress={onGoBack}>
                                    <Image
                                        source={images.iconBack}
                                        style={[styles.iconSize, { tintColor: headerTintColor }]}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        :
                        <View style={styles.headerLeftContent}>
                            <View style={styles.button} />
                        </View>
                }

                <AnimatedTouch
                    activeOpacity={1}
                    onPress={onPressHeader}
                    style={[
                        styles.headerCenterContent,
                        {
                            opacity,
                            flexDirection: "row",
                            alignItems: "center",
                            transform: [{ translateY }]
                        }]}
                >
                    <Text style={[styles.headTitle, { color: headerTintColor, marginRight: 12 }]}>
                        {staff?.displayName}
                    </Text>
                    <FontAwesome5 size={25} name='user-edit' color={'#8097B8'} />
                </AnimatedTouch>

                {
                    isRight ?
                        <View style={styles.headerRightContent}>
                            {headerRightComponent && headerRightComponent()}
                        </View> :
                        <View style={styles.headerRightContent}>
                            <View style={styles.button} />
                        </View>
                }
            </ImageBackground>

            {
                isScrollLayout ?
                    <KeyboardAwareScrollView bounces={bounces}>
                        <View style={[styles.container]}>{children}</View>
                    </KeyboardAwareScrollView>
                    :
                    <View style={[styles.container, containerStyle]}>{children}</View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scaleWidth(0),
        paddingVertical: scaleHeight(16),
    },

    buttonContent: {
        height: scaleHeight(84),
        backgroundColor: colors.WHITE,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },

    headContent: {
        width: '100%',
        height: scaleHeight(100),
        backgroundColor: colors.white,
        shadowColor: Platform.OS == "ios" ? '#0000000D' : "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 1,

        paddingTop: scaleHeight(20),
        paddingBottom: scaleHeight(4),
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
    },

    headTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.black,
    },

    headerLeftContent: { flex: 0 },

    headerRightContent: {
        flex: 0,
    },

    headerCenterContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconSize: {
        width: scaleWidth(24),
        height: scaleHeight(24),
    },

    button: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

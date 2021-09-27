import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { colors, fonts, layouts, images } from '@shared/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '@navigation/NavigationService';

export const HeaderEditProfile = ({

}) => {

    const [t] = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <View>
            <LinearGradient colors={['#156CB4', '#1E89CF', '#2BB4F7']}>
                <View
                    style={[styles.header, { paddingTop: Math.max(insets.top, scaleHeight(20)), }]}
                >
                    <View style={styles.headerLeftContent}>
                        <TouchableOpacity
                            onPress={() => NavigationService.back()}
                            style={styles.button}
                        >
                            <Image
                                source={images.iconBack}
                                style={[styles.iconSize, { tintColor: colors.white }]}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerCenterContent}>
                        <Text style={[styles.headTitle]}>
                            Edit profile
                        </Text>
                    </View>


                    <View style={styles.headerRightContent}>
                        <View style={styles.button} />
                    </View>
                </View>
                <View style={{ height: scaleHeight(70) }} />
            </LinearGradient>
        </View>
    );
};



const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: scaleHeight(100),
        shadowColor: '#383434',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 5,
        paddingTop: scaleHeight(20),
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
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

    buttonContent: {
        height: scaleHeight(84),
        backgroundColor: colors.WHITE,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },

    headTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.white,
    },

    button: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

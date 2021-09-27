import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import Ionicons from "react-native-vector-icons/Ionicons"

export const AggregateRating = () => {

    const [t] = useTranslation();

    return (
        <View style={styles.wrap}>
            <View style={styles.row}>
                <Text style={styles.title}>Aggregate Rating</Text>
                <Text style={styles.number}>4.7</Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(8) }]}>
                <Text style={styles.content}>All time statictis</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        new Array(4).fill().map(() => (
                            <Image
                                key={Math.random()}
                                source={images.iconStar}
                                style={styles.iconStar}
                                resizeMode='contain'
                            />
                        ))
                    }
                </View>
            </View>
            <Text style={[styles.content, { textAlign: 'right', marginTop: scaleHeight(8) }]}>
                122 reviews
            </Text>
        </View>
    )
}

export default AggregateRating;

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: colors.white,
        padding: scaleWidth(16),
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 3.34,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: scaleFont(20),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM
    },
    number: {
        fontSize: scaleFont(26),
        color: colors.greyish_brown_40,
        fontFamily: fonts.BOLD
    },
    content: {
        fontSize: scaleFont(16),
        color: '#585858',
        fontFamily: fonts.REGULAR
    },
    iconStar: {
        width: scaleWidth(20),
        width: scaleWidth(20),
        resizeMode: 'contain'
    }
})

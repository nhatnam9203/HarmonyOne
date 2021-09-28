import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons"
import { sum } from 'lodash';

const ItemTotal = ({
    title,
    number,
    count,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.wrap}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.number}>{number}</Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(8) }]}>
                <Text style={styles.content}>{t('All time statictis')}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        count && new Array(parseInt(number)).fill().map(() => (
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
            {
                count && 
                <Text style={[styles.content, { textAlign: 'right', marginTop: scaleHeight(8) }]}>
                    {count} {t('reviews')}
                </Text>
            }
        </View>
    )
}

export default ItemTotal;

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
        margin: scaleWidth(16),
        marginTop: scaleHeight(30),
        width: scaleWidth(375 - 32),
        height: 120
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: scaleFont(18),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM
    },
    number: {
        fontSize: scaleFont(26),
        color: colors.greyish_brown_40,
        fontFamily: fonts.BOLD
    },
    content: {
        fontSize: scaleFont(15),
        color: '#585858',
        fontFamily: fonts.REGULAR
    },
    iconStar: {
        width: scaleWidth(20),
        width: scaleWidth(20),
        resizeMode: 'contain'
    }
})

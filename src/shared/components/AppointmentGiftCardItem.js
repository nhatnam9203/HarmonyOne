import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, images } from '@shared/themes';
import { ProgressiveImage } from '@shared/components';
import { formatMoneyWithUnit, convertMinsToHrsMins } from '@shared/utils';
import { isEmpty } from "lodash";
import { guid, formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { useNavigation } from "@react-navigation/native";
import NavigationService from '@navigation/NavigationService';


export const AppointmentGiftCardItem = ({
    giftCard,
    name,
    price,
    isDelete,
}) => {

    const { t } = useTranslation();

    const navigation = useNavigation();


    return (
        <Pressable onPress={() => { }} style={styles.container}>
            {isDelete && <View style={styles.lineDelete} />}

            {/* <ProgressiveImage
                style={styles.iconGiftCard}
                width={scaleHeight(60)}
                height={scaleHeight(60)}
                url={giftCard.imageUrl}
                defaultSource={images.iconReportGiftcard}
                resizeMode="cover"
            /> */}

<ProgressiveImage
                style={styles.iconGiftCard}
                width={scaleHeight(60)}
                height={scaleHeight(60)}
                url={giftCard.imageUrl}
                defaultSource={images.serviceDefault}
                resizeMode="cover"
            />


            <View style={styles.content}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.textServiceName}
                >
                    {name}
                </Text>

                <View style={[styles.bottomContent, { paddingRight: isDelete ? 15 : 0 }]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <Text style={[styles.txtQty, { fontFamily: fonts.REGULAR }]}>
                            {`1 item(s)`}
                        </Text>
                        <Text style={styles.textServiceTotal}>
                            $ {price}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: scaleHeight(90),
        flexDirection: 'row',
        paddingVertical: scaleHeight(16),
        borderBottomColor: '#eeeeee',
        borderBottomWidth: scaleHeight(1),
        backgroundColor: "white",
        position: 'relative',
    },
    lineDelete: {
        height: scaleHeight(90),
        width: 5,
        backgroundColor: colors.red,
        position: 'absolute',
        top: 0,
        right: 0
    },
    content: { flex: 1, marginLeft: scaleWidth(16), justifyContent: 'space-between' },
    textTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(17),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyish_brown_40,
    },
    serviceImage: {
        width: scaleHeight(60),
        height: scaleHeight(60),
        borderRadius: scaleHeight(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconGiftCard: {
        width: scaleHeight(60),
        height: scaleHeight(60),
        borderRadius: scaleHeight(3),
    },
    textServiceName: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(15),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.ocean_blue,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textServiceDuration: {
        fontFamily: fonts.LIGHT,
        fontSize: scaleFont(14),
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyish_brown_40,
        width: scaleWidth(95)
    },
    textServiceTotal: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(14),
        letterSpacing: 0,
        color: colors.greyish_brown_40,
    },
    txtQty: {
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(14),
        letterSpacing: 0,
        color: colors.greyish_brown_40,
    },
    iconExtra: {
        width: scaleWidth(13),
        height: scaleWidth(13),
        resizeMode: 'contain'
    },
    extraName: {
        fontFamily: fonts.LIGHT,
        fontSize: scaleFont(14),
        color: colors.greyish_brown_40,
        marginLeft: 10
    }
});

import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, images } from '@shared/themes';
import { ProgressiveImage } from '@shared/components';
import { formatMoneyWithUnit, convertMinsToHrsMins } from '@shared/utils';
import { isEmpty } from "lodash";
import { guid } from "@shared/utils";
import { useNavigation } from "@react-navigation/native";
import NavigationService from '@navigation/NavigationService';

export const AppointmentServiceItem = ({
    service,
    name,
    duration,
    price,
    extras = [],
    isDelete,
    onPressItem = null,
    onPressItemReview = false,
    isShowStaff = true,
}) => {

    const { t } = useTranslation();

    const getDuration = (duration) => {
        return duration + ' min';
    };

    const navigation = useNavigation();

    const getPrice = (price) => {
        return formatMoneyWithUnit(price);
    };

    const getExtrasName = () => {
        let text = "";
        for (let i = 0; i < extras.length; i++) {
            if (i == extras.length - 1) {
                text += `${extras[i].name}`;
            } else {
                text += `${extras[i].name}, `;
            }
        }
        return text;
    }

    const onPress = () => {
        if (onPressItem) {
            onPressItem();
            return;
        }

        if (onPressItemReview) {
            navigation.push(
                screenNames.SelectServiceDetail,
                {
                    item: service, isEditItem: guid() + guid() + guid(),
                    extrasEdit: extras,
                });
        }
    }


    return (
        <Pressable onPress={onPress} style={styles.container}>
            {isDelete && <View style={styles.lineDelete} />}

            <ProgressiveImage
                style={styles.serviceImage}
                width={scaleHeight(60)}
                height={scaleHeight(60)}
                url={service.imageUrl}
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
                {
                    extras?.length > 0 &&
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={images.iconExtra}
                            style={styles.iconExtra}
                            resizeMode='cover'
                        />

                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.extraName}
                        >
                            {getExtrasName()}
                        </Text>

                    </View>
                }
                <View style={[styles.bottomContent, { paddingRight: isDelete ? 15 : 0 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textServiceDuration}>
                            {convertMinsToHrsMins(duration)}
                        </Text>

                        {
                            (service.displayName || !isNaN(service?.staff?.staffId)) && isShowStaff &&
                            <Text style={[styles.textServiceDuration, { fontFamily: fonts.MEDIUM, marginLeft: scaleWidth(15) }]}>
                                {
                                    service?.displayName ? service?.displayName :
                                        service?.staff?.staffId == 0 ? "Any staff" : service?.staff?.displayName
                                }
                            </Text>
                        }
                    </View>
                    <Text style={styles.textServiceTotal}>
                        {getPrice(price)}
                    </Text>
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
        justifyContent: 'space-between',
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
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.greyish_brown_40,
    },
    iconExtra: {
        width: scaleWidth(13),
        height: scaleWidth(13),
    },
    extraName: {
        fontFamily: fonts.LIGHT,
        fontSize: scaleFont(14),
        color: colors.greyish_brown_40,
        marginLeft: 10
    }
});

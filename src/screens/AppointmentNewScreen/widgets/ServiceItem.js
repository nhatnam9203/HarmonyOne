import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { colors, fonts, images } from '@shared/themes';
import { CustomImage } from '@shared/components';
import { formatMoneyWithUnit } from '@shared/utils';
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

const ServiceItem = ({ service, disabled = false }) => {

    const navigateDetail = () => {
        if (!disabled) {
            NavigationService.navigate(screenNames.SelectServiceDetail, { item: service });
        }
    }

    return (
        <Pressable onPress={navigateDetail} style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}>
            {
                isEmpty(service?.imageUrl) ?
                    <CustomImage
                        style={styles.serviceImage}
                        source={images.serviceDefault}
                        resizeMode="cover"
                    /> :
                    <CustomImage
                        style={styles.serviceImage}
                        source={{ uri: service?.imageUrl }}
                        resizeMode="cover"
                    />
            }
            <View style={styles.content}>
                <Text style={styles.textServiceName}>{service?.name}</Text>
                <View style={styles.bottomContent}>
                    {
                        !service?.productId ?
                            <Text style={styles.textServiceDuration}>
                                {`${service?.duration} min`}
                            </Text> : <View />
                    }
                    <Text style={styles.textServiceTotal}>
                        {`$ ${service?.price}`}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ServiceItem;

const styles = StyleSheet.create({
    container: {
        height: scaleHeight(90),
        flexDirection: 'row',
        paddingVertical: scaleHeight(16),
        borderBottomColor: '#eeeeee',
        borderBottomWidth: scaleHeight(1),
        marginHorizontal: scaleWidth(16)
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
        flex: 1,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textServiceDuration: {
        fontFamily: fonts.LIGHT,
        fontSize: scaleFont(14),
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.greyish_brown_40,
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
});

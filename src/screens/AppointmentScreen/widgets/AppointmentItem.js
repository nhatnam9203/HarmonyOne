import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { colors, fonts, layouts } from '@shared/themes';
import {
    dateToFormat,
    formatPhoneNumber,
    getColorForStatus,
    TIME_APPOINTMENT_FORMAT,
    guid,
} from '@shared/utils';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const AppointmentItem = ({ item, onChangeAppointmentId }) => {

    const navigation = useNavigation();

    const getColors = () => {
        const background = getColorForStatus(item?.status);
        let textColor = "#333";
        switch (`${item?.status}`.toLowerCase()) {
            case 'confirm':
            case 'unconfirm':
            case 'no show':
                textColor = colors.greyish_brown_40;
                break;
            case 'refund':
            case 'void':
            case 'checkin':
            case 'paid':
                textColor = colors.white;
                break;
            default:
                textColor = colors.black;
                break;
        }
        return {
            background,
            textColor,
        }
    }

    const onPress = (pressEvt) => {
        onChangeAppointmentId(item?.appointmentId, item?.status);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={[
                    styles.content,
                    { backgroundColor: getColors().background },
                    styles.contentShadow,
                ]}>

                <View style={styles.rowContent}>
                    <Text style={[styles.textTime, { color: getColors().textColor }]}>
                        {`${dateToFormat(item?.fromTime, "hh:mm A")} - ${dateToFormat(item?.toTime, "hh:mm A")}`}
                    </Text>
                </View>

                <View style={styles.marginVertical} />
                <View style={styles.rowContent}>
                    <Text style={[styles.textName, { color: getColors().textColor }]}>
                        {`${item?.firstName} ${item?.lastName}`}
                    </Text>
                    <View style={styles.marginVertical} />
                    <Text style={[styles.textPhone, { color: getColors().textColor }]}>
                        {`${item?.phoneNumber}`}
                    </Text>
                </View>

                <View style={layouts.marginVertical} />
                <View style={styles.rowContent}>
                    {
                        item?.services.map((x) => (
                            <Text
                                key={x + guid()?.toString()}
                                style={[styles.textPhone, styles.textService, { color: getColors().textColor, }]}>
                                {x?.serviceName}
                            </Text>
                        ))
                    }
                    {
                        item?.extras.map((x) => (
                            <Text
                                key={x + guid()?.toString()}
                                style={[styles.textPhone, styles.textService, { color: getColors().textColor, }]}>
                                {x?.extraName}
                            </Text>
                        ))
                    }
                    {
                        item?.products.map((x) => (
                            <Text
                                key={x + guid()?.toString()}
                                style={[styles.textPhone, styles.textService, { color: getColors().textColor, }]}>
                                {x?.productName}
                            </Text>
                        ))
                    }
                    {
                        item?.giftCards.map((x) => (
                            <Text
                                key={x + guid()?.toString()}
                                style={[styles.textPhone, styles.textService, { color: getColors().textColor, }]}>
                                {x?.name}
                            </Text>
                        ))
                    }
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(5),
    },

    content: {
        flex: 0,
        padding: scaleWidth(16),
        borderRadius: scaleWidth(5),
    },

    contentShadow: {
        shadowColor: '#40404040',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 2.6,
        shadowOpacity: 0.7,
    },

    rowContent: {
        flex: 0,
    },

    marginVertical: { height: scaleHeight(5) },

    textTime: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(20),
        // fontWeight: 'bold',
        // fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginBottom: scaleHeight(8)
    },

    textName: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
    },

    textPhone: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(13),
        letterSpacing: 0,
        textAlign: 'left',
    },

    textService: {
        fontFamily: fonts.LIGHT,
        marginBottom: scaleHeight(8)
    }
});

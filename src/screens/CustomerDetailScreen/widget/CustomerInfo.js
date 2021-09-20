import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { dateToFormat, DATE_SHOW_FORMAT_STRING } from '@shared/utils';

const CustomerInfo = ({
    firstName = '',
    lastName = '',
    note = '',
    phone = '',
    email = '',
    gender = '',
    addressPost = {},
    referrerPhone = '',
    birthdate = null,
    isVip = '',
}) => {

    console.log({ addressPost })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.wrapName}>
                    <Text style={styles.letterName}>
                        {firstName?.toString()?.charAt(0)?.toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.fullName}>
                    {`${firstName} ${lastName}`}
                </Text>

                <View style={styles.group}>
                    <Text style={styles.textGroup}>
                        {isVip == 0 ? 'Normal' : 'Vip'}
                    </Text>
                </View>
            </View>

            <IconButton
                icon={images.iconNote}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{note}</Text>}
            />
            <IconButton
                icon={images.iconPhone}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{phone}</Text>}
            />
            <IconButton
                icon={images.iconEmail}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{email}</Text>}
            />
            <IconButton
                icon={images.iconGender}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{gender}</Text>}
            />
            <IconButton
                icon={images.iconBirthdate}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{dateToFormat(birthdate, DATE_SHOW_FORMAT_STRING)}</Text>}
            />
            <IconButton
                icon={images.iconLocation}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>
                    {`${addressPost.street || ''} ${addressPost?.city || ''} ${addressPost?.zip || ''} ${addressPost?.state || ''}`}
                </Text>}
            />
            <IconButton
                icon={images.iconReferer}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{referrerPhone}</Text>}
            />

            <TouchableOpacity>
                <Text style={styles.txtHide}>Hide details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: scaleWidth(16),
        shadowColor: "#000",
        backgroundColor : "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.34,

        elevation: 5,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapName: {
        width: scaleWidth(60),
        height: scaleWidth(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1100,
        backgroundColor: "#E5E5E5",
    },
    letterName: {
        fontSize: scaleFont(36),
        fontFamily: fonts.BOLD,
        color: colors.greyish_brown_40,
    },
    fullName: {
        fontSize: scaleFont(22),
        fontFamily: fonts.BOLD,
        color: colors.greyish_brown_40,
        marginTop: scaleHeight(12)
    },
    group: {
        marginTop: scaleHeight(12),
        width: scaleWidth(120),
        height: scaleWidth(30),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ocean_blue,
        borderRadius: 30,
    },
    textGroup: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.white,
    },
    rowIcon: {
        marginTop: scaleHeight(16),
    },
    icon: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        resizeMode: 'contain',
        tintColor: '#888888'
    },
    txtIcon: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40,
        marginLeft: scaleWidth(16)
    },
    txtHide: {
        marginTop: scaleHeight(16),
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        color: colors.ocean_blue,
    }
});

export default CustomerInfo;

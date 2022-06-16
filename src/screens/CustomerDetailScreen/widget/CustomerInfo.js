import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { dateToFormat, DATE_SHOW_FORMAT_STRING } from '@shared/utils';
import { isEmpty } from "lodash";
import Collapsible from 'react-native-collapsible';
import { translate } from "@localize";

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
    getStateName,
}) => {

    const [isHideDetail, showFullDetail] = React.useState(true);

    const toggleFullDetail = () => {
        showFullDetail(isVisible => !isVisible);
    }

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

                <View style={styles.group(isVip)}>
                    {
                        isVip == 1 &&
                        <Image
                            source={images.iconVip}
                            style={styles.iconVip}
                        />
                    }
                    <Text style={styles.textGroup}>
                        {isVip == 0 ? translate('Normal') : translate('VIP')}
                    </Text>
                </View>
            </View>

            {!isEmpty(note) && <IconButton
                icon={images.iconNote}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{note}</Text>}
            />}
            {!isEmpty(phone) && <IconButton
                icon={images.iconPhone}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() => <Text style={styles.txtIcon}>{phone}</Text>}
            />}
            {!isEmpty(email) && <IconButton
                icon={images.iconEmail}
                iconStyle={styles.icon}
                style={styles.rowIcon}
                renderText={() =>
                    <Text
                        numberOfLine={1}
                        ellipsizeMode='tail'
                        style={[styles.txtIcon, { width: scaleWidth(270) }]}
                    >
                        {email}
                    </Text>
                }
            />}
            <Collapsible collapsed={isHideDetail} duration={200}>
                {!isEmpty(gender) && <IconButton
                    icon={images.iconGender}
                    iconStyle={styles.icon}
                    style={styles.rowIcon}
                    renderText={() => <Text style={styles.txtIcon}>{gender}</Text>}
                />}
                {!isEmpty(birthdate) && <IconButton
                    icon={images.iconBirthdate}
                    iconStyle={styles.icon}
                    style={styles.rowIcon}
                    renderText={() => <Text style={styles.txtIcon}>
                        {birthdate ? dateToFormat(birthdate, "MM/DD/YYYY") : ""}
                    </Text>
                    }
                />}
                {(!isEmpty(addressPost?.street) && !isEmpty(addressPost?.city) && !isEmpty(addressPost?.zip) && addressPost?.state) &&
                    <IconButton
                        icon={images.iconLocation}
                        iconStyle={styles.icon}
                        style={styles.rowIcon}
                        renderText={() => <Text style={styles.txtIcon}>
                            {`${addressPost.street || ''} ${addressPost?.city || ''} ${addressPost?.zip || ''} ${getStateName(addressPost?.state) || ''}`}
                        </Text>}
                    />}

                {!isEmpty(referrerPhone) && <IconButton
                    icon={images.iconReferer}
                    iconStyle={styles.icon}
                    style={styles.rowIcon}
                    renderText={() => <Text style={styles.txtIcon}>{referrerPhone}</Text>}
                />}
            </Collapsible>

            <TouchableOpacity activeOpacity={1} onPress={toggleFullDetail}>
                <Text style={styles.txtHide}>
                    {isHideDetail ? translate(`Full details`) : translate(`Hide details`)}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: scaleWidth(16),
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.34,
        elevation: 5,
        marginHorizontal: scaleWidth(12),
        marginTop: scaleWidth(16)
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
    group: isVip => {
        return {
            marginTop: scaleHeight(12),
            width: scaleWidth(120),
            height: scaleWidth(30),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: isVip == 0 ? colors.ocean_blue : "#50CF25",
            borderRadius: 30,
        }
    },
    textGroup: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.white,
    },
    rowIcon: {
        marginTop: scaleHeight(12),
        alignItems : "flex-start"
    },
    icon: {
        width: scaleWidth(23),
        height: scaleWidth(23),
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
        fontFamily: fonts.REGULAR,
        color: colors.ocean_blue,
    },
    iconVip: {
        width: scaleWidth(19),
        height: scaleWidth(19),
        resizeMode: 'contain',
        marginRight: 5
    }
});

export default CustomerInfo;

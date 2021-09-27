import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { dateToFormat, convertStatus, convertColorByStatus } from "@shared/utils";

const ItemAppointment = ({ item, isPast }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.fromTime, { color: isPast ? colors.greyish_brown_40 : colors.ocean_blue, }]}>
                        {dateToFormat(item.fromTime, "DD")}
                    </Text>
                    <Text style={[styles.fromTime, { color: isPast ? colors.greyish_brown_40 : colors.ocean_blue, marginTop: scaleHeight(8) }]}>
                        {dateToFormat(item.fromTime, "MMM")}
                    </Text>
                    <Text style={[styles.fromTime, { color: isPast ? colors.greyish_brown_40 : colors.ocean_blue, marginTop: scaleHeight(8) }]}>
                        {dateToFormat(item.fromTime, "YYYY")}
                    </Text>
                </View>

                <View style={{ marginLeft: scaleWidth(16) }}>
                    <Text style={[styles.fromTime, { color: colors.black, fontFamily: fonts.MEDIUM }]}>
                        {dateToFormat(item.fromTime, "dddd - hh:mm A")}
                    </Text>

                    <View style={styles.itemServices}>
                        {
                            item.services.map((sv) => (
                                <Text
                                    key={sv.bookingServiceId}
                                    style={styles.serviceName}
                                >
                                    {sv.serviceName}
                                    <Text style={[styles.serviceName, { fontFamily: fonts.LIGHT }]}>
                                        {`- ${sv?.staff?.displayName}`}
                                    </Text>
                                </Text>
                            ))
                        }
                    </View>
                </View>

            </View>

            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.status(item?.status)}>
                    {convertStatus[item?.status]}
                </Text>
                <Text style={styles.total(item?.status)}>
                    {item?.total}
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(16),
        paddingBottom: scaleHeight(16),
        width: scaleWidth(375 - 32)
    },
    itemLeft: {
        flexDirection: 'row',
    },
    itemServices: {
        marginTop: scaleHeight(16),
        width: scaleWidth(190)
    },
    fromTime: {
        color: colors.ocean_blue,
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(17)
    },
    serviceName: {
        color: '#404040',
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(15),
        marginBottom: scaleHeight(8)
    },
    status: status => {
        return {
            color: convertColorByStatus(status),
            fontFamily: fonts.REGULAR,
            fontSize: scaleFont(16),
        }
    },
    total: status => {
        return {
            color: colors.ocean_blue,
            fontFamily: fonts.BOLD,
            fontSize: scaleFont(17),
            marginTop: scaleHeight(32),
        }
    }
});

export default ItemAppointment;

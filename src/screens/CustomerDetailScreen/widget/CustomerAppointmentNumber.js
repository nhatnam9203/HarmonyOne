import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";

const CustomerAppointmentNumber = ({
    allBooking,
    completed,
    cancelled,
    upcomming,
    upcommings,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Appointments</Text>
            </View>
            <View style={styles.content}>
                <ItemAppointmentNumber title="All bookings" number={allBooking} />
                <ItemAppointmentNumber title="Upcoming" number={upcomming} />
                <ItemAppointmentNumber title="Paid" number={completed} />
                <ItemAppointmentNumber title="Cancelled" number={cancelled} />
            </View>
        </View>
    );
};

const ItemAppointmentNumber = ({ title = '', number = "0" }) => (
    <View style={styles.contentItem}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.total}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.34,

        elevation: 5,
        margin: scaleHeight(16)
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom: scaleHeight(16),
        padding: scaleWidth(16),
    },
    headerText: {
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
    },
    content: {
        flexDirection: 'row',
        paddingVertical: scaleWidth(16)
    },
    contentItem: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: scaleFont(18),
        fontFamily: fonts.MEDIUM,
        color: colors.greyish_brown_40,
    },
    total: {
        fontSize: scaleFont(12),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40,
        marginTop: scaleHeight(13)
    }
});

export default CustomerAppointmentNumber;

import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { Text } from '@components'
import { calendar, personHome } from '@assets'
import moment from 'moment'
import NavigationService from '@navigation/NavigationService';

const Header = () => {

    const [isSchedule, setSchedule] = React.useState(false);

    const navigateSchedule = () => {
        NavigationService.navigate('Schedule');
        setSchedule(true);
    }

    const back = () => {
        NavigationService.navigate('AppointmentList');
        setSchedule(false);
    }

    return (
        <View style={styles.container}>
            <DayPicked onPress={back} />
            <Text fontFamily='bold' style={styles.month}>
                {isSchedule ? 'Schedule' : `${moment().format('MMMM YYYY')}`}
            </Text>
            <TouchableOpacity onPress={navigateSchedule}>
                <Image style={styles.calendar} source={calendar} />
            </TouchableOpacity>
        </View>
    )
}

const DayPicked = ({ onPress }) => {
    return (
        <TouchableOpacity
            hitSlop={slop}
            onPress={onPress}
            opacity={1}
            style={styles.containerDayPicked}
        >
            <View style={styles.rowDot}>
                <View style={styles.dot} />
                <View style={[styles.dot, { marginLeft: scaleWidth(3) }]} />
            </View>
            <View style={styles.iconDayPicked}>
                <View style={styles.iconDayPickedHeader} />
                <View style={styles.bodyiconDayPicked}>
                    <Text fontFamily='bold' style={styles.txtDay}>
                        20
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(Header);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1),
        paddingHorizontal: scaleWidth(5)
    },
    calendar: {
        width: scaleWidth(8),
        height: scaleWidth(8)
    },
    month: {
        fontSize: scaleWidth(5),
        color: '#000000'
    },
    iconDayPicked: {
        width: scaleWidth(8),
        height: scaleWidth(6.5),
        borderRadius: 3,
        borderWidth: 1.3,
        borderColor: '#1366AE'
    },
    iconDayPickedHeader: {
        width: '100%',
        height: scaleWidth(2),
        backgroundColor: '#1366AE',
    },
    rowDot: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(1.5),
        marginBottom: 1
    },
    dot: {
        width: scaleWidth(1),
        height: scaleWidth(1),
        borderRadius: 300,
        backgroundColor: '#1366AE'
    },
    bodyiconDayPicked: {
        width: '100%',
        height: scaleWidth(3.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtDay: {
        fontSize: scaleWidth(3),
        color: '#1366AE'
    }
})
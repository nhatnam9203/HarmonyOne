import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { Text } from '@components'
import CalendarStrip from '@components/react-native-calendar-strip'
import { calendar } from '@assets'
import NavigationService from '@navigation/NavigationService'

const CalendarHorizontal = ({
    onPressSchedule = () => { },
    isSchedule,
    openDayPicker,
    daySelected,
    refCalendarHorizontal,
}) => {

    const onSchedule = (status) => {
        onPressSchedule(status);
        if (status == true) {
            NavigationService.navigate('Schedule');
        } else {
            NavigationService.navigate('AppointmentList');
        }
    }

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity
                style={styles.btnRight}
                activeOpacity={1}
                onPress={() => onSchedule(true)}
            >
                <Image
                    style={styles.calendar(isSchedule)}
                    source={calendar}
                />
            </TouchableOpacity>
            <DayPicked
                isSchedule={isSchedule}
                onPress={() => onSchedule(false)}
            />

            <CalendarStrip
                ref={refCalendarHorizontal}
                scrollable
                scrollerPaging
                style={{
                    height: isSchedule ? scaleHeight(8.5) : scaleHeight(17),
                    paddingTop: 20,
                    paddingBottom: isSchedule ? 0 : 20,
                }}
                selectedDate={daySelected}
                isSchedule={isSchedule}
                calendarColor={'white'}
                calendarHeaderContainerStyle={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: scaleWidth(5),
                }}
                calendarHeaderStyle={{ color: '#000000', fontSize: scaleWidth(5.5) }}
                dateNumberStyle={{ color: '#000000', fontWeight: '400', fontSize: scaleWidth(4.15), marginTop: scaleWidth(2) }}
                dateNameStyle={{ color: '#7B99BA', fontSize: scaleWidth(3.5) }}
                iconContainer={{ flex: 0.1 }}
                upperCaseDays={false}
                dayComponentHeight={scaleHeight(7.5)}
                highlightDateNameStyle={{
                    color: '#A3B7CE', fontSize: scaleWidth(3.5)
                }}
                highlightDateNumberStyle={{
                    color: '#ffffff', fontWeight: '400', fontSize: scaleWidth(4.15),
                }}
                highlightDateNumberContainerStyle={{
                    borderRadius: 300,
                    height: scaleWidth(8),
                    width: scaleWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: scaleWidth(2),
                    backgroundColor: '#1366AE'
                }}
                openDayPicker={openDayPicker}
            />

        </View>
    )
}

export default CalendarHorizontal;


const DayPicked = ({ onPress, isSchedule = false }) => {
    return (
        <TouchableOpacity
            hitSlop={slop}
            onPress={onPress}
            activeOpacity={1}
            style={styles.containerDayPicked}
        >
            <View style={styles.rowDot}>
                <View style={styles.dot(isSchedule)} />
                <View style={[styles.dot(isSchedule), { marginLeft: scaleWidth(3) }]} />
            </View>
            <View style={styles.iconDayPicked(isSchedule)}>
                <View style={styles.iconDayPickedHeader(isSchedule)} />
                <View style={styles.bodyiconDayPicked}>
                    <Text fontFamily='bold' style={styles.txtDay(isSchedule)}>
                        20
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1),
        paddingHorizontal: scaleWidth(5)
    },
    btnRight: {
        position: 'absolute',
        right: scaleWidth(5),
        top: scaleWidth(4),
        zIndex: 99999
    },
    calendar: isSchedule => {
        return {
            width: scaleWidth(8),
            height: scaleWidth(8),
            tintColor: isSchedule ? '#1366AE' : '#585858',
        }
    },
    month: {
        fontSize: scaleWidth(5),
        color: '#000000'
    },
    iconDayPicked: isSchedule => {
        return {
            width: scaleWidth(8),
            height: scaleWidth(6.5),
            borderRadius: 3,
            borderWidth: 1.3,
            borderColor: !isSchedule ? '#1366AE' : '#585858',
        }
    },
    iconDayPickedHeader: isSchedule => {
        return {
            width: '100%',
            height: scaleWidth(2),
            backgroundColor: !isSchedule ? '#1366AE' : '#585858',
        }
    },
    rowDot: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(1.5),
        marginBottom: 1
    },
    dot: isSchedule => {
        return {
            width: scaleWidth(1),
            height: scaleWidth(1),
            borderRadius: 300,
            backgroundColor: !isSchedule ? '#1366AE' : '#585858',
        }
    },
    bodyiconDayPicked: {
        width: '100%',
        height: scaleWidth(3.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtDay: isSchedule => {
        return {
            fontSize: scaleWidth(3),
            color: !isSchedule ? '#1366AE' : '#585858',
        }
    },
    containerDayPicked: {
        position: 'absolute',
        zIndex: 9999,
        top: scaleWidth(4),
        left: scaleWidth(5),
    }
})
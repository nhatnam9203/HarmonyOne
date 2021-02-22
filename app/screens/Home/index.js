import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TouchableOpacityComponent } from 'react-native'
import { Header, HeaderCalendar, AppointmentList, CalendarHorizontal } from './widget'
import HomeStack from './HomeStack'
import styles from './styles'
import { scaleWidth, scaleHeight } from '@utils'
import NavigationService from '@navigation/NavigationService'
import { DayPicker, Modalize } from '@components'
import moment from 'moment';

const index = () => {

    const modalizeRef = React.useRef(null);
    const refCalendarHorizontal = React.useRef(null);

    const [daySelected, selectDay] = React.useState(moment().clone());

    const openModal = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    }

    const [isSchedule, setSchedule] = React.useState(false);

    const switchSchedule = (status) => {
        setSchedule(status);
    }

    const onDayPress = (date) => {
        selectDay(date);
        refCalendarHorizontal?.current?.updateWeekView(date)
        refCalendarHorizontal.current?.setSelectedDate(date);
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <CalendarHorizontal
                    isSchedule={isSchedule}
                    onPressSchedule={setSchedule}
                    openDayPicker={openModal}
                    daySelected={daySelected}
                    refCalendarHorizontal={refCalendarHorizontal}
                />
                <HomeStack />
            </View>


            <Modalize
                close={closeModal}
                refModal={modalizeRef}
            >
                <DayPicker
                    onPress={() => { }}
                    onDayPress={onDayPress}
                    closeCalendarPicker={closeModal}
                />
            </Modalize>

        </View>
    )
}

export default index;
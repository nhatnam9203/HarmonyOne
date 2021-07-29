import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, MonthPicker } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { Modalize } from 'react-native-modalize'
import ItemPickedDate from './ItemPickedDate'
import AppointmentInfo from './AppointmentInfo'
import SaleInfo from './SaleInfo'
import moment from 'moment'

const Monthly = () => {

    const [date, setDate] = React.useState(moment().clone());

    const modalizeRef = React.useRef(null);

    const openCalendarPicker = () => {
        modalizeRef.current?.open();
    }

    const closeCalendarPicker = () => {
        modalizeRef.current?.close();
    }

    const applyDate = (dateSelected) => {
        closeCalendarPicker();
        setDate(dateSelected);
    }

    return (
        <View style={styles.container}>
            <ItemPickedDate
                onPress={openCalendarPicker}
                content={moment(date).format('MMMM YYYY')}
            />
            <AppointmentInfo />
            <SaleInfo />
            <Modalize
                handleStyle={{
                    opacity: 0
                }}
                overlayStyle={{
                    backgroundColor: 'transparent'
                }}
                modalStyle={{
                    backgroundColor: 'transparent'
                }}
                adjustToContentHeight
                onBackButtonPress={closeCalendarPicker}
                ref={modalizeRef}
            >
                <MonthPicker
                    bottom={0}
                    closeCalendarPicker={closeCalendarPicker}
                    date={date}
                    applyDate={applyDate}
                    cancel={closeCalendarPicker}
                />
            </Modalize>
        </View>
    )
}

export default Monthly;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: scaleWidth(5)
    }
})

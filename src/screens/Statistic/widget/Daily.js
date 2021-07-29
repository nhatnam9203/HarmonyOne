import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, DayPicker } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { Modalize } from 'react-native-modalize'
import ItemPickedDate from './ItemPickedDate'
import AppointmentInfo from './AppointmentInfo'
import SaleInfo from './SaleInfo'

const Daily = () => {

    const modalizeRef = React.useRef(null);

    const openCalendarPicker = () => {
        modalizeRef.current?.open();
    }

    const closeCalendarPicker = () => {
        modalizeRef.current?.close();
    }

    return (
        <View style={styles.container}>
            <ItemPickedDate
                onPress={openCalendarPicker}
                content='Thursday - 02/03/2021'
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
                <DayPicker
                    bottom={0}
                    closeCalendarPicker={closeCalendarPicker}
                />
            </Modalize>
        </View>
    )
}

export default Daily;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: scaleWidth(5)
    }
})

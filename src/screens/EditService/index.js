import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, TimePicker } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, ButtonApply, Name, StartTime, Duration } from './widget'
import { Modalize } from 'react-native-modalize'
import moment from 'moment'
import styles from './styles'

const index = () => {

    const [duration, setDuration] = React.useState(10);
    const [startTime, setStartTime] = React.useState('10:00 AM');

    const modalizeRef = React.useRef(null);

    const openTimePicker = () => {
        modalizeRef.current?.open();
    }

    const closeTimePicker = () => {
        modalizeRef.current?.close();
    }

    const calculateDuration = (type) => {
        if (type == 'plus') {
            setDuration(number => number + 5);
        } else if (type == 'minus') {
            if (duration > 5)
                setDuration(number => number - 5);
        }
    }

    const onChangeStartTime = (time) => {
        setStartTime(time);
    }

    const pressOkTimePicker = (time) => {
        setStartTime(time);
        closeTimePicker();
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: scaleWidth(5) }}>
                <Name name='Spa pedi - Art work & Gel color' />
                <StartTime
                    openTimePicker={openTimePicker}
                    startTime={startTime}
                />
                <Duration
                    calculateDuration={calculateDuration}
                    duration={duration}
                />
            </View>

            <ButtonApply />

            <Modalize
                handleStyle={{
                    opacity: 0
                }}
                overlayStyle={{
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
                modalStyle={{
                    backgroundColor: 'transparent'
                }}
                adjustToContentHeight
                onBackButtonPress={closeTimePicker}
                ref={modalizeRef}
            >
                <TimePicker
                    startTime={startTime}
                    closeTimePicker={closeTimePicker}
                    onChangeStartTime={onChangeStartTime}
                    pressOkTimePicker={pressOkTimePicker}
                />
            </Modalize>
        </View>
    )
}

export default index;

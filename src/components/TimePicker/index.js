import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../Text'
import { scaleWidth, scaleHeight, slop } from '@utils'
import styles from './styles'
import { Localization, HourPicker, MinutePicker, BottomButton } from './widget'
import moment from 'moment';

const TimePicker = ({
    closeTimePicker,
    pressOkTimePicker,
    startTime,
    title = "Start time"
}) => {

    const [hour, setHour] = React.useState(10);
    const [minute, setMinute] = React.useState('00');
    const [localization, setLocalization] = React.useState('AM');

    React.useEffect(() => {
        setHour(moment(startTime, ['hh:mm A']).format('hh'));
        setMinute(moment(startTime, ['hh:mm A']).minutes());
        setLocalization(moment(startTime, ['hh:mm A']).format('A'));
    }, []);

    const selectHour = (h) => {
        setHour(h);
    }

    const selectMinute = (m) => {
        setMinute(m);
    }

    const selectLocalization = (type) => {
        setLocalization(type);
    }

    const onClickOK = () => {
        const time = `${hour}:${minute} ${localization}`;
        pressOkTimePicker(time);
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text fontFamily='medium' style={styles.txtHeader}>
                    {title}
                </Text>
            </View>

            <View style={styles.body}>
                <Localization localization={localization} selectLocalization={selectLocalization} />
                <View style={styles.row}>
                    <HourPicker hour={hour} selectHour={selectHour} />
                    <MinutePicker minute={minute} selectMinute={selectMinute} />
                </View>
                <BottomButton
                    onClickOK={onClickOK}
                    cancel={closeTimePicker}
                />
            </View>
        </View>
    )
}

export default TimePicker;

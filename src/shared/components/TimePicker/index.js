import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { scaleWidth, scaleHeight, slop } from '@utils'
import styles from './styles'
import { Localization, HourPicker, MinutePicker, BottomButton } from './widget'
import moment from 'moment';

const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

export const TimePicker = ({ cancel, onApply, startTime, title = "Start time", minutesPicker }) => {

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
        let minnutesTemp = minutesPicker ? minutesPicker : minutes;
        if (minnutesTemp.indexOf(minute?.toString()) == -1) {
            Alert.alert("Please choose minute");
        } else {
            onApply(time);
        }
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
                <View style={[styles.row,{ alignItems : "flex-start" }]}>
                    <HourPicker hour={hour} selectHour={selectHour} />
                    <MinutePicker minute={minute} selectMinute={selectMinute} minutesPicker={minutesPicker} />
                </View>
                <BottomButton
                    onClickOK={onClickOK}
                    cancel={cancel}
                />
            </View>
        </View>
    )
}


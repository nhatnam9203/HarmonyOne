import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, DayPicker } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { Modalize } from 'react-native-modalize'
import ItemPickedDate from './ItemPickedDate'
import AppointmentInfo from './AppointmentInfo'
import SaleInfo from './SaleInfo'

const Custom = () => {

    const [isView, setView] = React.useState(false);

    const startTimeRef = React.useRef(null);
    const endTimeRef = React.useRef(null);

    const openStartTimePicker = () => {
        startTimeRef.current?.open();
    }

    const closeStartTimePicker = () => {
        startTimeRef.current?.close();
    }

    const openEndTimePicker = () => {
        endTimeRef.current?.open();
    }

    const closeEndTimePicker = () => {
        endTimeRef.current?.close();
    }

    const search = () => {
        setView(true);
    }

    if(isView) return <Result onPress={()=>setView(false)} />

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Start time
            </Text>
            <ItemPickedDate
                onPress={() => openStartTimePicker()}
                content='Thursday - 02/03/2021'
            />
            <Text style={[styles.title, { marginTop: scaleHeight(3) }]}>
                End time
            </Text>
            <ItemPickedDate
                onPress={() => openEndTimePicker()}
                content='Thursday - 02/03/2021'
            />
            <TouchableOpacity onPress={search} style={styles.buttonView}>
                <Text fontFamily='medium' style={styles.txtView}>View</Text>
            </TouchableOpacity>

            <ModalPicker refModal={startTimeRef} close={closeStartTimePicker} />
            <ModalPicker refModal={endTimeRef} close={closeEndTimePicker} />
        </View>
    )
}

const ModalPicker = ({ close, refModal }) => {
    return (
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
            onBackButtonPress={close}
            ref={refModal}
        >
            <DayPicker
                bottom={0}
                closeCalendarPicker={close}
            />
        </Modalize>
    )
}


const Result = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <ItemPickedDate
                onPress={onPress}
                content='Thursday - 02/03/2021'
            />
            <AppointmentInfo />
            <SaleInfo />
        </View>
    )
}

export default Custom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: scaleWidth(5)
    },
    title: {
        fontSize: scaleWidth(4.5),
        color: '#404040',
        marginBottom: scaleHeight(2),
    },
    buttonView: {
        width: scaleWidth(90),
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(5.5),
        backgroundColor: '#1366AE',
        borderRadius: 5,
        marginTop: scaleHeight(4)
    },
    txtView: {
        fontSize: scaleWidth(4.5),
        color: 'white'
    }
})

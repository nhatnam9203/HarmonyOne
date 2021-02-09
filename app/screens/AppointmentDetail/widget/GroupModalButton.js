import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { treedot } from '@assets'
import NavigationService from '@navigation/NavigationService';

const GroupModalButton = ({ closeModal , openPopupCancel }) => {

    const close = () => {
        closeModal();
    }

    const navigateEdit = () => {
        closeModal();
        NavigationService.navigate('EditAppointment');
    }

    const cancel = () =>{
        closeModal();
        openPopupCancel();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={navigateEdit}
                activeOpacity={1}
                fontFamily='medium'
                style={[styles.button, styles.btnEdit]}
            >
                <Text style={styles.text}>Edit Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={cancel}
                activeOpacity={1}
                fontFamily='medium'
                style={[styles.button, styles.btnCancel]}
            >
                <Text style={[styles.text, { color: 'red' }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={close}
                activeOpacity={1}
                fontFamily='medium'
                style={styles.button}
            >
                <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GroupModalButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(5)
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '100%',
        height: scaleHeight(5.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCancel: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginBottom: scaleHeight(1)
    },
    btnEdit: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    text: {
        color: '#404040',
        fontSize: scaleWidth(4.5)
    }
})
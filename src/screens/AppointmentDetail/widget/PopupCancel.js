import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text, Modal } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationService from '@navigation/NavigationService';

const PopupCancel = ({ item, isPopupCancel, closePopupCancel, onPressYes }) => {

    return (
        <Modal
            onRequestClose={() => { }}
            isVisible={isPopupCancel}
        >
            <View style={styles.container}>
                <Text fontFamily='medium' style={styles.title}>
                    Cancel appointment
                </Text>
                <Text style={styles.content}>
                    Are you sure want to cancel the appointment?
                </Text>
                <TouchableOpacity hitSlop={slop} onPress={closePopupCancel} style={styles.btnClose}>
                    <AntDesign
                        name='close'
                        size={scaleWidth(6)}
                        color='#000000'
                    />
                </TouchableOpacity>

                <View style={styles.containerBottom}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressYes}
                        style={[styles.button, {
                            borderRightWidth: 1,
                            borderRightColor: '#dddddd'
                        }]}
                    >
                        <Text fontFamily='medium' style={[styles.txtButton,{ color: 'red' }]}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={closePopupCancel}
                        style={styles.button}
                    >
                        <Text fontFamily='medium' style={[styles.txtButton, { color: '#1366AE' }]}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
export default PopupCancel;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(90),
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: scaleWidth(5),
        paddingBottom: 0,
        position: 'relative'
    },
    title: {
        textAlign: 'center',
        fontSize: scaleWidth(5),
        color: '#000000'
    },
    btnClose: {
        position: 'absolute',
        right: scaleWidth(3),
        top: scaleWidth(3)
    },
    content: {
        fontSize: scaleWidth(4),
        marginTop: scaleHeight(2),
        textAlign: 'center',
        color: '#404040',
        marginHorizontal: scaleWidth(7)
    },
    containerBottom: {
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        marginTop: scaleHeight(2),

    },
    button: {
        width: '50%',
        height: scaleHeight(5.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton: {
        fontSize: scaleWidth(4.3),
        color: '#585858'
    }
})
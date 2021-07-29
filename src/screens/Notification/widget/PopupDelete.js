import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text, Modal } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationService from '@navigation/NavigationService';

const PopupDelete = ({ item, isPopupDelete, closePopupDelete, onPressYes }) => {

    return (
        <Modal
            onRequestClose={() => { }}
            isVisible={isPopupDelete}
        >
            <View style={styles.container}>
                <Text fontFamily='medium' style={styles.title}>
                    Notification
                </Text>
                <Text style={styles.content}>
                    Do you want to delete the last 20 notifications?
                </Text>
                <TouchableOpacity hitSlop={slop} onPress={closePopupDelete} style={styles.btnClose}>
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
                        <Text fontFamily='medium' style={styles.txtButton}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={closePopupDelete}
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
export default PopupDelete;

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
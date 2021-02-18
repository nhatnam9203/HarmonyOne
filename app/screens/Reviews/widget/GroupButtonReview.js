import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { treedot } from '@assets'

const GroupButtonReview = ({ closeModal , onPressShow, onPressDelete}) => {

    const close = () => {
        closeModal();
    }

    const cancel = () =>{
        closeModal();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPressShow}
                activeOpacity={1}
                fontFamily='medium'
                style={[styles.button, styles.btnEdit]}
            >
                <Text style={styles.text}>Show</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPressDelete}
                activeOpacity={1}
                fontFamily='medium'
                style={[styles.button, styles.btnCancel]}
            >
                <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
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

export default GroupButtonReview;

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
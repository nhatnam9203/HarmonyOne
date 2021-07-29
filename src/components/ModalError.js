import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './Text';
import Modal from './Modal77';
import { scaleWidth, scaleHeight, slop } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ModalError = () => {
    const dispatch = useDispatch();
    const { contentError } = useSelector(state => state.loadingReducer);
    const closePopupError = () => {
        dispatch({
            type: 'SET_CONTENT_ERROR',
            content: ''
        })
    }
    return (
        <Modal
            onRequestClose={() => { }}
            isVisible={contentError && contentError.toString().length > 0}
        >
            <View style={styles.container}>
                <ButtonClose onPress={closePopupError} />
                <Text>{contentError}</Text>
            </View>
        </Modal>
    )
}

const ButtonClose = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} hitSlop={slop} style={styles.btnClose}>
            <AntDesign name='close' size={scaleWidth(7.5)} color='#585858' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(90),
        height: scaleHeight(40),
        backgroundColor: 'white',
        position: 'relative'
    },
    btnClose: {
        top: scaleWidth(3),
        right: scaleWidth(3),
        position: 'absolute'
    }
})

export default ModalError;

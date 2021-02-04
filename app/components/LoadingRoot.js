import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Modal from './Modal';
import { scaleWidth, scaleHeight, slop } from '@utils';
import { useSelector } from 'react-redux';

const LoadingRoot = () => {
    const { isLoadingRoot } = useSelector(state => state.loadingReducer);
    return (
        <Modal
            onRequestClose={() => { }}
            isVisible={isLoadingRoot}
        >
                <View style={styles.wrapLoading}>
                    <ActivityIndicator color='#404040' size='large' />
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapLoading: {
        padding: scaleWidth(5),
        borderRadius: 8,
        backgroundColor : 'white'
    }
})

export default LoadingRoot;

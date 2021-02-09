import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Modal from './Modal77';
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
                    <ActivityIndicator color='white' size='small' />
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapLoading: {
        padding: scaleWidth(7),
        borderRadius: 8,
        backgroundColor : 'rgba(0,0,0,0.5)'
    }
})

export default LoadingRoot;

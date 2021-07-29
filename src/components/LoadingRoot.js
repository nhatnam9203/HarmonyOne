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
                    <ActivityIndicator color='white' size='small' />
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapLoading: {
        width : scaleWidth(20),
        height : scaleWidth(20),
        justifyContent : 'center',
        alignSelf: 'center',
        alignItems : 'center',
        borderRadius: 8,
        backgroundColor : 'rgba(0,0,0,0.6)'
    }
})

export default LoadingRoot;

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '@components'
import { scaleHeight } from '@utils'
import { Header, UserInfo, Time, Service, HomeService, BottomButton, GroupModalButton } from './widget'
import { Modalize } from 'react-native-modalize'
import styles from './styles'

const index = () => {

    const modalizeRef = React.useRef(null);

    const openModal = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    }


    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.body}>
                <UserInfo />
                <HomeService />
                <Time />
                <Service />
                <View style={{ height: scaleHeight(40) }} />
            </ScrollView>
            <BottomButton openModal={openModal} />

            <Modalize
                handleStyle={{
                    opacity: 0
                }}
                overlayStyle={{
                    backgroundColor : 'rgba(0,0,0,0.4)'
                }}
                modalStyle={{
                    backgroundColor : 'transparent'
                }}
                adjustToContentHeight onBackButtonPress={closeModal} ref={modalizeRef}>
                <GroupModalButton closeModal={closeModal} />
            </Modalize>
        </View>
    )
}

export default index;

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '@components'
import { scaleHeight } from '@utils'
import { Header, UserInfo, Time, Service, HomeService, BottomButton, GroupModalButton, PopupCancel } from './widget'
import { Modalize } from 'react-native-modalize'
import styles from './styles'

const index = () => {

    const modalizeRef = React.useRef(null);
    const [isPopupCancel, setPopupCancel] = React.useState(false);

    const openModal = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    }

    const openPopupCancel = () => {
        setPopupCancel(true);
    }

    const closePopupCancel = () => {
        setPopupCancel(false);
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
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
                modalStyle={{
                    backgroundColor: 'transparent'
                }}
                adjustToContentHeight onBackButtonPress={closeModal} ref={modalizeRef}>
                <GroupModalButton
                    openPopupCancel={openPopupCancel}
                    closeModal={closeModal}
                />
            </Modalize>

            <PopupCancel
                isPopupCancel={isPopupCancel}
                closePopupCancel={closePopupCancel}
                onPressYes={closePopupCancel}
            />
        </View>
    )
}

export default index;

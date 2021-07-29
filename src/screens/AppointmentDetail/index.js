import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '@components'
import { scaleHeight } from '@utils'
import {
    Header,
    UserInfo,
    Time,
    Service,
    HomeService,
    BottomButton,
    GroupModalButton,
    PopupCancel,
    TotalInfo
} from './widget'
import { Modalize } from 'react-native-modalize'
import styles from './styles'
import NavigationService from '@navigation/NavigationService'

const index = () => {

    const modalizeRef = React.useRef(null);
    const [isPopupCancel, setPopupCancel] = React.useState(false);
    let status = 'checkin';

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

    const updateNextStatus = () => {
        switch (status) {
            case 'checkin':
                checkOut();
                break;
            case 'unconfirm':
                updateStatusAppointment();
                break;
            case 'confirm':
                updateStatusAppointment();
                break;

            default:
                break;
        }
    }

    const updateStatusAppointment = () => {

    }

    const checkOut = () => {
        NavigationService.navigate('Checkout');
    }

    return (
        <View style={styles.container}>
            <Header status={status} />
            <ScrollView style={styles.body}>
                <UserInfo />
                <HomeService />
                <Time />
                <Service />
                <TotalInfo status={status} />
                <View style={{ height: scaleHeight(40) }} />
            </ScrollView>
            {
                status !== 'paid' &&
                <BottomButton
                    status={status}
                    openModal={openModal}
                    onPressConfirm={updateNextStatus}
                />
            }

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

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Item } from './widget'
import {
    information_service,
    information_home,
    information_review,
    information_payment,
    information_hardware
} from '@assets'
import styles from './styles'
import NavigationService from '@navigation/NavigationService';
import { StatusBar } from '@components';

const index = () => {

    const goToServicePage = () => {
        NavigationService.navigate('Services');
    }

    const gotoReviewPage = () => {
        NavigationService.navigate('Reviews')
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <Header />
            <View style={styles.body}>
                <Item content={'Bussiness Informations'} icon={information_home} />
                <Item onPress={goToServicePage} content={'Services'} icon={information_service} />
                <Item onPress={gotoReviewPage} content={'Reviews'} icon={information_review} />
                <Item content={'Payment'} icon={information_payment} />
                <Item content={'Hardware'} icon={information_hardware} />
            </View>
        </View>
    )
}

export default index;
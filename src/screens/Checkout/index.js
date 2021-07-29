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
    TotalInfo,
    SelectMethod,
} from './widget'
import styles from './styles'
import NavigationService from '@navigation/NavigationService'

const index = (props) => {

    const [methodPay, setMethodPay] = React.useState('HarmonyPay');

    const payType = props?.route?.params?.payType;

    React.useEffect(() => {
        if (payType) setMethodPay(payType);
    }, [payType]);

    let status = 'checkin';

    const pay = () => {

    }

    const selectMethod = () => {
        NavigationService.navigate('SelectPayment',{ payType : methodPay });
    }

    return (
        <View style={styles.container}>
            <Header status={status} />
            <ScrollView style={styles.body}>
                <UserInfo />
                {/* <HomeService /> */}
                <Time />
                <Service />
                <TotalInfo status={status} />
                <SelectMethod onPress={selectMethod} methodPay={methodPay} />
                <View style={{ height: scaleHeight(40) }} />
            </ScrollView>
            <BottomButton onPress={pay} />
        </View>
    )
}

export default index;

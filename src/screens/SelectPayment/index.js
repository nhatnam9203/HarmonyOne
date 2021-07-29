import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { scaleHeight } from '@utils'
import { Header, ItemMethod } from './widget'
import styles from './styles'
import NavigationService from '@navigation/NavigationService';

const index = (props) => {

    const [methodPay, setMethodPay] = React.useState("HarmonyPay");

    const payType = props?.route?.params?.payType;

    React.useEffect(() => {
        if (payType) setMethodPay(payType);
    }, [payType]);

    const selectMethod = (type) => {
        let method = 'HarmonyPay';
        switch (type) {
            case 'HarmonyPay':
                method = 'HarmonyPay';
                break;
            case 'Cash':
                method = 'Cash';
                break;
            case 'CreditCard':
                method = 'CreditCard';
                break;
            default:
                break;
        }
        setMethodPay(method);
        NavigationService.navigate('Checkout', {
            payType: method
        });
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ paddingTop: scaleHeight(4) }}>
                <ItemMethod
                    color={methodPay == 'HarmonyPay' ? '#1366AE' : '#000000'}
                    name='HarmonyPay'
                    onPress={() => selectMethod('HarmonyPay')}
                />
                <ItemMethod
                    color={methodPay == 'Cash' ? '#1366AE' : '#000000'}
                    name='Cash'
                    onPress={() => selectMethod('Cash')}
                />
                <ItemMethod
                    color={methodPay == 'CreditCard' ? '#1366AE' : '#000000'}
                    name='Credit card'
                    onPress={() => selectMethod('CreditCard')}
                />
            </View>
        </View>
    )
}

export default index;

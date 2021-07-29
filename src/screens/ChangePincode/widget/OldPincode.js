import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { icon_signin } from '@assets';
import { Text } from '@components';
import InputPincode from './InputPincode';

import NavigationService from '@navigation/NavigationService';

const OldPincode = () => {

    const [currentPincode, setCurrentPincode] = React.useState('');

    const forgotPincode = () =>{
        NavigationService.navigate('ForgotPincode',{ isMain : true });
    }

    const submitCheckCurrentPincode = () => {
        NavigationService.navigate('NewPincode');
    }

    const onChangePincode = (pin) =>{
        if(pin.toString().length == 4){
            submitCheckCurrentPincode();
        }
        setCurrentPincode(pin);
    }

    return (
        <View style={styles.container}>
            <Image source={icon_signin} style={styles.icon_signin} />
            <Text style={styles.txtPincode}>Current PIN code</Text>
            <InputPincode value={currentPincode} onChange={onChangePincode} />
            <TouchableOpacity onPress={forgotPincode}>
                <Text style={styles.txtForgot}>Forgot PIN code?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OldPincode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: scaleHeight(5)
    },
    icon_signin: {
        width: scaleWidth(25),
        height: scaleWidth(25)
    },
    txtPincode: {
        fontSize: scaleWidth(5),
        color: '#7B99BA',
        marginVertical: scaleHeight(5)
    },
    txtForgot: {
        color: '#17A4EC',
        marginTop: scaleHeight(3),
        fontSize: scaleWidth(4)
    }
});

import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components';
import { pincode_success } from '@assets';
import InputPincode from './InputPincode';


const NewPincode = () => {

    const [confirmNewPincode, setConfirmPincode] = React.useState('');
    const [newPincode, setNewPincode] = React.useState('');

    const [isSuccess, setSuccess] = React.useState('');

    const onChangeNewPincode = (pin) => {
        setNewPincode(pin);
    }

    const onChangeConfirmPincode = (pin) => {
        setConfirmPincode(pin);
        if (pin.toString().length == 4 && (pin == newPincode)) {
            alert('hihihi')
            setSuccess(true);
        }
    }

    if(isSuccess) return(
        <ChangePincodeSuccuess />
    )

    return (
        <View style={styles.container}>
            <Text style={styles.txtPincode}>New PIN code</Text>
            <InputPincode
                value={newPincode}
                onChange={onChangeNewPincode}
            />
            <Text style={styles.txtPincode}>Confirm New PIN code</Text>
            <InputPincode
                value={confirmNewPincode}
                onChange={onChangeConfirmPincode}
            />
        </View>
    )
}

const ChangePincodeSuccuess = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.icon_success} source={pincode_success} />
            <Text style={styles.txtPincode}>
                Change pin code successfully
            </Text>
        </View>
    )
}

export default NewPincode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    icon_signin: {
        width: scaleWidth(25),
        height: scaleWidth(25)
    },
    icon_success: {
        width: scaleWidth(22),
        height: scaleWidth(22),
        marginTop : scaleHeight(5)
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

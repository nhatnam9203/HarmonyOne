import React from 'react'
import { Animated } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils';
import NavigationService from '@navigation/NavigationService'

const logic = () => {
    const [valueMID, setValueMID] = React.useState("");

    const onChangeMID = (txt) => {
        setValueMID(txt);
    }

    const onPressContinue = () =>{
        NavigationService.navigate("ForgotPincodeSuccess");
    }

    return [
        valueMID,
        onChangeMID,
        onPressContinue
    ]
};

export default logic;
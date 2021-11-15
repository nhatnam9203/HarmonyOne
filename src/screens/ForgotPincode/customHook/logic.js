import React from 'react'
import { Animated } from 'react-native'
import NavigationService from '@navigation/NavigationService';
import { useSelector } from "react-redux";
import { forgotPincode, useAxiosMutation } from "@src/apis";
import AsyncStorage from "@react-native-community/async-storage";
import { enCA } from 'date-fns/locale';

const logic = () => {
    const [valueMID, setValueMID] = React.useState("");
    const {
        auth: { merchantID }
    } = useSelector(state => state);

    const [, submitForgotPin] = useAxiosMutation({
        ...forgotPincode(),
        onSuccess: (data, response) => {
            console.log({ response })
            if (response?.codeNumber == 200) {
                NavigationService.navigate("ForgotPincodeSuccess");
            }
        }
    })

    const onChangeMID = (txt) => {
        setValueMID(txt);
    }

    const onPressContinue = async () => {
        let merchantId = null;
        const merchant_code = await AsyncStorage.getItem("@merchantID");
        if (merchantID) {
          merchantId = merchantID;
        } else {
          merchantId = merchant_code;
        }
        const data = {
            merchantCode: merchantID,
            email: valueMID,
        }
        console.log('data for got pin code : ',{ data });
        const body = await forgotPincode(data);
        submitForgotPin(body.params);
    }

    return [
        valueMID,
        onChangeMID,
        onPressContinue
    ]
};

export default logic;
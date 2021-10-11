import React from 'react'
import { Animated } from 'react-native'
import NavigationService from '@navigation/NavigationService';
import { useSelector } from "react-redux";
import { forgotPincode, useAxiosMutation } from "@src/apis";

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
        const data = {
            merchantId: merchantID,
            email: valueMID,
        }
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
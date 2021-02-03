import React from 'react'
import { Animated } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'

const logicLogin = () => {
    const [valuePincode, setValuePincode] = React.useState("");

    const onChangePincode = (txt) => {
        setValuePincode(txt);
    }

    return [
        valuePincode,
        onChangePincode
    ]
};

export default logicLogin;
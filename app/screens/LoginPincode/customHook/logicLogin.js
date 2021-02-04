import React from 'react'
import { Animated } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { useDispatch } from 'react-redux'
import actions from '@actions'

const logicLogin = (props) => {
    const dispatch = useDispatch();
    const [valuePincode, setValuePincode] = React.useState("");

    const onChangePincode = (txt) => {
        setValuePincode(txt);
    }

    const loginPincode = () => {
        const { merchantCode } = props.route.params;
        const body = {
            merchantCode,
            staffPin: valuePincode
        }
        dispatch(actions.authAction.loginPincode(body));
    }

    return [
        valuePincode,
        onChangePincode,
        loginPincode
    ]
};

export default logicLogin;
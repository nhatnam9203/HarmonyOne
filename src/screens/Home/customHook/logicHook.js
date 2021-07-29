import React from 'react'
import { Animated } from 'react-native'

import NavigationService from '@navigation/NavigationService'
import { useDispatch } from 'react-redux'

const logicHook = (props) => {
    const dispatch = useDispatch();

    const navigateDetail = () => {
        NavigationService.navigate('AppointmentDetail')
    }

    return [
        navigateDetail
    ]
};

export default logicHook;
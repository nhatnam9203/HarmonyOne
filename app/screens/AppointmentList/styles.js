import React from 'react'
import { StyleSheet } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    item: status => {
        let backgroundColor = '#50CF25'
        switch (status) {
            case 'unconfirm':
                backgroundColor = '#FFFD88'
                break;
            case 'confirm':
                backgroundColor = '#D5F8FC'
                break;
            case 'checkin':
                backgroundColor = '#28AAE9'
                break;
            case 'paid':
                backgroundColor = '#50CF25'
                break;

            default:
                break;
        }
        return {
            width: scaleWidth(90),
            borderRadius: 8,
            padding: scaleWidth(5),
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.11,
            shadowRadius: 2.24,
            elevation: 3,
            backgroundColor,
            marginTop: scaleHeight(1.5),
            marginHorizontal: scaleWidth(5),
            position: 'relative'
        }
    },
    time: status => {
        let color = 'white';
        if (status == 'confirm' || status == 'unconfirm') {
            color = '#000000'
        }
        return {
            fontSize: scaleWidth(4.8),
            color,
        }
    },
    personHome: {
        width: scaleWidth(5.5),
        height: scaleWidth(5.5),
        tintColor: 'black'
    },
    btnPeronHome: {
        position: 'absolute',
        top: scaleWidth(5),
        right: scaleWidth(5),
    }
});

export default styles;
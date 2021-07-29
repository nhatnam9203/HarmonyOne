import { StyleSheet, } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
        backgroundColor: 'white',
        paddingBottom: scaleHeight(4)
    },
    header: {
        paddingVertical: scaleWidth(4),
        width: scaleWidth(100),
        backgroundColor: '#1366AE'
    },
    txtHeader: {
        color: 'white',
        fontSize: scaleWidth(5),
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        backgroundColor: 'white',
        padding: scaleWidth(3)
    },
    btnAM: {
        paddingVertical: scaleWidth(1.5),
        paddingHorizontal: scaleWidth(5),
        backgroundColor: '#28AAE9',
        borderRadius: 300,
    },
    txtAM: {
        color: 'white',
        fontSize: scaleWidth(4.5)
    },
    txtLocalization: {
        color: 'white',
        fontSize: scaleWidth(4.2)
    },

    hourPickerContainer: {
        width: '50%',
        paddingTop: scaleHeight(2.5),
        borderRightWidth: 1,
        borderRightColor: '#eeeeee'
    },
    txtSelect: {
        fontSize: scaleWidth(4),
        color: '#7B99BA',
        textAlign: 'center',
        marginBottom: scaleHeight(1)
    },
    btnPicker: (hour, h) => {
        return {
            width: scaleWidth(13),
            height: scaleWidth(13),
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    txtPicker: (hour, h) => {
        return {
            fontSize: scaleWidth(4),
            color: '#000000',
            color: hour == h ? 'white' : '#000000'
        }
    },
    wrapHourText: (hour, h) => {
        return {
            backgroundColor: hour == h ? '#32ABE6' : 'transparent',
            borderRadius: hour == h ? 300 : 0,
            width: scaleWidth(10),
            height: scaleWidth(10),
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    btnBottom: {
        width: '50%',
        height: scaleHeight(5.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBottom: {
        fontSize: scaleWidth(4.5),
        color: '#585858'
    },
    containerBottom: {
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        marginTop: scaleHeight(1),
        paddingTop: scaleHeight(1),
    }
});

export default styles;
import { StyleSheet, } from 'react-native'
import { fonts, colors } from "@shared/themes";

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(375),
        backgroundColor: 'white',
        paddingBottom: scaleHeight(4),
    },
    header: {
        paddingVertical: scaleHeight(12),
        width: scaleWidth(375),
        backgroundColor: '#1366AE'
    },
    txtHeader: {
        color: 'white',
        fontSize: scaleFont(20),
        textAlign: 'center',
        fontFamily: fonts.MEDIUM,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        backgroundColor: 'white',
        padding: scaleWidth(16)
    },
    btnAM: {
        paddingVertical: scaleWidth(8),
        paddingHorizontal: scaleWidth(18),
        backgroundColor: '#28AAE9',
        borderRadius: 300,
    },
    txtAM: {
        color: 'white',
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM,
    },
    txtLocalization: {
        color: 'white',
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM,
    },

    hourPickerContainer: {
        width: '50%',
        paddingTop: scaleHeight(16),
        borderRightWidth: 1,
        borderRightColor: '#eeeeee'
    },
    txtSelect: {
        fontSize: scaleFont(15),
        color: '#7B99BA',
        textAlign: 'center',
        marginBottom: scaleHeight(8),
        fontFamily: fonts.REGULAR,
    },
    btnPicker: (hour, h) => {
        return {
            width: scaleWidth(50),
            height: scaleWidth(50),
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    txtPicker: (hour, h) => {
        return {
            fontSize: scaleFont(16),
            fontFamily: fonts.MEDIUM,
            color: '#000000',
            color: hour == h ? 'white' : '#000000'
        }
    },
    wrapHourText: (hour, h) => {
        return {
            backgroundColor: hour == h ? '#32ABE6' : 'transparent',
            borderRadius: hour == h ? 300 : 0,
            width: scaleWidth(40),
            height: scaleWidth(40),
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    btnBottom: {
        width: '50%',
        height: scaleHeight(40),
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    txtBottom: {
        fontSize: scaleFont(17),
        color: '#585858',
        fontFamily: fonts.REGULAR,
    },
    containerBottom: {
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        marginTop: scaleHeight(8),
        paddingTop: scaleHeight(8),
    }
});

export default styles;
import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(5)
    },
    title: {
        marginTop: scaleHeight(8),
        fontSize: scaleWidth(5),
        color: '#404040'
    },
    logo: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        marginTop : scaleHeight(5)
    },
    btnEnterYourMID: {
       position : 'absolute',
       bottom : scaleHeight(1.5),
       left: scaleWidth(25)
    },
    content: {
        fontSize: scaleWidth(5.5),
        color: '#7B99BA',
        marginTop : scaleHeight(5)
    },

    containerInput: {
        paddingHorizontal : scaleWidth(7),
        paddingVertical : scaleWidth(1),
        marginTop : scaleHeight(5),
        position : 'relative',
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth: 1,
        borderColor:  '#CCCCCC',
        borderRadius : scaleWidth(30)
    },
    dotInput : {
        width: scaleWidth(6),
        height: scaleWidth(6),
        borderRadius: scaleWidth(30),
        backgroundColor: '#7B99BA',
        opacity: 0.7,
    },
    maskInput : {
        width: scaleWidth(6),
        height: scaleWidth(6),
        borderRadius: scaleWidth(30),
        backgroundColor: '#7B99BA',
    },
    icon_mid: {
        width: scaleWidth(7),
        height: scaleWidth(7)
    },
    textInput: {
        width: scaleWidth(78),
        fontSize: scaleWidth(4),
        color: '#7B99BA',
        marginLeft: scaleWidth(5),
        textAlign: 'center',
        paddingRight: scaleWidth(10),
    },
    buttonContinue: isActive => {
        return{
            backgroundColor: isActive ? '#1366AE' : 'transparent',
            width: '100%',
            marginTop: scaleHeight(5),
            borderRadius: 5,
            padding: scaleWidth(4),
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: isActive ? 0 : 1,
            borderColor: '#1366AE'
        }
    },
    txtContinue: isActive => {
        return{
            fontSize: scaleWidth(4.5),
            color: isActive ? 'white' : '#1366AE',
        }
    },

    txtWhatIsMerchant: {
        fontSize: scaleWidth(4),
        color: '#28AAE9',
    },
    buttonWhat: {
        alignSelf: 'center',
        marginTop: scaleHeight(2)
    }
});

export default styles;
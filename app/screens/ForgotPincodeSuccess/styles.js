import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(5),
        position : 'relative'
    },
    title: {
        marginTop: scaleHeight(8),
        fontSize: scaleWidth(5),
        color: '#404040'
    },
    logo: {
        width: scaleWidth(50),
        height: scaleWidth(50),
    },
    btnEnterYourMID: {
       position : 'absolute',
       bottom : scaleHeight(1.5),
       left: scaleWidth(25)
    },
    content: {
        fontSize: scaleWidth(4),
        color: '#404040',
        textAlign: 'center',
        marginTop:  scaleHeight(2)
    },
    btnBottom : {
        alignSelf : 'center'
    },
    txtBottom : {
        color : '#1366AE',
        textDecorationLine : 'underline',
        textDecorationColor : '#1366AE',
        marginTop:  scaleHeight(5),
        fontSize : scaleWidth(4)
    },
    iconBack: {
        width: scaleWidth(6),
        height: scaleHeight(3.3)
    },
    buttonBack : {
        position : 'absolute',
        top : scaleHeight(8),
        left : scaleWidth(5)
    }
});

export default styles;
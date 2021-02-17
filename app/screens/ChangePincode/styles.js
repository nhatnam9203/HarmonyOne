import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    body : {
        flex : 1,
    },

    containerInput: {
        paddingHorizontal : scaleWidth(4),
        // paddingVertical : scaleWidth(1),
        position : 'relative',
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth: 1,
        borderColor:  '#CCCCCC',
        borderRadius : scaleWidth(30)
    },
    dotInput : {
        width: scaleWidth(5),
        height: scaleWidth(5),
        borderRadius: scaleWidth(30),
        backgroundColor: '#D6DFEA',
        opacity: 0.7,
    },
    maskInput : {
        width: scaleWidth(5),
        height: scaleWidth(5),
        borderRadius: scaleWidth(30),
        backgroundColor: '#7B99BA',
    },
});

export default styles;
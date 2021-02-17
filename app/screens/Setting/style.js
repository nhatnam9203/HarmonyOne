import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : scaleWidth(5)
    },
    body : {
        flex : 1,
    },
    line : {
        borderBottomWidth: 1 ,
        borderBottomColor : '#eeeeee',
        marginTop: scaleHeight(2)
    },
    row : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginTop: scaleHeight(1.5)
    }
});

export default styles;
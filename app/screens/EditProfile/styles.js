import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    body : {
        flex : 1,
        padding : scaleWidth(5),
        paddingTop : scaleWidth(16) + scaleHeight(1)
    }
});

export default styles;
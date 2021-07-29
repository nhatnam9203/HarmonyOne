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
    rowSectionHeader : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    treedot : {
        width : scaleWidth(5),
        height : scaleWidth(5)
    }
});

export default styles;
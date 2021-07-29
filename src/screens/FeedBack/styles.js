import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        flex: 1,
        padding: scaleWidth(5),
    },
    title: {
        fontSize: scaleWidth(6),
        color: '#1366AE',
    },
    content: {
        fontSize: scaleWidth(4.3),
        marginTop: scaleHeight(1.5),
        color: '#404040'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaleHeight(4),
        width: scaleWidth(84),
        alignSelf: 'center'
    },
    emoji: {
        width: scaleWidth(12),
        height: scaleWidth(12),
    },
    wrapEmoji : {
        width: scaleWidth(15),
        height: scaleWidth(15),
        borderRadius : 600,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dddddd',
        height: scaleHeight(20),
        width: scaleWidth(90),
        backgroundColor: '#F8F8F8',
        fontSize: scaleWidth(4),
        padding: scaleWidth(3),
        marginTop: scaleHeight(4),
    },
    buttonSubmit: {
        width: scaleWidth(90),
        height: scaleHeight(5.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#0764B0',
        marginTop: scaleHeight(4)
    },
    txtSubmit: {
        fontSize: scaleWidth(4.5),
        color: 'white',
    }
});

export default styles;
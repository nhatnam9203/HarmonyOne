import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { calendar_bottom } from '@assets'

const ItemPickedDate = ({
    content = '',
    onPress=()=>{}
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <Image source={calendar_bottom} style={styles.icon} />
            <Text fontFamily='medium' style={styles.content}>{content}</Text>
        </TouchableOpacity>
    )
}

export default ItemPickedDate;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems : 'center',
        padding: scaleWidth(2.3),
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius : 5,
        backgroundColor: '#FAFAFA'
    },
    icon: {
        width: scaleWidth(5.4),
        height: scaleWidth(5.4),
        tintColor : '#7B99BA'
    },
    content : {
        color: '#404040',
        fontSize: scaleWidth(4.15),
        marginLeft : scaleWidth(3)
    }
})

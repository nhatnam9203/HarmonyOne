import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth } from '@utils';
import { rightButton } from '@assets';

const Item = ({ content, icon, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.item}>
            <View style={styles.row}>
                <Image source={icon} style={styles.icon} />
                <Text fontFamily='medium' style={styles.content}>{content}</Text>
            </View>
            <Image source={rightButton} style={styles.iconRight} resizeMode='contain' />
        </TouchableOpacity>
    )
};

export default Item;

const styles = StyleSheet.create({
    item: {
        width: scaleWidth(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scaleWidth(5),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: scaleWidth(6),
        height: scaleWidth(6),
    },
    content: {
        fontSize: scaleWidth(5),
        color: '#404040',
        marginLeft: scaleWidth(5),
    },
    iconRight: {
        width: scaleWidth(2.5),
        height: scaleWidth(2.5),
        tintColor: '#1366AE'
    }
})
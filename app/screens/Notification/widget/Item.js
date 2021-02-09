import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import NavigationService from '@navigation/NavigationService';

const Item = ({ item }) => {
    const { isRead } = item;
    return (
        <View style={styles.container}>
            <Text fontFamily='medium' style={styles.title(isRead)}>
                {item.title}
            </Text>
            <Text style={styles.code(isRead)}>
                {item.code}
            </Text>
            <Text style={styles.content(isRead)}>
                {item.content}
            </Text>
            <View style={styles.row}>
                <Text style={styles.date(isRead)}>
                    {item.date}
                </Text>
                <Text style={styles.date(isRead)}>
                    {item.time}
                </Text>
            </View>
        </View>
    )
}
export default Item;

const styles = StyleSheet.create({
    container: {
        padding: scaleWidth(5),
        paddingBottom: scaleHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    title: isRead => {
        return {
            color: isRead ? '#797979' : '#1366AE',
            fontSize: scaleWidth(4.5)
        }
    },
    code: isRead => {
        return {
            marginTop: scaleHeight(1.3),
            color: isRead ? '#A3B7CE' : '#7B99BA',
            fontSize: scaleWidth(3.7)
        }
    },
    content: isRead => {
        return {
            fontSize: scaleWidth(4),
            color: isRead ? '#797979' : '#585858',
            marginTop: scaleHeight(0.5)
        }
    },
    date: isRead => {
        return {
            fontSize: scaleWidth(3.5),
            color: isRead ? '#797979' : '#585858',
        }
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(0.5)
    }
})
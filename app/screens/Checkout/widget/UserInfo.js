import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { back } from '@assets'

const UserInfo = ({ status }) => {
    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Text fontFamily='medium' style={styles.userName}>
                    Pena Valdez
                </Text>
                <Text style={styles.phone}>
                    {`(+84) 35514-0858`}
                </Text>
            </View>
        </View>
    )
}

export default UserInfo;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor : '#eeeeee',
        paddingBottom : scaleHeight(1.5)
    },
    wrap: {
        width: scaleWidth(13),
        height: scaleWidth(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 300,
        backgroundColor: '#f7f7f7'
    },
    txtIcon: {
        color: '#1366AE',
        fontSize: scaleWidth(5.5),
    },
    info: {
    },
    userName: {
        fontSize: scaleWidth(5.4),
        color: '#404040',
    },
    phone : {
        fontSize : scaleWidth(3.6),
        color : '#7B99BA',
        marginTop : scaleWidth(1.3)
    }
})
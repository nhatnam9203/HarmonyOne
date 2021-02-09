import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { personHome } from '@assets'

const HomeService = ({ status }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapTitle}>
                <Text style={styles.title}>
                    Customer request to serve at home
                </Text>
            </View>
            <View style={styles.row}>
                <Image source={personHome} style={styles.icon} /> 
                <Text fontFamily='bold' style={styles.address}>
                    {`18/2/2 Bùi Minh Trực F6 Q8 HCM `}
                </Text>
            </View>
        </View>
    )
}

export default HomeService;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor : '#eeeeee',
        paddingBottom : scaleHeight(2)
    },
    title: {
        color: '#404040',
        fontSize: scaleWidth(3.5)
    },
    wrapTitle: {
        padding: scaleWidth(1.5),
        paddingHorizontal: scaleWidth(3),
        backgroundColor: '#E8F6FD',
        borderRadius: 300,
        alignSelf: 'flex-start',
        marginTop : scaleHeight(2)
    },
    row : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : scaleHeight(1.5)
    },
    icon : {
        width : scaleWidth(6),
        height : scaleWidth(6)
    },
    address : {
        fontSize : scaleWidth(4.3),
        color : '#000000',
        marginLeft : scaleWidth(3)
    }
})